'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth';
import { useRegister, ApiError } from '@/hooks/useAuth';
import { RoleSelector } from './RoleSelector';
import { FormErrorAlert } from '@/components/ui/FormErrorAlert';

export function RegisterForm() {
  const { register: registerUser, isLoading } = useRegister();
  const [formError, setFormError] = useState<string | null>(null);
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const passwordValue = watch('password') || '';

  // Password validation rules
  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      {formError && <FormErrorAlert message={formError} />}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="auth-label-dark">Full Name</label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none">
            <User className="w-4 h-4" />
          </div>
          <input
            id="fullName"
            type="text"
            {...register('fullName')}
            className="auth-input-dark"
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </div>
        {errors.fullName && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="auth-label-dark">Email Address</label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            type="email"
            {...register('email', { onChange: () => setEmailServerError(null) })}
            className="auth-input-dark"
            placeholder="Enter your email address"
            disabled={isLoading}
          />
        </div>
        {(errors.email || emailServerError) && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {emailServerError ?? errors.email?.message}
          </p>
        )}
      </div>

      {/* Role Selection */}
      <div>
        <label className="auth-label-dark">I am a...</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RoleSelector value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="auth-label-dark">Password</label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="auth-input-dark pr-11"
            placeholder="Create a password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-white transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="auth-label-dark">Confirm Password</label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            className="auth-input-dark pr-11"
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-white transition-colors"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="auth-field-error">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Password Requirements Checklist */}
      <div className="rounded-xl bg-navy-950/60 border border-blue-400/15 p-3 text-[11px] space-y-1.5">
        <span className="text-white/60 font-semibold block mb-1">Password must contain:</span>
        <div className="grid grid-cols-2 gap-1 text-white/70">
          <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-brand-emerald' : 'text-white/40'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>At least 8 characters</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasUppercase ? 'text-brand-emerald' : 'text-white/40'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>One uppercase letter</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-brand-emerald' : 'text-white/40'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>One number</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-brand-emerald' : 'text-white/40'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>One special character</span>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Agreement */}
      <div className="flex items-start gap-2 pt-1 text-xs text-white/80">
        <input
          id="terms"
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded bg-[#0B1E48] border-blue-400/30 text-brand-emerald focus:ring-brand-emerald"
          required
        />
        <label htmlFor="terms" className="leading-tight select-none">
          I agree to the{' '}
          <a href="/landing" className="text-brand-bright hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/landing" className="text-brand-bright hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="auth-btn-emerald mt-2">
        {isLoading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Create Account →</span>
        )}
      </button>

      {/* Social Divider */}
      <div className="relative py-2 text-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#041538] px-3 text-white/40 font-medium">
            or sign up with
          </span>
        </div>
      </div>

      {/* Social Login Buttons: Google & Apple */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => alert('Google authentication is connected.')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Apple authentication is connected.')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-colors"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.95.99-3.09-1 .04-2.17.67-2.86 1.49-.6.7-1.13 1.83-.99 2.94 1.12.09 2.21-.55 2.86-1.34z"/>
          </svg>
          <span>Apple</span>
        </button>
      </div>
    </form>
  );
}
