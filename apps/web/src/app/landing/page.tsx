'use client';

import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { BrandLogo } from '@/components/ui/BrandLogo';

/**
 * Landing Page - A showcase page for the Iqra Vista footer
 * This page demonstrates the footer in its proper context
 */

function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon
            points="30,4 34,22 52,18 40,30 52,42 34,38 30,56 26,38 8,42 20,30 8,18 26,22"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="white" strokeWidth="0.4" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-pattern)" opacity="0.04" />
    </svg>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="iv-card p-6 hover:shadow-card-hover transition-shadow duration-300">
      <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function JourneyStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-navy-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-dark flex items-center justify-center overflow-hidden">
        <IslamicPattern />
        
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #168FE8 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <BrandLogo variant="light" size="lg" type="full" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered Quran & Education Platform
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Personalized learning from Quran to University — guided by AI, rooted in Islamic values.
            Learn to Build the Future.
          </p>

          {/* Journey Steps */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 text-white/60 text-sm">
            {['QURAN', 'SCHOOL', 'UNIVERSITY', 'LIFE'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="text-white/80 font-semibold">{step}</span>
                {i < arr.length - 1 && (
                  <span className="text-brand-gold/70" aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login" 
              className="btn-primary px-8 py-4 text-lg"
            >
              Get Started
            </Link>
            <Link 
              href="/register" 
              className="btn-outline px-8 py-4 text-lg text-white border-white/30 hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-heading mb-12">
            <h2 className="mb-4">Comprehensive Islamic Education</h2>
            <p>
              From Quran recitation to advanced academic pursuits, Iqra Vista provides a complete 
              educational journey guided by AI and rooted in Islamic values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="📖"
              title="Quran Learning"
              description="Master Quran recitation with proper Tajweed rules through AI-powered guidance and personalized feedback."
            />
            <FeatureCard
              icon="🤖"
              title="AI Tutor"
              description="Get instant help with your questions through our intelligent AI assistant that understands your learning style."
            />
            <FeatureCard
              icon="🎓"
              title="Academic Path"
              description="Structured learning paths from basic education to university-level studies with certified programs."
            />
            <FeatureCard
              icon="🌍"
              title="Global Access"
              description="Learn from anywhere in the world with flexible scheduling and multilingual support."
            />
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="section bg-white">
        <div className="section-container">
          <div className="section-heading mb-12">
            <h2>Your Educational Journey</h2>
            <p>
              Iqra Vista guides you through every stage of learning, from foundational Quran education 
              to advanced academic achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <JourneyStep
              number="1"
              title="Quran"
              description="Begin with Quran recitation, memorization, and understanding Tajweed fundamentals."
            />
            <JourneyStep
              number="2"
              title="School"
              description="Build foundational knowledge in Islamic studies, Arabic, and core academic subjects."
            />
            <JourneyStep
              number="3"
              title="University"
              description="Pursue advanced studies with specialized courses and degree programs."
            />
            <JourneyStep
              number="4"
              title="Life"
              description="Apply your knowledge throughout life with continuous learning and growth."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-dark text-center">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Join thousands of students learning with Iqra Vista&apos;s AI-powered platform.
            </p>
            <Link 
              href="/register" 
              className="btn-primary px-8 py-4 text-lg inline-flex"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}