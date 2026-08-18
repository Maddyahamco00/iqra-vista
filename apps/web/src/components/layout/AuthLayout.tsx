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

/** Inline SVG: repeating 8-point Islamic geometric star tile */
function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="islamic-star" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* 8-point star */}
          <polygon
            points="30,4 34,22 52,18 40,30 52,42 34,38 30,56 26,38 8,42 20,30 8,18 26,22"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" opacity="0.08" />
    </svg>
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left brand panel (desktop) / Top banner (tablet) / Mini header (mobile) ── */}

      {/* Mobile header (<md) */}
      <header className="md:hidden flex items-center justify-center py-5 px-4 bg-iqra-navy">
        <BrandLogo variant="light" size="sm" />
      </header>

      {/* Tablet banner (md → lg) */}
      <div
        className="hidden md:flex lg:hidden items-center justify-center h-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A192F 0%, #0F766E 100%)' }}
      >
        <IslamicPattern />
        <div className="relative z-10">
          <BrandLogo variant="light" size="md" />
        </div>
      </div>

      {/* Desktop brand panel (lg+) */}
      <div
        className="hidden lg:flex lg:w-[45%] relative flex-col items-center justify-center px-12 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0A192F 0%, #0F766E 100%)' }}
      >
        <IslamicPattern />
        <div className="relative z-10 text-center max-w-sm">
          <BrandLogo variant="light" size="lg" />
          <p className="mt-6 text-white/90 text-lg font-medium leading-relaxed">
            AI-Powered Qur&apos;an Learning for the Ummah
          </p>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            Personalized tajweed coaching, progress tracking, and parent insights — all in one place.
          </p>
          {/* Gold divider accent */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-iqra-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-iqra-gold/80" />
            <div className="h-px w-12 bg-iqra-gold/60" />
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <main className="flex-1 flex items-center justify-center bg-white px-4 py-8 md:py-12 lg:py-0">
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Form card */}
          <div className="bg-white lg:bg-white/95 lg:backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
            <div className="mb-6">
              <h1 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-iqra-navy">
                {heading}
              </h1>
              <p className="mt-1.5 text-sm lg:text-base text-slate-500 leading-relaxed">
                {subheading}
              </p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-slate-500">
              {footerText}{' '}
              <Link
                href={footerLinkHref}
                className="font-medium text-iqra-primary hover:underline"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
