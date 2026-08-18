'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth';
import { useRegister, ApiError } from '@/hooks/useAuth';
import { RoleSelector } from './RoleSelector';
import { FormErrorAlert } from '@/components/ui/FormErrorAlert';

export function RegisterForm() {
  const { register: registerUser, isLoading } = useRegister();
  const [formError, setFormError] = useState<string | null>(null);
  const [emailServerError, setEmailServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setFormError(null);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role: data.role,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        const { code, message, field } = err.parsed;
        if (code === 'DUPLICATE_EMAIL' && field === 'email') {
          setEmailServerError(message);
        } else {
          setFormError(message);
        }
      } else {
        setFormError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formError && <FormErrorAlert message={formError} />}

      <div>
        <label htmlFor="fullName" className="auth-label">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          className="auth-input"
          placeholder="Your full name"
          disabled={isLoading}
        />
        {errors.fullName && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="auth-label">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email', { onChange: () => setEmailServerError(null) })}
          className="auth-input"
          placeholder="you@example.com"
          disabled={isLoading}
        />
        {(errors.email || emailServerError) && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {emailServerError ?? errors.email?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="auth-label">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="auth-input"
          placeholder="Min. 8 characters"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="auth-input"
          placeholder="Repeat your password"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="auth-label">I am a...</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RoleSelector value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <button type="submit" disabled={isLoading} className="auth-btn-primary">
        {isLoading ? (
          <>
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}
