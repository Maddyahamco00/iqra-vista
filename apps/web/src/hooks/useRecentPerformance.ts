'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/client';
import type { RecentPerformanceResponse } from '@/types/student';

export function useRecentPerformance() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['student', 'recent-performance'],
    queryFn: () => fetcher<RecentPerformanceResponse>('/api/students/me/recent-performance'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    points: data?.points ?? [],
    weekDelta: data?.weekDelta ?? 0,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
