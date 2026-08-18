export type ApiErrorCode = 'DUPLICATE_EMAIL' | 'INVALID_CREDENTIALS' | 'VALIDATION_ERROR';

export interface ParsedApiError {
  code: ApiErrorCode | 'UNKNOWN';
  message: string;
  field: string | null;
}

interface RawApiError {
  error?: {
    code?: string;
    message?: string;
    field?: string | null;
  };
}

const FALLBACK_MESSAGE = 'Something went wrong. Please try again later.';

export function parseApiError(status: number, body: unknown): ParsedApiError {
  if (status >= 500 || body === null || typeof body !== 'object') {
    return { code: 'UNKNOWN', message: FALLBACK_MESSAGE, field: null };
  }

  const raw = body as RawApiError;
  const err = raw.error;

  if (!err) {
    return { code: 'UNKNOWN', message: FALLBACK_MESSAGE, field: null };
  }

  const code = (err.code as ApiErrorCode) ?? 'UNKNOWN';
  const message = err.message || FALLBACK_MESSAGE;
  const field = err.field ?? null;

  return { code, message, field };
}
