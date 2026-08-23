'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AiStudentHeroVisual } from '@/components/ui/AiStudentHeroVisual';

/**
 * IslamicPattern - Subtle geometric starry lattice background
 */
function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="landing-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon
            points="30,4 34,22 52,18 40,30 52,42 34,38 30,56 26,38 8,42 20,30 8,18 26,22"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.3" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#landing-pattern)" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#020B24] text-white flex flex-col selection:bg-brand-bright selection:text-white">
      {/* Top Fixed/Sticky Navbar */}
      <Navbar />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        <IslamicPattern />

        {/* Ambient background glows */}
        <div 
          className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #168FE8 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
                Learn to<br />
                <span className="bg-gradient-to-r from-[#18A96B] via-[#168FE8] to-[#1455B8] bg-clip-text text-transparent">
                  Build the
                </span><br />
                <span className="text-[#168FE8]">Future</span>
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Iqra Vista is an AI-powered platform that personalizes Quran learning and connects you to world-class education.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/student/lessons"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#1455B8] via-[#168FE8] to-[#6366F1] hover:from-[#11469e] hover:to-[#5558e6] shadow-[0_4px_24px_rgba(22,143,232,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Start Learning</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="#journey"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 hover:border-white/40 transition-all duration-200 text-center"
                >
                  Explore Iqra Vista
                </Link>
              </div>

              {/* 3 Feature Highlights under CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                  <div className="w-8 h-8 rounded-lg bg-brand-bright/15 border border-brand-bright/30 flex items-center justify-center text-brand-bright flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">AI-Powered</span>
                    <span className="text-[11px] text-white/50">Personalized learning</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                  <div className="w-8 h-8 rounded-lg bg-brand-emerald/15 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Adaptive</span>
                    <span className="text-[11px] text-white/50">For every student</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 justify-center lg:justify-start text-left">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Accessible</span>
                    <span className="text-[11px] text-white/50">Anywhere, anytime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 flex justify-center">
              <AiStudentHeroVisual variant="hero" />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FOUR CORE FEATURE CARDS GRID ── */}
      <section className="relative w-full py-16 bg-[#041538]/60 border-y border-white/5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Quran Reading */}
            <div className="rounded-2xl bg-[#061B4F]/70 border border-blue-500/20 p-6 flex flex-col justify-between hover:border-brand-gold/50 hover:bg-[#061B4F]/90 transition-all duration-300 shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(217,164,65,0.25)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Quran Reading</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Read, understand and connect with the Quran like never before.
                </p>
              </div>
              <Link
                href="/student/lessons"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
              >
                <span>Learn More</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 2: Tajweed */}
            <div className="rounded-2xl bg-[#061B4F]/70 border border-blue-500/20 p-6 flex flex-col justify-between hover:border-brand-emerald/50 hover:bg-[#061B4F]/90 transition-all duration-300 shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-emerald/15 border border-brand-emerald/40 flex items-center justify-center text-brand-emerald mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(24,169,107,0.25)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A48.334 48.334 0 0012 9.75c-2.551 0-5.056.2-7.5.583V21" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Tajweed</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Master Tajweed rules with AI feedback and interactive lessons.
                </p>
              </div>
              <Link
                href="/student/lessons"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-emerald hover:text-brand-emerald/80 transition-colors"
              >
                <span>Learn More</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 3: Memorization */}
            <div className="rounded-2xl bg-[#061B4F]/70 border border-blue-500/20 p-6 flex flex-col justify-between hover:border-brand-bright/50 hover:bg-[#061B4F]/90 transition-all duration-300 shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-bright/15 border border-brand-bright/40 flex items-center justify-center text-brand-bright mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(22,143,232,0.25)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Memorization</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Memorize Quran effectively with smart revision and tracking.
                </p>
              </div>
              <Link
                href="/student/lessons"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-bright hover:text-brand-bright/80 transition-colors"
              >
                <span>Learn More</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 4: AI Tutor */}
            <div className="rounded-2xl bg-[#061B4F]/70 border border-blue-500/20 p-6 flex flex-col justify-between hover:border-teal-400/50 hover:bg-[#061B4F]/90 transition-all duration-300 shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(20,166,160,0.25)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Tutor</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Your personal AI tutor guides, corrects and tracks your progress.
                </p>
              </div>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                <span>Learn More</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. A COMPLETE JOURNEY SECTION ── */}
      <section id="journey" className="relative w-full py-20 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              A Complete Journey
            </h2>
            <p className="text-base text-white/60">
              From Quran to real-life success
            </p>
          </div>

          {/* 4 Connected Circular Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
            
            {/* Step 1: Quran */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-emerald/30 to-brand-emerald/10 border-2 border-brand-emerald flex items-center justify-center text-brand-emerald shadow-[0_0_20px_rgba(24,169,107,0.35)] group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-bold text-white tracking-wider mb-2">QURAN</h3>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                Build a strong connection with the Quran.
              </p>
            </div>

            {/* Step 2: School */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-500/30 to-teal-500/10 border-2 border-teal-400 flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(20,166,160,0.35)] group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-bold text-white tracking-wider mb-2">SCHOOL</h3>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                Gain knowledge and strengthen your foundation.
              </p>
            </div>

            {/* Step 3: University */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-bright/30 to-brand-bright/10 border-2 border-brand-bright flex items-center justify-center text-brand-bright shadow-[0_0_20px_rgba(22,143,232,0.35)] group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A48.334 48.334 0 0012 9.75c-2.551 0-5.056.2-7.5.583V21" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-bold text-white tracking-wider mb-2">UNIVERSITY</h3>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                Pursue higher education and achieve excellence.
              </p>
            </div>

            {/* Step 4: Life */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/30 to-purple-500/10 border-2 border-purple-400 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-bold text-white tracking-wider mb-2">LIFE</h3>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                Apply knowledge and make a positive impact.
              </p>
            </div>

          </div>

          {/* ── 4. IMPACT STATISTICS BAR ── */}
          <div className="mt-20 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#041538]/90 via-[#061B4F]/90 to-[#041538]/90 border border-blue-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-brand-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                  </svg>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">25K+</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Active Students</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">1,200+</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Quran Lessons</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">50+</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Countries</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">98%</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Satisfaction Rate</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 5. PREMIUM FOOTER ── */}
      <Footer />
    </div>
  );
}
