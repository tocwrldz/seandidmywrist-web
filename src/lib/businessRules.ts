import { DEPOSIT_POLICY } from '../data/policies';

export interface DepositEligibility {
  allowed: boolean;
  reason?: string;
  centralTimeString: string;
  isSunday: boolean;
  isPastCutoff: boolean;
}

/**
 * Checks whether new deposits are currently permitted based on Central Time.
 * Rule: Sunday cutoff is 5:00 PM (17:00) Central Time.
 */
export function checkDepositEligibility(): DepositEligibility {
  const now = new Date();

  // Format explicitly to America/Chicago (Central Time)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const weekday = partMap['weekday']; // 'Sun', 'Mon', etc.
  const hour = parseInt(partMap['hour'] || '0', 10);
  const isSunday = weekday === 'Sun';
  const isPastCutoff = isSunday && hour >= DEPOSIT_POLICY.sundayCutoffHour;

  const centralTimeString = formatter.format(now) + ' CT';

  if (isPastCutoff) {
    return {
      allowed: false,
      reason: 'Sunday Cutoff Active: New deposits close Sundays at 5:00 PM CT for lab maintenance and fulfillment.',
      centralTimeString,
      isSunday: true,
      isPastCutoff: true
    };
  }

  return {
    allowed: true,
    centralTimeString,
    isSunday,
    isPastCutoff: false
  };
}

/**
 * Calculates 7 business days from a given start date (skips Saturdays and Sundays).
 */
export function calculateReservationDeadline(startDate: Date = new Date()): Date {
  const date = new Date(startDate);
  let businessDaysAdded = 0;

  while (businessDaysAdded < DEPOSIT_POLICY.reservationDurationBusinessDays) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();
    // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDaysAdded++;
    }
  }

  return date;
}

export function formatDeadline(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    weekday: 'short'
  }).format(date);
}
