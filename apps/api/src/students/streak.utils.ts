/**
 * Server-side streak calculation from an array of ISO date strings (YYYY-MM-DD).
 * Dates must already be de-duplicated and sorted in DESCENDING order.
 */
export function calculateStreakFromDates(
  sortedDescDates: string[],
): { currentStreak: number; longestStreak: number } {
  if (sortedDescDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const ONE_DAY = 86_400_000;
  const toMs = (d: string) => new Date(d + 'T00:00:00Z').getTime();

  // Current streak — walk backwards from today
  const today = new Date().toISOString().split('T')[0];
  const todayMs = toMs(today);
  let currentStreak = 0;
  for (let i = 0; i < sortedDescDates.length; i++) {
    const expected = new Date(todayMs - i * ONE_DAY).toISOString().split('T')[0];
    if (sortedDescDates[i] === expected) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Longest streak — forward pass on ascending dates
  const asc = [...sortedDescDates].reverse();
  let longestStreak = asc.length > 0 ? 1 : 0;
  let run = 1;
  for (let i = 1; i < asc.length; i++) {
    const diff = toMs(asc[i]) - toMs(asc[i - 1]);
    if (diff === ONE_DAY) {
      run++;
      if (run > longestStreak) longestStreak = run;
    } else {
      run = 1;
    }
  }

  return { currentStreak, longestStreak };
}
