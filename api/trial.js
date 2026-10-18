import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { trialFormSchema, sanitizePhone } from '../src/lib/schema.js';
import { checkRateLimit } from './_lib/rateLimiter.js';

export default async function handler(req, res) {
  // 1. CORS & Preflight handling
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 2. Accept POST only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'This endpoint only accepts POST requests',
    });
  }

  try {
    // 3. Extract and hash IP for privacy and rate limiting
    const rawIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');

    // 4. Rate Limiting Check (Max 5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(ipHash);
    if (!rateLimit.allowed) {
      res.setHeader('Retry-After', String(rateLimit.resetInSeconds));
      return res.status(429).json({
        error: 'Too Many Requests',
        message: `Platform rate limit reached. Please wait ${Math.ceil(
          rateLimit.resetInSeconds / 60
        )} minutes before requesting another trial slot.`,
      });
    }

    // 5. Parse and sanitize body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // 6. Honeypot check: reject spam
    if (body.hp && String(body.hp).trim() !== '') {
      console.warn(`[SPAM DETECTED] Honeypot triggered from IP hash: ${ipHash.slice(0, 8)}`);
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid submission',
      });
    }

    // 7. Validate with shared Zod schema
    const validation = trialFormSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      return res.status(400).json({
        error: 'Validation failed',
        message: 'Some of the submitted information did not meet validation standards',
        fieldErrors,
      });
    }

    const { name, phone, program, preferred_date, plan, trainer, notes } = validation.data;
    const cleanPhone = sanitizePhone(phone);

    // Environment check: Restrict "Demo Mode" to local development only
    const isLocalDev = process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === 'development';

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    // In production or preview, all required keys must be present
    if (!isLocalDev) {
      if (!supabaseUrl || !supabaseServiceKey || !resendApiKey) {
        const missing = [];
        if (!supabaseUrl) missing.push('SUPABASE_URL');
        if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
        if (!resendApiKey) missing.push('RESEND_API_KEY');

        console.error(`[CONFIG ERROR] Missing required environment variables in ${process.env.VERCEL_ENV}: ${missing.join(', ')}`);
        return res.status(500).json({
          error: 'Server Configuration Error',
          message: 'Server configuration error: missing required credentials.',
        });
      }
    }

    let recordSaved = false;
    let savedRecordId = null;

    // 8. Database Insert: Supabase
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      });

      const { data: dbData, error: dbError } = await supabase
        .from('trial_requests')
        .insert([
          {
            name,
            phone: cleanPhone,
            program,
            preferred_date,
            plan: plan || null,
            trainer: trainer || null,
            notes: notes ? notes.slice(0, 300) : null,
            status: 'new',
            ip_hash: ipHash,
          },
        ])
        .select()
        .single();

      if (dbError) {
        console.error('[SUPABASE ERROR] Failed to insert trial request:', dbError);
        return res.status(500).json({
          error: 'Database Error',
          message: 'Unable to reserve trial platform slot. Please retry in a few moments.',
        });
      }

      if (dbData?.id) {
        recordSaved = true;
        savedRecordId = `ID-TR-${String(dbData.id).slice(0, 5).toUpperCase()}`;
      } else {
        console.error('[SUPABASE ERROR] Insert succeeded but no record ID was returned.');
        return res.status(500).json({
          error: 'Database Error',
          message: 'Failed to verify reservation record in database.',
        });
      }
    } else if (isLocalDev) {
      // Demo Mode: restricted to local development only (VERCEL_ENV is undefined or "development")
      console.warn('[DEMO MODE] Running in local development without Supabase keys. Mocking ticket generation.');
      recordSaved = true;
      savedRecordId = `ID-TR-${Math.floor(10000 + Math.random() * 90000)}`;
    } else {
      // In production or preview, never reach here without keys or database insert
      console.error('[SERVER ERROR] Missing database credentials outside local development.');
      return res.status(500).json({
        error: 'Server Configuration Error',
        message: 'Database service is unavailable.',
      });
    }

    // Safety guard: Never return a generated ticket or success response unless record was saved
    if (!recordSaved || !savedRecordId) {
      console.error('[SERVER ERROR] Cannot return success: record was not saved in Supabase.');
      return res.status(500).json({
        error: 'Database Error',
        message: 'Trial reservation could not be verified in database.',
      });
    }

    // 9. Send Notification Email via Resend
    const notifyEmailTo = process.env.NOTIFY_EMAIL_TO;
    const notifyEmailFrom = process.env.NOTIFY_EMAIL_FROM || 'onboarding@resend.dev';

    if (resendApiKey && notifyEmailTo) {
      try {
        const resend = new Resend(resendApiKey);

        const emailHtml = `
          <div style="background-color: #0A0A0A; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #262626;">
            <div style="border-bottom: 2px solid #FF5A1F; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="color: #FF5A1F; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">// BOOKING DISPATCH</span>
              <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 800; margin: 8px 0 0; text-transform: uppercase;">New Free Trial Reservation</h1>
            </div>

            <p style="color: #A3A3A3; font-size: 15px; line-height: 1.6;">
              A prospective member has booked a complimentary trial session:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 24px 0; background-color: #141414; border: 1px solid #262626;">
              <tbody>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold; width: 35%;">TICKET ID</td>
                  <td style="padding: 12px 16px; color: #FF5A1F; font-size: 14px; font-weight: bold;">${savedRecordId}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">NAME</td>
                  <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px; font-weight: bold;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">TELEPHONE</td>
                  <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px;"><a href="tel:${cleanPhone}" style="color: #FF5A1F; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">PROGRAM</td>
                  <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px; text-transform: uppercase;">${program}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">PREFERRED DATE</td>
                  <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px; font-weight: bold;">${preferred_date}</td>
                </tr>
                ${
                  plan
                    ? `<tr style="border-bottom: 1px solid #262626;">
                        <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">INTERESTED TIER</td>
                        <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px;">${plan}</td>
                      </tr>`
                    : ''
                }
                ${
                  trainer
                    ? `<tr style="border-bottom: 1px solid #262626;">
                        <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">COACH REQUEST</td>
                        <td style="padding: 12px 16px; color: #FFFFFF; font-size: 14px;">${trainer}</td>
                      </tr>`
                    : ''
                }
                ${
                  notes
                    ? `<tr>
                        <td style="padding: 12px 16px; color: #737373; font-size: 13px; font-weight: bold;">NOTES</td>
                        <td style="padding: 12px 16px; color: #A3A3A3; font-size: 13px;">${notes}</td>
                      </tr>`
                    : ''
                }
              </tbody>
            </table>

            <div style="border-top: 1px solid #262626; padding-top: 16px; font-size: 12px; color: #737373;">
              Iron District Fitness // 402 Foundry Way, Industrial Area, Sector 4, Demo City (fictional)<br/>
              Verification Hash: ${ipHash.slice(0, 16)}
            </div>
          </div>
        `;

        await resend.emails.send({
          from: notifyEmailFrom,
          to: notifyEmailTo,
          subject: `[Iron District] Free Trial Booking: ${name} (${program})`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error('[RESEND ERROR] Failed to send email notification:', emailErr);
      }
    } else if (isLocalDev) {
      console.warn('[DEMO MODE] Resend credentials not set. Skipping email dispatch.');
    }

    // 10. Success Response
    return res.status(201).json({
      success: true,
      message: 'Platform trial reservation confirmed',
      data: {
        ticketId: savedRecordId,
        name,
        program,
        preferred_date,
        plan: plan || null,
        trainer: trainer || null,
        notes: notes || null,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[UNHANDLED ERROR] Serverless trial handler error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected system error occurred while processing the reservation.',
    });
  }
}
