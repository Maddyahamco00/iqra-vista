'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Footer } from '@/components/layout/Footer';
import { AuthVisual } from '@/components/auth/AuthVisual';

interface AuthLayoutProps {
  children: React.ReactNode;
  mode?: 'login' | 'register';
  heading: string;
  subheading: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
}

function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="auth-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon
            points="30,4 34,22 52,18 40,30 52,42 34,38 30,56 26,38 8,42 20,30 8,18 26,22"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.3" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#auth-pattern)" />
    </svg>
  );
}

export function AuthLayout({
  children,
  mode,
  heading,
  subheading,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: AuthLayoutProps) {
  const pathname = usePathname();
  const currentMode = mode || (pathname?.includes('register') ? 'register' : 'login');
  const isRegister = currentMode === 'register';

  return (
    <div className="min-h-screen w-full bg-[#020B24] text-white flex flex-col justify-between relative overflow-hidden">
      <IslamicPattern />

      {/* Ambient background glows */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #168FE8 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-40 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }}
      />

      {/* Top Header Logo Bar */}
      <header className="relative z-10 w-full pt-6 pb-2 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/landing"
          className="inline-block transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none rounded-xl"
          aria-label="Iqra Vista Home"
        >
          <BrandLogo variant="light" size="md" type="full" />
        </Link>
        <Link
          href="/landing"
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Back to Home</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      {/* Main Authentication Grid */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">

          {/* ── Left Column: AuthVisual (family photo + branding) ── */}
          {/* Hidden on mobile — form gets full width; shown lg+ */}
          <div className="hidden lg:flex lg:col-span-6 rounded-3xl bg-[#041538]/70 border border-blue-500/20 overflow-hidden">
            <AuthVisual mode={currentMode} />
          </div>

          {/* ── Right Column: Dark Glassmorphic Auth Card ── */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto flex flex-col justify-center">
            <div className="rounded-3xl bg-[#041538]/85 border border-blue-500/30 backdrop-blur-xl p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">

              {/* Form Card Top Heading */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {heading}
                  </h2>
                </div>

                {/* Tabs for Login / Create Account Switch */}
                <div className="flex items-center border-b border-white/10 mb-5">
                  <Link
                    href="/login"
                    className={`flex-1 text-center py-2.5 text-sm font-semibold transition-all duration-150 relative ${
                      !isRegister
                        ? 'text-brand-emerald'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    Login
                    {!isRegister && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-emerald rounded-full" />
                    )}
                  </Link>
                  <Link
                    href="/register"
                    className={`flex-1 text-center py-2.5 text-sm font-semibold transition-all duration-150 relative ${
                      isRegister
                        ? 'text-brand-emerald'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    Create Account
                    {isRegister && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-emerald rounded-full" />
                    )}
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-white/60">
                  {subheading}
                </p>
              </div>

              {/* Form Content (LoginForm or RegisterForm) */}
              {children}

              {/* Card Bottom Switch Link */}
              <p className="mt-5 text-center text-xs text-white/50">
                {footerText}{' '}
                <Link
                  href={footerLinkHref}
                  className="font-semibold text-brand-emerald hover:text-brand-emerald/80 transition-colors"
                >
                  {footerLinkLabel}
                </Link>
              </p>

            </div>

            {/* Mobile-only: compact brand caption below the form */}
            <p className="lg:hidden mt-4 text-center text-xs text-white/40 leading-relaxed">
              Quran &nbsp;·&nbsp; School &nbsp;·&nbsp; University &nbsp;·&nbsp; Life
            </p>
          </div>

        </div>
      </main>

      {/* Bottom Trust Highlights Bar */}
      <div className="relative z-10 w-full border-t border-white/10 py-6 my-6 bg-[#041538]/40">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-brand-bright/15 border border-brand-bright/30 flex items-center justify-center text-brand-bright flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-2.18-7.51a48.067 48.067 0 015.666 0c.92.08 1.624.845 1.624 1.765v5.42a12.01 12.01 0 01-7.143 10.978 1.25 1.25 0 01-1.127 0A12.01 12.01 0 014.5 12.424V7.005c0-.92.704-1.685 1.624-1.765a48.067 48.067 0 015.696 0z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Secure &amp; Safe</span>
              <span className="text-[11px] text-white/50">Your data is protected with advanced encryption</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-brand-emerald/15 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">AI-Powered</span>
              <span className="text-[11px] text-white/50">Personalized learning for every student</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Trusted Platform</span>
              <span className="text-[11px] text-white/50">Used by thousands of families worldwide</span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
