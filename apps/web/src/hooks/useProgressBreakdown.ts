'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/client';
import type { ProgressBreakdownResponse } from '@/types/student';

export function useProgressBreakdown() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['student', 'progress-breakdown'],
    queryFn: () => fetcher<ProgressBreakdownResponse>('/api/students/me/progress/breakdown'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    breakdown: data?.breakdown ?? [],
    overall: data?.overall ?? 0,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
