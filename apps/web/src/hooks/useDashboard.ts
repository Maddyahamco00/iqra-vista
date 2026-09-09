'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/client';
import { calculateStreaks } from '@/lib/utils/streak';
import type { StudentProfile, LearningProgress, ProgressHistoryResponse } from '@/types/student';

function getLookbackDate(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().split('T')[0];
}

export function useDashboard() {
  // ── 1. Student profile (/api/students/me) ───────────────────────────────
  const profile = useQuery({
    queryKey: ['student', 'profile'],
    queryFn: () => fetcher<StudentProfile>('/api/students/me'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ── 2. Progress summary (/api/students/me/progress) ─────────────────────
  const progress = useQuery({
    queryKey: ['student', 'progress'],
    queryFn: () => fetcher<LearningProgress>('/api/students/me/progress'),
    enabled: !!profile.data,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // ── 3. 90-day activity history for client-side streak calc ───────────────
  const history = useQuery({
    queryKey: ['student', 'streak-history', getLookbackDate(90)],
    queryFn: () =>
      fetcher<ProgressHistoryResponse>(
        `/api/students/me/progress/history?from=${getLookbackDate(90)}`
      ),
    enabled: !!profile.data,
    // Refresh every minute so streak updates without a full page reload
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 2,
  });

  // ── Compute streak values client-side from raw history ──────────────────
  const streaks = history.data
    ? calculateStreaks(history.data.records)
    : { currentStreak: 0, longestStreak: 0, lastActiveDate: null };

  return {
    // Data
    profile: profile.data ?? null,
    progress: progress.data ?? null,
    streaks,

    // Top-level loading — true until we have at least a profile
    isLoading: profile.isLoading,

    // Granular errors keyed by query
    errors: {
      profile: profile.error as Error | null,
      progress: progress.error as Error | null,
      streak: history.error as Error | null,
    },

    // Streak-specific loading / error / refetch
    streakLoading: history.isLoading || history.isFetching,
    streakError: history.isError,
    lastActiveDate: streaks.lastActiveDate,
    refetchStreak: history.refetch,
  };
}
