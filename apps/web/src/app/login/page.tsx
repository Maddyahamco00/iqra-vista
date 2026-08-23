'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      mode="login"
      heading="Welcome Back!"
      subheading="Login to continue your learning journey"
      footerText="Don't have an account?"
      footerLinkLabel="Create Account"
      footerLinkHref="/register"
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
