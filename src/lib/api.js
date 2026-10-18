/**
 * Submit trial booking request to /api/trial
 * @param {Object} formData
 * @returns {Promise<{success: boolean, data?: any, error?: string, fieldErrors?: Record<string, string>}>}
 */
export async function submitTrialRequest(formData) {
  try {
    const response = await fetch('/api/trial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: result.message || result.error || 'Server rejected the booking request. Please check the information and try again.',
        fieldErrors: result.fieldErrors || null,
      };
    }

    return {
      success: true,
      status: response.status,
      data: result.data || result,
    };
  } catch (err) {
    return {
      success: false,
      error: 'Network connectivity failure. Please check your connection or contact our desk via WhatsApp.',
      isNetworkError: true,
    };
  }
}
