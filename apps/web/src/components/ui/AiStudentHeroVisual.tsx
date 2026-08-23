'use client';

import { useState, useEffect } from 'react';

interface AiStudentHeroVisualProps {
  variant?: 'hero' | 'auth';
  compact?: boolean;
}

export function AiStudentHeroVisual({ variant = 'hero', compact = false }: AiStudentHeroVisualProps) {
  const [pulseWave, setPulseWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseWave((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center p-2 sm:p-4 select-none" aria-hidden="true">
      {/* Outer ambient glow circles */}
      <div 
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #168FE8 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-6 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #18A96B 0%, transparent 70%)' }}
      />

      {/* Main Illustration Container */}
      <div className="relative w-full aspect-[4/3] min-h-[340px] sm:min-h-[380px] max-h-[420px] rounded-3xl bg-gradient-to-b from-[#061B4F]/80 via-[#041538]/90 to-[#020B24] border border-blue-500/30 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Background Islamic Architectural Silhouettes & Crescent Moon */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {/* Crescent Moon & Star */}
          <div className="absolute top-5 left-6 flex items-center gap-1.5 text-brand-gold">
            <svg className="w-6 h-6 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
            </svg>
            <span className="text-[10px] text-brand-gold">✦</span>
          </div>

          {/* Minarets and Domes vector */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-32 text-blue-900/50" viewBox="0 0 400 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,120 L0,80 L20,80 L20,30 L25,10 L30,30 L30,80 L60,80 L60,50 Q80,20 100,50 L100,80 L130,80 L130,20 L135,5 L140,20 L140,80 L180,80 Q210,10 240,80 L280,80 L280,35 L285,15 L290,35 L290,80 L320,80 Q340,30 360,80 L360,40 L365,20 L370,40 L370,80 L400,80 L400,120 Z" />
          </svg>
        </div>

        {/* Top Floating Holographic Card: AI TUTOR */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0B2356]/90 border border-blue-400/30 shadow-[0_0_16px_rgba(22,143,232,0.3)] backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-bright to-brand-royal flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-bright tracking-wider block">
                AI TUTOR
              </span>
              <p className="text-[11px] font-medium text-white/90">
                Personalized Quranic Journey
              </p>
            </div>
          </div>

          {/* Surah header pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-950/80 border border-brand-gold/40 text-brand-gold text-xs shadow-sm">
            <span className="font-arabic font-bold text-sm">سُوْرَةُ الرَّحْمَٰنِ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
          </div>
        </div>

        {/* Central Glowing Tablet Graphic with Tajweed analysis */}
        <div className="relative z-10 flex items-center justify-center my-auto py-2">
          <div className="relative w-64 sm:w-80 h-36 rounded-2xl bg-gradient-to-br from-[#0B2560] to-[#041538] border-2 border-brand-bright/70 shadow-[0_0_30px_rgba(22,143,232,0.45)] p-3 flex flex-col justify-between">
            {/* Tablet top bar */}
            <div className="flex items-center justify-between text-[10px] text-blue-200/80 border-b border-blue-400/20 pb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                Live Tajweed AI Tutor
              </span>
              <span className="font-mono text-brand-gold">Ayah 1-4</span>
            </div>

            {/* Arabic Quran Calligraphy */}
            <div className="text-center py-1">
              <p className="font-arabic text-xl sm:text-2xl text-white font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(22,143,232,0.8)]">
                الرَّحْمَٰنُ • عَلَّمَ الْقُرْآنَ
              </p>
              <p className="text-[10px] text-blue-200/80 mt-0.5">
                The Most Merciful • Taught the Qur&apos;an
              </p>
            </div>

            {/* Live Tajweed Audio Waveform */}
            <div className="rounded-lg bg-navy-950/90 p-1.5 border border-blue-400/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[9px] text-brand-bright font-semibold">
                <svg className="w-3 h-3 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tajweed Waveform</span>
              </div>
              {/* Dynamic waveform bars */}
              <div className="flex items-center gap-0.5 h-3.5 flex-1 justify-center px-1">
                {[35, 75, 55, 95, 65, 90, 45, 80, 100, 40, 70, 55, 85, 35].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-brand-royal via-brand-bright to-brand-emerald transition-all duration-300"
                    style={{ height: `${(h * ((pulseWave + i * 7) % 100)) / 100 + 20}%` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-brand-emerald bg-brand-emerald/15 px-1.5 py-0.5 rounded border border-brand-emerald/40">
                92%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Holographic Cards: Memorization Progress & Daily Goal */}
        <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-navy-950/90 border border-brand-emerald/30 shadow-[0_0_16px_rgba(24,169,107,0.2)]">
            <div className="w-7 h-7 rounded-lg bg-brand-emerald/20 border border-brand-emerald/40 flex items-center justify-center text-brand-emerald font-bold text-xs">
              75%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white">Memorization Progress</span>
                <span className="text-[10px] text-brand-emerald font-semibold">On Track</span>
              </div>
              {/* Progress bar */}
              <div className="w-32 sm:w-44 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-emerald to-teal-400 rounded-full w-3/4" />
              </div>
            </div>
          </div>

          {/* Golden Lantern Ornament */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-950/80 border border-brand-gold/30 text-brand-gold shadow-sm">
            <svg className="w-4 h-4 text-brand-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <span className="text-[10px] font-medium hidden sm:inline">Daily Hifz</span>
          </div>
        </div>

      </div>
    </div>
  );
}
