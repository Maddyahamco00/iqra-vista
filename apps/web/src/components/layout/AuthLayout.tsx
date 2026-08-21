import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  heading: string;
  subheading: string;
}

function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="islamic-star" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon
            points="30,4 34,22 52,18 40,30 52,42 34,38 30,56 26,38 8,42 20,30 8,18 26,22"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.4" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" opacity="0.06" />
    </svg>
  );
}

function FeaturePill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium text-white/70"
      style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export function AuthLayout({
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  heading,
  subheading,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-navy-950 text-white lg:flex lg:flex-row">

      {/* ── Desktop: left brand panel ── */}
      <div className="auth-brand-panel hidden lg:flex lg:w-[44%] min-h-screen relative flex-col items-center justify-center px-12 overflow-hidden">
        <IslamicPattern />

        {/* Decorative glow orbs */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #168FE8 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center max-w-xs">
          <BrandLogo variant="light" size="lg" type="full" />

          <div className="mt-8 mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="text-white/90 text-base font-medium leading-relaxed">
            AI-Powered Qur&apos;an &amp; Education Platform
          </p>
          <p className="mt-2 text-white/50 text-sm leading-relaxed">
            Personalized learning from Quran to University — guided by AI, rooted in Islamic values.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <FeaturePill icon="📖" label="Quran Learning" />
            <FeaturePill icon="🤖" label="AI Tutor" />
            <FeaturePill icon="🎓" label="Academic Path" />
            <FeaturePill icon="🌍" label="Global Access" />
          </div>

          {/* Journey steps */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/40">
            {['QURAN', 'SCHOOL', 'UNIVERSITY', 'LIFE'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="text-white/70 font-semibold">{step}</span>
                {i < arr.length - 1 && <span className="text-brand-gold">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-brand-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/70" />
            <div className="h-px w-10 bg-brand-gold/50" />
          </div>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <main className="auth-main-bg flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-10 lg:py-12">
        {/* Mobile logo */}
        <div className="mb-6 lg:hidden">
          <BrandLogo variant="light" size="md" type="full" />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 border border-blue-50">
            <div className="mb-6">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-800">
                {heading}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                {subheading}
              </p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-slate-500">
              {footerText}{' '}
              <Link href={footerLinkHref} className="font-semibold text-brand-royal hover:text-brand-bright transition-colors">
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
