/**
 * AuthVisual — Shared visual component for Login and Registration pages.
 *
 * Uses the official Iqra Vista family-with-Quran-and-tablet photograph.
 * Sits on the LEFT panel of the authentication layout.
 * Responsive: visible on md+ screens, hidden on mobile to give form full width.
 */

import Image from 'next/image';

interface AuthVisualProps {
  mode?: 'login' | 'register';
}

export function AuthVisual({ mode = 'login' }: AuthVisualProps) {
  const isRegister = mode === 'register';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 py-8 px-2">
      {/* ── Ambient glow behind image ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(22,143,232,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Main photograph ── */}
      <div className="relative w-full max-w-sm mx-auto">
        {/* Subtle decorative border glow */}
        <div
          className="absolute inset-[-4px] rounded-2xl pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(135deg, rgba(24,169,107,0.3) 0%, rgba(22,143,232,0.2) 50%, rgba(20,85,184,0.15) 100%)',
            borderRadius: '1rem',
          }}
        />
        <Image
          src="/images/heroes/iqra-vista-family-quran.jpg"
          alt="Muslim family — father, mother and child — reading the Quran together with an Iqra Vista tablet"
          width={400}
          height={480}
          priority
          className="relative w-full h-auto object-contain rounded-xl shadow-[0_20px_56px_rgba(0,0,0,0.55)]"
          sizes="(max-width: 1024px) 0vw, 40vw"
        />
      </div>

      {/* ── Brand caption ── */}
      <div className="relative w-full max-w-sm mx-auto text-center space-y-2">
        <p className="text-sm font-semibold text-white/90 leading-snug">
          {isRegister
            ? 'Join thousands of families on the path to knowledge'
            : 'Welcome back to your learning journey'}
        </p>
        <p className="text-xs text-white/50 leading-relaxed">
          Quran &nbsp;·&nbsp; School &nbsp;·&nbsp; University &nbsp;·&nbsp; Life
        </p>
      </div>

      {/* ── Islamic quote ── */}
      <div className="relative w-full max-w-sm mx-auto rounded-xl bg-white/[0.04] border border-white/10 border-l-4 border-l-brand-gold p-4 text-left">
        {isRegister ? (
          <>
            <p className="font-arabic text-lg text-white font-bold mb-1 text-right leading-loose">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </p>
            <p className="text-[11px] text-white/60 leading-relaxed">
              &ldquo;And say, My Lord, increase me in knowledge.&rdquo;{' '}
              <span className="text-brand-gold font-medium">(Quran 20:114)</span>
            </p>
          </>
        ) : (
          <p className="text-[11px] text-white/70 leading-relaxed italic">
            <span className="text-brand-gold font-serif text-base mr-1">&ldquo;</span>
            Read. In the name of your Lord who created.
            <span className="text-brand-gold font-serif text-base ml-1">&rdquo;</span>
            <span className="block mt-1 text-brand-gold font-medium not-italic">(Quran 96:1)</span>
          </p>
        )}
      </div>

      {/* ── Trust badges ── */}
      <div className="relative w-full max-w-sm mx-auto grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/8">
          <div className="text-brand-emerald text-sm font-bold">25K+</div>
          <div className="text-[10px] text-white/50">Students</div>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/8">
          <div className="text-brand-bright text-sm font-bold">50+</div>
          <div className="text-[10px] text-white/50">Countries</div>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/8">
          <div className="text-brand-gold text-sm font-bold">98%</div>
          <div className="text-[10px] text-white/50">Satisfaction</div>
        </div>
      </div>
    </div>
  );
}
