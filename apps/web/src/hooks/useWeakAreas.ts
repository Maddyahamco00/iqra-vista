'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/client';
import type { WeakAreasResponse } from '@/types/student';

export function useWeakAreas() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['student', 'weak-areas'],
    queryFn: () => fetcher<WeakAreasResponse>('/api/students/me/weak-areas'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    weakAreas: data?.weakAreas ?? [],
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
