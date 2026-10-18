// In-memory sliding window rate limiter fallback
const ipRequestMap = new Map();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

/**
 * Checks if an IP is within the rate limit.
 * @param {string} ipHash - Hashed IP address
 * @returns {{ allowed: boolean, remaining: number, resetInSeconds: number }}
 */
export function checkRateLimit(ipHash) {
  const now = Date.now();
  const clientData = ipRequestMap.get(ipHash);

  if (!clientData) {
    ipRequestMap.set(ipHash, { count: 1, firstRequestTime: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetInSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  // Check if window has expired
  if (now - clientData.firstRequestTime > WINDOW_MS) {
    ipRequestMap.set(ipHash, { count: 1, firstRequestTime: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetInSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (clientData.count >= MAX_REQUESTS) {
    const resetInSeconds = Math.ceil((clientData.firstRequestTime + WINDOW_MS - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  clientData.count += 1;
  const resetInSeconds = Math.ceil((clientData.firstRequestTime + WINDOW_MS - now) / 1000);
  return {
    allowed: true,
    remaining: MAX_REQUESTS - clientData.count,
    resetInSeconds,
  };
}
