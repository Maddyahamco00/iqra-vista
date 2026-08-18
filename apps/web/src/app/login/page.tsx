'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to continue your Qur'an journey"
      footerText="Don't have an account?"
      footerLinkLabel="Create one"
      footerLinkHref="/register"
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
