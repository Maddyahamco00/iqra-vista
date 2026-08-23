'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

/**
 * TopGoldAccent - Premium golden separator line with ornamental Islamic star
 * Inspired by the Iqra Vista reference design
 */
function TopGoldAccent() {
  return (
    <div className="relative w-full flex items-center justify-center py-2" aria-hidden="true">
      {/* Background soft gold glow */}
      <div 
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 w-3/4 max-w-2xl mx-auto blur-md opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 164, 65, 0.6) 0%, rgba(217, 164, 65, 0) 70%)',
        }}
      />

      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 sm:gap-4 px-4">
        {/* Left fading line */}
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-gold" />
        
        {/* Secondary diamond */}
        <div className="hidden sm:block w-1.5 h-1.5 rotate-45 bg-brand-gold/60 rounded-xs" />
        <div className="hidden sm:block h-[1px] w-8 bg-brand-gold/70" />

        {/* Center 8-pointed Islamic star badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/80 border border-brand-gold/40 shadow-[0_0_12px_rgba(217,164,65,0.35)]">
          <svg className="w-3.5 h-3.5 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 4.41L19.07 1.93L18.41 7.02L23.49 7.68L21.01 12.16L25.42 14.75L21.01 17.34L23.49 21.82L18.41 22.48L19.07 27.57L14.59 25.09L12 29.5L9.41 25.09L4.93 27.57L5.59 22.48L0.51 21.82L2.99 17.34L-1.42 14.75L2.99 12.16L0.51 7.68L5.59 7.02L4.93 1.93L9.41 4.41L12 0Z" 
              transform="scale(0.8) translate(3, 3)"
            />
          </svg>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase">
            IQRA VISTA
          </span>
          <svg className="w-3.5 h-3.5 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 4.41L19.07 1.93L18.41 7.02L23.49 7.68L21.01 12.16L25.42 14.75L21.01 17.34L23.49 21.82L18.41 22.48L19.07 27.57L14.59 25.09L12 29.5L9.41 25.09L4.93 27.57L5.59 22.48L0.51 21.82L2.99 17.34L-1.42 14.75L2.99 12.16L0.51 7.68L5.59 7.02L4.93 1.93L9.41 4.41L12 0Z" 
              transform="scale(0.8) translate(3, 3)"
            />
          </svg>
        </div>

        {/* Secondary diamond */}
        <div className="hidden sm:block h-[1px] w-8 bg-brand-gold/70" />
        <div className="hidden sm:block w-1.5 h-1.5 rotate-45 bg-brand-gold/60 rounded-xs" />

        {/* Right fading line */}
        <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-gold via-brand-gold/40 to-transparent" />
      </div>
    </div>
  );
}

/**
 * IslamicPatternBackground - Subtle vector Islamic geometric pattern overlay
 */
function IslamicPatternBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="footer-geometric-pattern" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            {/* 8-point geometric star & octagonal grid */}
            <polygon
              points="28,2 34,18 50,14 42,28 54,38 38,40 28,54 18,40 2,38 14,28 6,14 22,18"
              fill="none"
              stroke="#D9A441"
              strokeWidth="0.7"
            />
            <circle cx="28" cy="28" r="7" fill="none" stroke="#168FE8" strokeWidth="0.5" />
            <circle cx="28" cy="28" r="2" fill="#D9A441" />
            <rect x="20" y="20" width="16" height="16" fill="none" stroke="white" strokeWidth="0.4" transform="rotate(45 28 28)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-geometric-pattern)" />
      </svg>
      {/* Deep ambient glow overlays */}
      <div 
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1455B8 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #16A6A0 0%, transparent 70%)' }}
      />
    </div>
  );
}

/**
 * EducationalJourneyModel - Quran -> School -> University -> Life
 */
function EducationalJourneyModel() {
  const stages = [
    {
      name: 'Quran',
      label: 'Foundational',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: 'text-brand-gold bg-brand-gold/10 border-brand-gold/30',
    },
    {
      name: 'School',
      label: 'Core Academics',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
      ),
      color: 'text-brand-bright bg-brand-bright/10 border-brand-bright/30',
    },
    {
      name: 'University',
      label: 'Higher Degrees',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A48.334 48.334 0 0012 9.75c-2.551 0-5.056.2-7.5.583V21" />
        </svg>
      ),
      color: 'text-brand-emerald bg-brand-emerald/10 border-brand-emerald/30',
    },
    {
      name: 'Life',
      label: 'Lifelong Growth',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
        </svg>
      ),
      color: 'text-brand-teal bg-brand-teal/10 border-brand-teal/30',
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-gold">
            Educational Blueprint
          </span>
          <h4 className="text-sm font-semibold text-white">
            Integrated Learning Lifecycle
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-navy-950/60 px-3 py-1 rounded-full border border-white/5 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
          <span>AI-Guided Curriculum</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stages.map((stage, idx) => (
          <div
            key={stage.name}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-navy-950/40 border border-white/5 transition-all duration-200 hover:border-white/20 hover:bg-navy-950/70"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stage.color} flex-shrink-0`}>
              {stage.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  {stage.name}
                </span>
                {idx < stages.length - 1 && (
                  <span className="text-brand-gold/60 text-xs hidden sm:inline" aria-hidden="true">→</span>
                )}
              </div>
              <p className="text-[11px] text-white/50 truncate">
                {stage.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * FooterColumn - Reusable accessible navigation column
 */
interface FooterColumnProps {
  title: string;
  badge?: string;
  links: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

function FooterColumn({ title, badge, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
          {title}
        </h3>
        {badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
            {badge}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-start gap-1.5 text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded py-0.5"
            >
              <span className="text-brand-gold/40 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-150 text-xs mt-0.5" aria-hidden="true">
                ›
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-normal group-hover:text-white transition-colors">
                  {link.label}
                </span>
                {link.description && (
                  <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">
                    {link.description}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation Links tailored to Iqra Vista structure
  const quranLinks = [
    { label: 'Quran Reading', href: '/student/lessons', description: 'Interactive recitation' },
    { label: 'Tajweed Rules', href: '/student/lessons', description: 'Pronunciation precision' },
    { label: 'Memorization (Hifz)', href: '/student/lessons', description: 'Structured revision' },
    { label: 'AI Quran Tutor', href: '/student/dashboard', description: 'Real-time AI assistance' },
  ];

  const educationLinks = [
    { label: 'School Curriculum', href: '/student/dashboard', description: 'K-12 structured studies' },
    { label: 'University Studies', href: '/student/dashboard', description: 'Advanced academic tracks' },
    { label: 'Specialized Courses', href: '/student/lessons', description: 'Arabic & Islamic sciences' },
    { label: 'Assessments & Tests', href: '/student/assessments', description: 'Milestone evaluations' },
  ];

  const companyLinks = [
    { label: 'About Iqra Vista', href: '/landing' },
    { label: 'Student Portal', href: '/student/dashboard' },
    { label: 'Parent Portal', href: '/parent/dashboard' },
    { label: 'Admin Console', href: '/admin/dashboard' },
    { label: 'Sign In / Register', href: '/login' },
  ];

  return (
    <footer 
      className="w-full bg-gradient-to-b from-[#041538] via-[#020B24] to-[#010614] text-white relative overflow-hidden" 
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background patterns & radial glow highlights */}
      <IslamicPatternBackground />

      {/* Top Gold Accent Line Component */}
      <div className="pt-8 sm:pt-10 pb-4">
        <TopGoldAccent />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Brand Showcase Header Section */}
        <div className="pt-4 pb-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link 
              href="/landing" 
              className="inline-block transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none rounded-xl"
              aria-label="Iqra Vista Home"
            >
              <BrandLogo variant="light" size="lg" type="full" />
            </Link>
            <p className="text-brand-gold text-sm sm:text-base font-semibold tracking-wide flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Learn to Build the Future
            </p>
            <p className="text-white/60 text-xs sm:text-sm max-w-md leading-relaxed">
              Pioneering AI-powered education and sacred Quran learning — bridging timeless wisdom with modern scholastic excellence.
            </p>
          </div>

          {/* Quick Access Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            <Link
              href="/student/dashboard"
              className="px-4 py-2 rounded-xl bg-brand-royal/20 border border-brand-royal/40 text-brand-bright hover:bg-brand-royal/30 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm"
            >
              <span>Student Portal</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/parent/dashboard"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Parent Portal</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 rounded-xl bg-brand-emerald/15 border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald/25 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Admin Console</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Educational Identity Model (Quran -> School -> University -> Life) */}
        <div className="py-8">
          <EducationalJourneyModel />
        </div>

        {/* Main Footer Navigation Columns & Contact Information */}
        <div className="py-8 border-t border-white/10">
          <nav 
            aria-label="Footer navigation" 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
          >
            {/* Column 1: Quran (3 cols) */}
            <div className="lg:col-span-3">
              <FooterColumn
                title="Quran Learning"
                badge="Tajweed"
                links={quranLinks}
              />
            </div>

            {/* Column 2: Education (3 cols) */}
            <div className="lg:col-span-3">
              <FooterColumn
                title="Academic Tracks"
                badge="K-University"
                links={educationLinks}
              />
            </div>

            {/* Column 3: Platform & Company (2 cols) */}
            <div className="lg:col-span-2">
              <FooterColumn
                title="Platform"
                links={companyLinks}
              />
            </div>

            {/* Column 4: Executive Leadership & Direct Contact (4 cols) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-gradient-to-br from-navy-900/90 to-navy-950/90 border border-brand-gold/30 p-5 sm:p-6 shadow-lg relative overflow-hidden backdrop-blur-md">
                {/* Subtle gold corner ribbon effect */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #D9A441 0%, transparent 70%)' }}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-royal to-brand-gold/80 flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/20">
                    MA
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                      Executive Leadership
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">
                      Maddy Ahamko
                    </h3>
                    <p className="text-xs text-white/60">
                      CEO & Founder, Iqra Vista
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 flex flex-col gap-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Direct Inquiries & Contact
                  </span>
                  
                  {/* Phone */}
                  <a
                    href="tel:090-240-241-11"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-gold/50 hover:bg-white/[0.08] transition-all duration-200 text-xs sm:text-sm text-white/90 group focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none"
                    aria-label="Call Maddy Ahamko at 090-240-241-11"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25V1.5A2.25 2.25 0 0019.5 3.75h-2.25A15 15 0 002.25 6.75z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-medium">Telephone</span>
                      <span className="font-semibold text-white tracking-wide group-hover:text-brand-gold transition-colors">
                        090-240-241-11
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:meddyahamco00@gmail.com"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-gold/50 hover:bg-white/[0.08] transition-all duration-200 text-xs sm:text-sm text-white/90 group focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none"
                    aria-label="Email Maddy Ahamko at meddyahamco00@gmail.com"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-bright/15 border border-brand-bright/30 flex items-center justify-center text-brand-bright flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-white/40 uppercase font-medium">Email Address</span>
                      <span className="font-semibold text-white tracking-wide group-hover:text-brand-bright transition-colors truncate">
                        meddyahamco00@gmail.com
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Copyright & Brand Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>&copy; {currentYear} Iqra Vista. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2 text-brand-gold font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/70" aria-hidden="true" />
              <span>Learn to Build the Future.</span>
            </div>

            <div className="flex items-center gap-4 text-white/40">
              <Link href="/landing" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="/landing" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="/landing" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom ambient accent bar */}
      <div 
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #1455B8 0%, #168FE8 25%, #18A96B 50%, #D9A441 75%, #1455B8 100%)',
        }}
        aria-hidden="true"
      />
    </footer>
  );
}