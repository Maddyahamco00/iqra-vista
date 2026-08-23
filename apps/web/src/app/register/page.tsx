import { AuthLayout } from '@/components/layout/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      mode="register"
      heading="Create Account"
      subheading="Start your personalized Qur'an and education journey today"
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
