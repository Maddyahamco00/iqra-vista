'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/client';
import type { TodayPlanResponse } from '@/types/student';

export function useTodaysPlan() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['student', 'today-plan'],
    queryFn: () => fetcher<TodayPlanResponse>('/api/students/me/today-plan'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    tasks: data?.tasks ?? [],
    level: data?.level ?? null,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
