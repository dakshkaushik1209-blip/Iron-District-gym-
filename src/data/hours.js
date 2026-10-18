/**
 * Opening hours configuration for Iron District Fitness.
 * Single source of truth reused across the Hero status strip, Contact section, and JSON-LD schema.
 */

export const FACILITY_TIMEZONE = 'Asia/Kolkata';

// Schedule by day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
export const WEEKLY_HOURS = {
  0: { dayName: 'Sunday', openHour: 7, openMinute: 0, closeHour: 20, closeMinute: 0 },
  1: { dayName: 'Monday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
  2: { dayName: 'Tuesday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
  3: { dayName: 'Wednesday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
  4: { dayName: 'Thursday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
  5: { dayName: 'Friday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
  6: { dayName: 'Saturday', openHour: 5, openMinute: 0, closeHour: 23, closeMinute: 0 },
};

// Formatted display strings for UI components (Contact, Footer, etc.)
export const DISPLAY_HOURS = {
  title: 'Staffed hours',
  monSat: 'Mon – Sat: 5:00 AM – 11:00 PM',
  sun: 'Sun: 7:00 AM – 8:00 PM',
  monSat24h: 'Mon – Sat: 05:00 – 23:00',
  sun24h: 'Sun: 07:00 – 20:00',
  badge: 'Keycard access 24/7 for active members',
};

// JSON-LD Opening Hours Specification
export const JSON_LD_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '05:00',
    closes: '23:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday'],
    opens: '07:00',
    closes: '20:00',
  },
];

/**
 * Format hours and minutes into 12-hour format with AM/PM (e.g. 11:00 PM, 5:00 AM)
 * @param {number} hour (0-23)
 * @param {number} minute (0-59)
 * @returns {string}
 */
export function formatTime12h(hour, minute = 0) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minutePadded = String(minute).padStart(2, '0');
  return `${hour12}:${minutePadded} ${ampm}`;
}

/**
 * Get current time parts in a specific time zone
 * @param {Date} [date=new Date()]
 * @param {string} [timeZone=FACILITY_TIMEZONE]
 * @returns {{ day: number, hour: number, minute: number }}
 */
export function getNowInTimeZone(date = new Date(), timeZone = FACILITY_TIMEZONE) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const getPart = (type) => parts.find((p) => p.type === type)?.value;

    const weekdayStr = getPart('weekday');
    const rawHour = parseInt(getPart('hour') || '0', 10);
    const minute = parseInt(getPart('minute') || '0', 10);
    const hour = rawHour % 24;

    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[weekdayStr] ?? date.getDay();

    return { day, hour, minute };
  } catch (err) {
    // Fallback to local system time if timeZone fails
    return {
      day: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }
}

/**
 * Calculates current facility status (Open/Closed) and formatted indicator text.
 * Formats:
 * - "Open now · Closes at 11:00 PM"
 * - "Closed · Opens today at 5:00 AM"
 * - "Closed · Opens tomorrow at 5:00 AM"
 *
 * @param {Date} [date=new Date()]
 * @param {string} [timeZone=FACILITY_TIMEZONE]
 * @returns {{ isOpen: boolean, text: string, statusLabel: string, nextEventText: string }}
 */
export function getFacilityStatus(date = new Date(), timeZone = FACILITY_TIMEZONE) {
  const { day, hour, minute } = getNowInTimeZone(date, timeZone);
  const currentTotalMinutes = hour * 60 + minute;

  const todaySchedule = WEEKLY_HOURS[day];
  const todayOpenMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
  const todayCloseMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

  // Case 1: Open right now
  if (currentTotalMinutes >= todayOpenMinutes && currentTotalMinutes < todayCloseMinutes) {
    const closeTimeFormatted = formatTime12h(todaySchedule.closeHour, todaySchedule.closeMinute);
    return {
      isOpen: true,
      statusLabel: 'Open now',
      nextEventText: `Closes at ${closeTimeFormatted}`,
      text: `Staffed hours: Open now · Closes at ${closeTimeFormatted}`,
      shortText: `Open now · Closes at ${closeTimeFormatted}`,
    };
  }

  // Case 2: Closed earlier today (before opening time)
  if (currentTotalMinutes < todayOpenMinutes) {
    const openTimeFormatted = formatTime12h(todaySchedule.openHour, todaySchedule.openMinute);
    return {
      isOpen: false,
      statusLabel: 'Closed',
      nextEventText: `Opens today at ${openTimeFormatted}`,
      text: `Staffed hours: Closed · Opens today at ${openTimeFormatted}`,
      shortText: `Closed · Opens today at ${openTimeFormatted}`,
    };
  }

  // Case 3: Closed after closing time today (look ahead to tomorrow)
  const tomorrowDay = (day + 1) % 7;
  const tomorrowSchedule = WEEKLY_HOURS[tomorrowDay];
  const tomorrowOpenTimeFormatted = formatTime12h(
    tomorrowSchedule.openHour,
    tomorrowSchedule.openMinute
  );

  return {
    isOpen: false,
    statusLabel: 'Closed',
    nextEventText: `Opens tomorrow at ${tomorrowOpenTimeFormatted}`,
    text: `Staffed hours: Closed · Opens tomorrow at ${tomorrowOpenTimeFormatted}`,
    shortText: `Closed · Opens tomorrow at ${tomorrowOpenTimeFormatted}`,
  };
}
