'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

/**
 * GoldAccent - Elegant decorative gold line component
 * Inspired by the Iqra Vista reference design
 */
function GoldAccent() {
  return (
    <div className="flex items-center justify-center gap-3 px-4" aria-hidden="true">
      <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-brand-gold/60" />
      <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold/80 rounded-sm" />
      <div className="h-px flex-1 max-w-48 bg-gradient-to-r from-brand-gold/40 via-brand-gold/80 to-brand-gold/40" />
      <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold/80 rounded-sm" />
      <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-brand-gold/60 to-transparent" />
    </div>
  );
}

/**
 * IslamicPattern - Subtle geometric pattern overlay
 */
function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon
            points="20,2 22,14 34,12 26,20 34,28 22,26 20,38 18,26 6,28 14,20 6,12 18,14"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
            opacity="0.3"
          />
          <circle cx="20" cy="20" r="3" fill="none" stroke="white" strokeWidth="0.3" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-pattern)" />
    </svg>
  );
}

/**
 * FooterSection - Reusable footer column component
 */
interface FooterSectionProps {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-white/60 text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              {link.external && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * JourneyPath - Displays the educational journey: Quran to School to University to Life
 */
function JourneyPath() {
  const steps = ['QURAN', 'SCHOOL', 'UNIVERSITY', 'LIFE'];
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xs" aria-label="Educational journey">
      {steps.map((step, i, arr) => (
        <span key={step} className="flex items-center gap-2">
          <span className="text-white/50 font-medium">{step}</span>
          {i < arr.length - 1 && (
            <span className="text-brand-gold/70" aria-hidden="true">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * SocialIcon - Reusable social media icon component
 */
interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-brand-gold/40 transition-all duration-200"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer navigation links - only include pages that exist
  const quranLinks = [
    { label: 'Quran Reading', href: '#' },
    { label: 'Tajweed', href: '#' },
    { label: 'Memorization', href: '#' },
    { label: 'AI Tutor', href: '#' },
  ];

  const educationLinks = [
    { label: 'School', href: '#' },
    { label: 'University', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Learning Paths', href: '#' },
  ];

  const companyLinks = [
    { label: 'About Iqra Vista', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  // Social media links - only include if they exist
  // Currently empty - add when official links are available
  const hasSocialLinks = false;

  return (
    <footer className="w-full bg-gradient-dark relative" role="contentinfo">
      {/* Subtle glow effect at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, rgba(217,164,65,0.4) 20%, rgba(217,164,65,0.6) 50%, rgba(217,164,65,0.4) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(217,164,65,0.15)'
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gold Accent - Top decorative element */}
        <div className="pt-12 pb-6">
          <GoldAccent />
        </div>

        {/* Main Footer Content */}
        <div className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Brand Section - Left */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center lg:justify-start justify-center">
                <BrandLogo variant="light" size="md" type="full" />
              </div>
              
              <p className="text-center lg:text-left text-brand-gold/90 text-sm font-medium tracking-wide">
                Learn to Build the Future
              </p>
              
              <p className="text-center lg:text-left text-white/50 text-sm leading-relaxed max-w-sm">
                AI-Powered Quran and Education Platform. 
                Personalized learning from Quran to University - guided by AI, rooted in Islamic values.
              </p>

              {/* Educational Journey */}
              <div className="flex justify-center lg:justify-start pt-2">
                <JourneyPath />
              </div>

              {/* Social Media Icons - Only render if links exist */}
              {hasSocialLinks && (
                <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                  {/* Add social icons here when official links are available */}
                </div>
              )}
            </div>

            {/* Navigation Columns - Center/Right */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <FooterSection title="QURAN" links={quranLinks} />
                <FooterSection title="EDUCATION" links={educationLinks} />
                <FooterSection title="COMPANY" links={companyLinks} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" aria-hidden="true" />

        {/* Contact / CEO Section */}
        <div className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <h3 className="text-white/70 font-semibold text-sm uppercase tracking-wider">
                Contact
              </h3>
              
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:+9290240241111" 
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200 group"
                  aria-label="Call us at 090-240-241-11"
                >
                  <svg className="w-4 h-4 text-brand-gold/70 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25V1.5A2.25 2.25 0 0019.5 3.75h-2.25A15 15 0 002.25 6.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22.5 6.75c0 1.5-1.5 2.25-2.25 2.25h-1.5c-.75 0-2.25-.75-2.25-2.25 0-.75.75-2.25 2.25-2.25h1.5c.75 0 2.25.75 2.25 2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-3-3m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>090-240-241-11</span>
                </a>
                
                <a 
                  href="mailto:meddyahamco00@gmail.com" 
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200 group"
                  aria-label="Email us at meddyahamco00@gmail.com"
                >
                  <svg className="w-4 h-4 text-brand-gold/70 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>meddyahamco00@gmail.com</span>
                </a>
              </div>
            </div>

            {/* CEO / Founder */}
            <div className="md:text-right">
              <h3 className="text-white/70 font-semibold text-sm uppercase tracking-wider mb-2">
                Leadership
              </h3>
              <p className="text-white/80 font-medium text-sm">
                Maddy Ahamko
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                CEO and Founder, Iqra Vista
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>
              &copy; {currentYear} Iqra Vista. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-gold/50" aria-hidden="true" />
              <span>Learn to Build the Future</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Islamic pattern overlay */}
      <IslamicPattern />

      {/* Subtle bottom glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, rgba(22,143,232,0.2) 30%, rgba(24,169,107,0.15) 50%, rgba(22,143,232,0.2) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </footer>
  );
}