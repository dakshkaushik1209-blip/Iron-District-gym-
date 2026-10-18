import { SITE_CONFIG } from './config.js';

/**
 * Generates an encoded WhatsApp deep link URL based on context.
 * @param {Object} options
 * @param {string} [options.program] - Name or title of program
 * @param {string} [options.plan] - Name of membership plan
 * @param {string} [options.trainer] - Name of trainer
 * @param {string} [options.customText] - Fully custom text message
 * @returns {string} - WhatsApp URL
 */
export function buildWhatsAppUrl({ program, plan, trainer, customText } = {}) {
  const rawNumber =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
    (typeof process !== 'undefined' && process.env?.VITE_WHATSAPP_NUMBER) ||
    SITE_CONFIG.whatsappNumber ||
    '';
  const number = String(rawNumber).replace(/[^0-9]/g, '');

  let message = "Hi Iron District Fitness, I'd like to enquire about your gym.";

  const PLAN_NAMES = {
    monthly: 'Monthly Membership',
    quarterly: 'Quarterly Membership',
    annual: 'Annual Membership',
  };

  if (customText) {
    message = customText;
  } else if (program) {
    message = `Hi Iron District Fitness, I'd like to enquire about the "${program}" program.`;
  } else if (plan) {
    const planName = PLAN_NAMES[plan] || plan;
    message = `Hi Iron District Fitness, I'd like to enquire about the "${planName}".`;
  } else if (trainer) {
    message = `Hi Iron District Fitness, I'd like to book a coaching session with ${trainer}.`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
