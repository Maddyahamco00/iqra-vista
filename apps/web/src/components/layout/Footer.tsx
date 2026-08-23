'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

/**
 * TopGoldAccent - Golden separator line matching reference image
 */
function TopGoldAccent() {
  return (
    <div className="relative w-full flex items-center justify-center py-4" aria-hidden="true">
      <div 
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 w-3/4 max-w-3xl mx-auto blur-md opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 164, 65, 0.6) 0%, rgba(217, 164, 65, 0) 75%)',
        }}
      />

      <div className="w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-4 px-4">
        {/* Left gold line */}
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-brand-gold" />
        
        {/* Center 8-pointed Islamic Star Symbol ✦ */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-navy-950/90 border border-brand-gold/60 text-brand-gold shadow-[0_0_16px_rgba(217,164,65,0.4)]">
          <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 4.41L19.07 1.93L18.41 7.02L23.49 7.68L21.01 12.16L25.42 14.75L21.01 17.34L23.49 21.82L18.41 22.48L19.07 27.57L14.59 25.09L12 29.5L9.41 25.09L4.93 27.57L5.59 22.48L0.51 21.82L2.99 17.34L-1.42 14.75L2.99 12.16L0.51 7.68L5.59 7.02L4.93 1.93L9.41 4.41L12 0Z" 
              transform="scale(0.8) translate(3, 3)"
            />
          </svg>
        </div>

        {/* Right gold line */}
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-brand-gold via-brand-gold/50 to-transparent" />
      </div>
    </div>
  );
}

/**
 * IslamicPatternBackground - Vector geometric lattice pattern
 */
function IslamicPatternBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="footer-geometric-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon
              points="30,2 36,18 52,14 44,30 56,40 40,42 30,58 20,42 4,40 16,30 8,14 24,18"
              fill="none"
              stroke="#D9A441"
              strokeWidth="0.7"
            />
            <circle cx="30" cy="30" r="8" fill="none" stroke="#168FE8" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="2" fill="#D9A441" />
            <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.4" transform="rotate(45 30 30)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-geometric-pattern)" />
      </svg>
      {/* Ambient background glows */}
      <div 
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1455B8 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }}
      />
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quranLinks = [
    { label: 'Quran Reading', href: '/student/lessons' },
    { label: 'Tajweed', href: '/student/lessons' },
    { label: 'Memorization', href: '/student/lessons' },
    { label: 'AI Tutor', href: '/student/dashboard' },
  ];

  const educationLinks = [
    { label: 'School', href: '/student/dashboard' },
    { label: 'University', href: '/student/dashboard' },
    { label: 'Courses', href: '/student/lessons' },
    { label: 'Learning Paths', href: '/student/dashboard' },
  ];

  const companyLinks = [
    { label: 'About Iqra Vista', href: '/landing' },
    { label: 'Careers', href: '/landing' },
    { label: 'Privacy Policy', href: '/landing' },
    { label: 'Terms of Service', href: '/landing' },
    { label: 'Contact Us', href: '/landing' },
  ];

  return (
    <footer 
      className="w-full bg-[#020B24] text-white relative overflow-hidden" 
      role="contentinfo"
      aria-label="Site footer"
    >
      <IslamicPatternBackground />

      {/* Top Gold Accent Separator Line */}
      <div className="pt-6 sm:pt-8 pb-2">
        <TopGoldAccent />
      </div>

      {/* Main Footer Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        
        {/* Navigation & Contact Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          
          {/* Brand Showcase Column (Left - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link 
              href="/landing" 
              className="inline-block transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none rounded-xl"
              aria-label="Iqra Vista Home"
            >
              <BrandLogo variant="light" size="lg" type="full" />
            </Link>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              AI-Powered Personalized Quran Learning &amp; Future Education Platform
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-royal/30 hover:border-brand-royal/60 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-600/30 hover:border-red-500/60 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-pink-600/30 hover:border-pink-500/60 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-bright/30 hover:border-brand-bright/60 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: QURAN (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              QURAN
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quranLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-150 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: EDUCATION (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              EDUCATION
            </h3>
            <ul className="flex flex-col gap-2.5">
              {educationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-150 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              COMPANY
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-150 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              CONTACT
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:090-240-241-11"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors duration-150 group"
              >
                <svg className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25V1.5A2.25 2.25 0 0019.5 3.75h-2.25A15 15 0 002.25 6.75z" />
                </svg>
                <span className="font-mono text-xs">090-240-241-11</span>
              </a>

              <a
                href="mailto:meddyahamco00@gmail.com"
                className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors duration-150 group"
              >
                <svg className="w-4 h-4 text-brand-bright group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-xs truncate">meddyahamco00@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* CEO / FOUNDER Centered Section */}
        <div className="border-t border-white/10 pt-8 pb-4 text-center">
          <div className="inline-flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-1">
              CEO / FOUNDER
            </span>
            <h4 className="text-lg font-bold text-white tracking-wide">
              Maddy Ahamko
            </h4>
          </div>
        </div>

        {/* Bottom Copyright & Tagline Row */}
        <div className="border-t border-white/10 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/50 text-center">
          <p>
            &copy; {currentYear} Iqra Vista. All rights reserved.
          </p>
          <span className="hidden sm:inline text-white/20">|</span>
          <p className="text-white/70 italic font-medium">
            &ldquo;Learn to Build the Future.&rdquo;
          </p>
        </div>

      </div>
    </footer>
  );
}
