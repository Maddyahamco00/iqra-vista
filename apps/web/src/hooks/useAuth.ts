import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { RegisterRequest } from '@/types/auth';
import { parseApiError, type ParsedApiError } from '@/lib/errors/apiErrors';

export class ApiError extends Error {
  constructor(public readonly parsed: ParsedApiError) {
    super(parsed.message);
    this.name = 'ApiError';
  }
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new ApiError(parseApiError(res.status, body));
      }

      toast.success('Account created! Please sign in.');
      router.push('/login?registered=true');
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
