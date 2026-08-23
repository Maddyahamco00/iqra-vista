'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/landing' },
    { label: 'Quran', href: '/student/lessons' },
    { label: 'School', href: '/student/dashboard' },
    { label: 'University', href: '/student/dashboard' },
    { label: 'AI Tutor', href: '/student/dashboard' },
    { label: 'About Us', href: '/landing#journey' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020B24]/90 backdrop-blur-lg border-b border-white/10 transition-all duration-200">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link 
            href="/landing" 
            className="flex items-center gap-2 transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none rounded-xl"
            aria-label="Iqra Vista Home"
          >
            <BrandLogo variant="light" size="md" type="full" />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-bright focus:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 hover:border-white/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-bright focus:outline-none"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#18A96B] to-[#16A6A0] hover:from-[#159a60] hover:to-[#149590] shadow-[0_4px_16px_rgba(24,169,107,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-emerald focus:outline-none"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#020B24]/95 backdrop-blur-xl px-4 pt-4 pb-6 transition-all duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl text-sm font-semibold text-white bg-white/[0.06] border border-white/15 hover:bg-white/10"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#18A96B] to-[#16A6A0]"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
