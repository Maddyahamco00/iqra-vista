/**
 * @jest-environment node
 */
import { registerSchema } from '@/lib/validations/auth';

describe('RegisterForm - schema validation', () => {
  const validData = {
    fullName: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    role: 'student' as const,
  };

  it('validates a valid registration payload', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('requires fullName', () => {
    const result = registerSchema.safeParse({ ...validData, fullName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('fullName');
    }
  });

  it('requires valid email format', () => {
    const result = registerSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('requires password of at least 8 characters', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'short', confirmPassword: 'short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('password');
    }
  });

  it('rejects mismatched passwords', () => {
    const result = registerSchema.safeParse({ ...validData, confirmPassword: 'different' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/passwords do not match/i);
    }
  });

  it('accepts student role', () => {
    const result = registerSchema.safeParse({ ...validData, role: 'student' });
    expect(result.success).toBe(true);
  });

  it('accepts parent role', () => {
    const result = registerSchema.safeParse({ ...validData, role: 'parent' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid role', () => {
    const result = registerSchema.safeParse({ ...validData, role: 'teacher' });
    expect(result.success).toBe(false);
  });

  it('produces correct payload shape on valid data', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toMatchObject({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        role: 'student',
      });
    }
  });
});

// ---------------------------------------------------------------------------
// Server error handling — useRegister + parseApiError integration
// ---------------------------------------------------------------------------
import { parseApiError } from '@/lib/errors/apiErrors';
import { ApiError } from '@/hooks/useAuth';

describe('RegisterForm - server error handling logic', () => {
  it('DUPLICATE_EMAIL error maps to email field', () => {
    const parsed = parseApiError(409, {
      error: { code: 'DUPLICATE_EMAIL', message: 'A user with this email already exists.', field: 'email' },
    });
    const err = new ApiError(parsed);
    expect(err.parsed.code).toBe('DUPLICATE_EMAIL');
    expect(err.parsed.field).toBe('email');
    expect(err.parsed.message).toBe('A user with this email already exists.');
  });

  it('INVALID_CREDENTIALS error has null field (maps to form-level alert)', () => {
    const parsed = parseApiError(400, {
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials.', field: null },
    });
    const err = new ApiError(parsed);
    expect(err.parsed.code).toBe('INVALID_CREDENTIALS');
    expect(err.parsed.field).toBeNull();
  });

  it('500 error produces UNKNOWN code with fallback message', () => {
    const parsed = parseApiError(500, null);
    const err = new ApiError(parsed);
    expect(err.parsed.code).toBe('UNKNOWN');
    expect(err.parsed.message).toBe('Something went wrong. Please try again later.');
  });

  it('network/null body produces UNKNOWN code with fallback message', () => {
    const parsed = parseApiError(400, null);
    const err = new ApiError(parsed);
    expect(err.parsed.code).toBe('UNKNOWN');
    expect(err.parsed.message).toBe('Something went wrong. Please try again later.');
  });

  it('VALIDATION_ERROR with no field maps to form-level alert', () => {
    const parsed = parseApiError(400, {
      error: { code: 'VALIDATION_ERROR', message: 'Validation failed.', field: null },
    });
    const err = new ApiError(parsed);
    expect(err.parsed.field).toBeNull();
    expect(err.parsed.code).toBe('VALIDATION_ERROR');
  });
});
