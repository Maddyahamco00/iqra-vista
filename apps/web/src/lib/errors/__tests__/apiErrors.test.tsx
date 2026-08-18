/**
 * @jest-environment node
 */
import { parseApiError } from '@/lib/errors/apiErrors';

describe('parseApiError', () => {
  it('returns UNKNOWN with fallback message for 500 status', () => {
    const result = parseApiError(500, { error: { code: 'DUPLICATE_EMAIL', message: 'x', field: 'email' } });
    expect(result).toEqual({ code: 'UNKNOWN', message: 'Something went wrong. Please try again later.', field: null });
  });

  it('returns UNKNOWN with fallback message for null body', () => {
    const result = parseApiError(400, null);
    expect(result).toEqual({ code: 'UNKNOWN', message: 'Something went wrong. Please try again later.', field: null });
  });

  it('returns UNKNOWN with fallback message when body has no error key', () => {
    const result = parseApiError(400, {});
    expect(result).toEqual({ code: 'UNKNOWN', message: 'Something went wrong. Please try again later.', field: null });
  });

  it('parses DUPLICATE_EMAIL with field', () => {
    const body = { error: { code: 'DUPLICATE_EMAIL', message: 'A user with this email already exists.', field: 'email' } };
    const result = parseApiError(409, body);
    expect(result).toEqual({ code: 'DUPLICATE_EMAIL', message: 'A user with this email already exists.', field: 'email' });
  });

  it('parses INVALID_CREDENTIALS with null field', () => {
    const body = { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials.', field: null } };
    const result = parseApiError(400, body);
    expect(result).toEqual({ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials.', field: null });
  });

  it('parses VALIDATION_ERROR', () => {
    const body = { error: { code: 'VALIDATION_ERROR', message: 'Validation failed.', field: null } };
    const result = parseApiError(400, body);
    expect(result).toEqual({ code: 'VALIDATION_ERROR', message: 'Validation failed.', field: null });
  });

  it('uses fallback message when error.message is missing', () => {
    const body = { error: { code: 'INVALID_CREDENTIALS' } };
    const result = parseApiError(400, body);
    expect(result.message).toBe('Something went wrong. Please try again later.');
  });

  it('defaults field to null when error.field is undefined', () => {
    const body = { error: { code: 'DUPLICATE_EMAIL', message: 'Email taken.' } };
    const result = parseApiError(409, body);
    expect(result.field).toBeNull();
  });
});
