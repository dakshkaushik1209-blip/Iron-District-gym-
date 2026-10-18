import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { trialFormSchema, PROGRAMS, getMinMaxDates } from '../lib/schema';
import { submitTrialRequest } from '../lib/api';
import { WhatsAppButton } from './WhatsAppButton';
import { Icon } from './Icon';

const PLAN_LABELS = {
  monthly: 'Monthly Membership',
  quarterly: 'Quarterly Membership',
  annual: 'Annual Membership',
};

export const normalizeProgramId = (id) => {
  if (!id) return '';
  const map = {
    strength: 'strength-training',
    'strength-training': 'strength-training',
    'muscle-building': 'muscle-building',
    hypertrophy: 'muscle-building',
    'fat-loss': 'fat-loss-training',
    'fat-loss-training': 'fat-loss-training',
    personal: 'personal-training',
    'personal-training': 'personal-training',
    functional: 'functional-fitness',
    'functional-fitness': 'functional-fitness',
  };
  return map[id.toLowerCase()] || id;
};

export function TrialForm({ initialProgram = '', initialPlan = '', initialTrainer = '' }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlProgram = searchParams.get('program');
  const urlPlan = searchParams.get('plan');
  const urlTrainer = searchParams.get('trainer');

  const getInitialProgram = () => {
    if (initialProgram) return normalizeProgramId(initialProgram);
    if (urlProgram) return normalizeProgramId(urlProgram);
    if (initialPlan || urlPlan) return 'strength-training';
    if (initialTrainer || urlTrainer) return 'personal-training';
    return '';
  };

  // Field values - Date field starts empty (no prefilled date), program requires selection unless preselected
  const [values, setValues] = useState({
    name: '',
    phone: '',
    program: getInitialProgram(),
    preferred_date: '',
    plan: initialPlan || urlPlan || '',
    trainer: initialTrainer || urlTrainer || '',
    notes: '',
    hp: '', // Honeypot
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Submission state: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  // Refs for auto-focusing on first invalid field
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const programSelectRef = useRef(null);
  const dateInputRef = useRef(null);

  const { minDate, maxDate } = getMinMaxDates();

  // Sync external program/plan/trainer events from cards
  useEffect(() => {
    const handleProgramSelect = (e) => {
      if (e.detail) {
        setValues((prev) => ({ ...prev, program: normalizeProgramId(e.detail) }));
      }
    };
    const handlePlanSelect = (e) => {
      if (e.detail) {
        setValues((prev) => ({
          ...prev,
          plan: e.detail,
          program: prev.program || 'strength-training',
        }));
      }
    };
    const handleTrainerSelect = (e) => {
      if (e.detail) {
        setValues((prev) => ({
          ...prev,
          trainer: e.detail,
          program: prev.program || 'personal-training',
        }));
      }
    };

    window.addEventListener('iron-district-program-selected', handleProgramSelect);
    window.addEventListener('iron-district-plan-selected', handlePlanSelect);
    window.addEventListener('iron-district-trainer-selected', handleTrainerSelect);

    return () => {
      window.removeEventListener('iron-district-program-selected', handleProgramSelect);
      window.removeEventListener('iron-district-plan-selected', handlePlanSelect);
      window.removeEventListener('iron-district-trainer-selected', handleTrainerSelect);
    };
  }, []);

  // Sync with prop changes when parent passes selected program, plan, or trainer
  useEffect(() => {
    if (initialProgram) {
      setValues((prev) => ({ ...prev, program: normalizeProgramId(initialProgram) }));
    }
  }, [initialProgram]);

  useEffect(() => {
    if (urlProgram) {
      setValues((prev) => ({ ...prev, program: normalizeProgramId(urlProgram) }));
    }
  }, [urlProgram]);

  useEffect(() => {
    if (initialPlan) {
      setValues((prev) => ({
        ...prev,
        plan: initialPlan,
        program: prev.program || 'strength-training',
      }));
    }
  }, [initialPlan]);

  useEffect(() => {
    if (initialTrainer) {
      setValues((prev) => ({
        ...prev,
        trainer: initialTrainer,
        program: prev.program || 'personal-training',
      }));
    }
  }, [initialTrainer]);

  // Validate single field on blur
  const validateField = (fieldName, val) => {
    const fieldSchema = trialFormSchema.shape[fieldName];
    if (!fieldSchema) return;

    // Full object schema check for context fields like preferred_date
    const result = trialFormSchema.safeParse({ ...values, [fieldName]: val });
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: issue ? issue.message : undefined,
      }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Re-validate if already touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrorMessage('');

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      program: true,
      preferred_date: true,
    });

    // Validate with shared Zod schema
    const validationResult = trialFormSchema.safeParse(values);

    if (!validationResult.success) {
      const fieldErrors = {};
      let firstInvalidRef = null;

      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;

          // Determine first invalid element to focus
          if (!firstInvalidRef) {
            if (fieldName === 'name') firstInvalidRef = nameInputRef;
            else if (fieldName === 'phone') firstInvalidRef = phoneInputRef;
            else if (fieldName === 'program') firstInvalidRef = programSelectRef;
            else if (fieldName === 'preferred_date') firstInvalidRef = dateInputRef;
          }
        }
      });

      setErrors(fieldErrors);
      setStatus('error');

      // Shift focus to the first invalid field for accessibility
      if (firstInvalidRef?.current) {
        firstInvalidRef.current.focus();
      }
      return;
    }

    // Client-side passed: begin submission
    setStatus('loading');
    setErrors({});

    try {
      const response = await submitTrialRequest(values);

      if (response && response.success) {
        setStatus('success');
        const submissionPayload = {
          name: values.name,
          phone: values.phone,
          program: values.program,
          preferred_date: values.preferred_date,
          plan: values.plan,
          trainer: values.trainer,
          notes: values.notes,
          ticketId: response.data?.ticketId || 'ID-TR-94820',
        };

        // Reset form values completely (including program dropdown)
        setValues({
          name: '',
          phone: '',
          program: '',
          preferred_date: '',
          plan: '',
          trainer: '',
          notes: '',
          hp: '',
        });
        setTouched({});
        setErrors({});

        // Navigate to /success with submitted details
        navigate('/success', {
          state: {
            submission: submissionPayload,
          },
        });
      } else {
        // Handle server-side 400 validation failures
        if (response?.fieldErrors) {
          setErrors(response.fieldErrors);
          setStatus('error');
          setServerErrorMessage(
            response.message || 'Please correct the highlighted fields and resubmit.'
          );

          // Focus first invalid field from server response
          const firstKey = Object.keys(response.fieldErrors)[0];
          if (firstKey === 'name') nameInputRef.current?.focus();
          else if (firstKey === 'phone') phoneInputRef.current?.focus();
          else if (firstKey === 'program') programSelectRef.current?.focus();
          else if (firstKey === 'preferred_date') dateInputRef.current?.focus();
        } else {
          // General server failure (500, 429, etc.)
          setStatus('error');
          setServerErrorMessage(
            response?.message ||
              'Booking transmission failed. Please retry or contact our front desk via WhatsApp.'
          );
        }
      }
    } catch (err) {
      console.error('[TRIAL SUBMIT ERROR]', err);
      setStatus('error');
      setServerErrorMessage(
        'Unable to connect to the booking server. Please check your network or reach out directly on WhatsApp.'
      );
    }
  };

  return (
    <div className="w-full bg-surface-lowest border border-border p-space-md sm:p-space-lg rounded-sm shadow-xl">
      <form id="trial-form" noValidate onSubmit={handleSubmit} className="space-y-4">
        {/* Anti-spam Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="field-hp">Leave this field blank</label>
          <input
            id="field-hp"
            name="hp"
            type="text"
            tabIndex="-1"
            autoComplete="off"
            value={values.hp}
            onChange={handleChange}
          />
        </div>

        {/* Dynamic Context Header (Selected Plan or Trainer) */}
        {(values.plan || values.trainer) && (
          <div className="p-3 bg-surface-card border border-primary/40 rounded-sm flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-xs text-text-heading uppercase">
                {values.plan ? (
                  <>
                    Selected Tier: <strong className="text-primary">{PLAN_LABELS[values.plan] || values.plan}</strong>
                  </>
                ) : (
                  <>
                    Requested Coach:{' '}
                    <strong className="text-primary">{values.trainer}</strong>
                  </>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setValues((prev) => ({ ...prev, plan: '', trainer: '' }))}
              className="font-mono text-[10px] text-text-muted hover:text-primary uppercase underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label
            htmlFor="field-name"
            className="block font-mono text-xs uppercase tracking-wider text-text-heading mb-1.5"
          >
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="field-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Alex Mercer"
            value={values.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'field-name-error' : undefined}
            className={`w-full bg-surface-card border px-space-md py-2.5 text-text-heading font-body text-sm rounded-sm focus:outline-none transition-colors ${
              errors.name
                ? 'border-status-error focus:border-status-error'
                : 'border-border focus:border-primary'
            }`}
          />
          {errors.name && (
            <span
              id="field-name-error"
              role="alert"
              className="mt-1 font-mono text-[11px] text-status-error flex items-center gap-1"
            >
              <Icon name="error" size={14} />
              {errors.name}
            </span>
          )}
        </div>

        {/* Phone & Program Dual Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="field-phone"
              className="block font-mono text-xs uppercase tracking-wider text-text-heading mb-1.5"
            >
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              ref={phoneInputRef}
              id="field-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 00000"
              value={values.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'field-phone-error' : undefined}
              className={`w-full bg-surface-card border px-space-md py-2.5 text-text-heading font-body text-sm rounded-sm focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-status-error focus:border-status-error'
                  : 'border-border focus:border-primary'
              }`}
            />
            {errors.phone && (
              <span
                id="field-phone-error"
                role="alert"
                className="mt-1 font-mono text-[11px] text-status-error flex items-center gap-1"
              >
                <Icon name="error" size={14} />
                {errors.phone}
              </span>
            )}
          </div>

          {/* Program Select */}
          <div>
            <label
              htmlFor="field-program"
              className="block font-mono text-xs uppercase tracking-wider text-text-heading mb-1.5"
            >
              Preferred Training Program <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                ref={programSelectRef}
                id="field-program"
                name="program"
                value={values.program}
                onChange={handleChange}
                onBlur={() => handleBlur('program')}
                aria-invalid={errors.program ? 'true' : 'false'}
                aria-describedby={errors.program ? 'field-program-error' : undefined}
                className={`w-full bg-surface-card border px-space-md py-2.5 text-text-heading font-body text-sm rounded-sm focus:outline-none appearance-none cursor-pointer pr-10 transition-colors ${
                  errors.program
                    ? 'border-status-error focus:border-status-error'
                    : 'border-border focus:border-primary'
                }`}
              >
                <option value="" disabled className="bg-surface-elevated text-text-muted">
                  Select a program
                </option>
                {PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id} className="bg-surface-elevated text-text-heading">
                    {prog.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                <Icon name="expand_more" size={18} />
              </span>
            </div>
            {errors.program && (
              <span
                id="field-program-error"
                role="alert"
                className="mt-1 font-mono text-[11px] text-status-error flex items-center gap-1"
              >
                <Icon name="error" size={14} />
                {errors.program}
              </span>
            )}
          </div>
        </div>

        {/* Preferred Visit Date (No prefilled date) */}
        <div>
          <label
            htmlFor="field-date"
            className="block font-mono text-xs uppercase tracking-wider text-text-heading mb-1.5"
          >
            Preferred Visit Date (Next 60 Days) <span className="text-primary">*</span>
          </label>
          <input
            ref={dateInputRef}
            id="field-date"
            name="preferred_date"
            type="date"
            required
            min={minDate}
            max={maxDate}
            value={values.preferred_date}
            onChange={handleChange}
            onBlur={() => handleBlur('preferred_date')}
            aria-invalid={errors.preferred_date ? 'true' : 'false'}
            aria-describedby={
              errors.preferred_date ? 'field-date-error' : 'field-date-helper'
            }
            className={`w-full bg-surface-card border px-space-md py-2.5 text-text-heading font-body text-sm rounded-sm focus:outline-none transition-colors ${
              errors.preferred_date
                ? 'border-status-error focus:border-status-error'
                : 'border-border focus:border-primary'
            }`}
          />
          <p id="field-date-helper" className="mt-1 font-mono text-[11px] text-text-muted">
            Choose a date within the next 60 days (DD/MM/YYYY)
          </p>
          {errors.preferred_date && (
            <span
              id="field-date-error"
              role="alert"
              className="mt-1 font-mono text-[11px] text-status-error flex items-center gap-1"
            >
              <Icon name="error" size={14} />
              {errors.preferred_date}
            </span>
          )}
        </div>

        {/* Optional Training Notes (Max 300 chars) */}
        <div>
          <label
            htmlFor="field-notes"
            className="block font-mono text-xs uppercase tracking-wider text-text-heading mb-1.5"
          >
            Lifting Background / Goals <span className="text-text-muted lowercase">(optional, max 300 chars)</span>
          </label>
          <textarea
            id="field-notes"
            name="notes"
            rows="2"
            maxLength={300}
            value={values.notes}
            onChange={handleChange}
            placeholder="e.g. Looking to improve squat technique and structured progression..."
            className="w-full bg-surface-card border border-border px-space-md py-2 text-text-heading font-body text-sm rounded-sm focus:outline-none focus:border-primary placeholder:text-text-muted/60 resize-none transition-colors"
          ></textarea>
        </div>

        {/* Server Failure / Error Banner with Try Again & WhatsApp Fallback */}
        {status === 'error' && serverErrorMessage && (
          <div
            role="alert"
            className="p-space-md bg-status-error-container border border-status-error rounded-sm flex flex-col gap-2"
          >
            <div className="flex items-start gap-2">
              <Icon name="report" size={20} className="text-status-error shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-headline text-lg uppercase text-status-error font-bold leading-tight">
                  Booking Transmission Issue
                </span>
                <p className="font-body text-xs sm:text-sm text-text-heading mt-0.5">
                  {serverErrorMessage}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-status-error/30 mt-1">
              <button
                type="submit"
                className="font-mono text-xs uppercase text-text-heading bg-status-error/20 hover:bg-status-error/30 px-3 py-1.5 border border-status-error rounded-sm transition-colors"
              >
                Try Again
              </button>

              <WhatsAppButton
                variant="inline"
                customText={`Hi Iron District, I encountered an issue booking my free trial online for ${values.name || 'a visitor'}. Could you help reserve a slot?`}
                className="text-xs py-1.5 px-3 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-black flex items-center gap-1.5"
              >
                <Icon name="chat" size={14} />
                <span>WhatsApp Fallback</span>
              </WhatsAppButton>
            </div>
          </div>
        )}

        {/* Primary Submit Button with Spinner & Disabled State */}
        <button
          id="form-submit-btn"
          type="submit"
          disabled={status === 'loading'}
          className={`w-full font-headline text-xl uppercase tracking-wider py-3.5 flex items-center justify-center gap-space-sm rounded-sm transition-all font-bold shadow-lg focus-visible:outline-white ${
            status === 'loading'
              ? 'bg-surface-elevated text-text-muted cursor-not-allowed border border-border'
              : 'bg-primary text-text-inverse hover:bg-primary-hover active:scale-[0.99]'
          }`}
        >
          {status === 'loading' ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Reserving Platform Slot...</span>
            </>
          ) : (
            <>
              <span>Book My Free Trial</span>
              <Icon name="bolt" size={20} />
            </>
          )}
        </button>

        <p className="font-mono text-[11px] text-text-muted text-center uppercase tracking-wider">
          Waiver signed upon arrival // No credit card required
        </p>
      </form>
    </div>
  );
}
