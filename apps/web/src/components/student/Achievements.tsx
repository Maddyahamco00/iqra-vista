'use client';

import { Flame, Trophy, Star } from 'lucide-react';

const badges = [
  { icon: Flame, label: '7 Day Streak', bg: 'rgba(249,115,22,0.1)', color: '#ea580c' },
  { icon: Trophy, label: 'Practice Done', bg: 'rgba(20,85,184,0.1)', color: '#1455B8' },
  { icon: Star, label: '28 Lessons', bg: 'rgba(217,164,65,0.12)', color: '#B8860B' },
];

export function Achievements({ streak }: { streak: number }) {
  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Achievements</h3>

      {/* Streak highlight */}
      <div
        className="flex items-center gap-3 p-3.5 rounded-xl mb-4"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(217,164,65,0.08) 100%)', border: '1px solid rgba(217,164,65,0.2)' }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.12)' }}>
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <p className="font-bold text-navy-800 text-sm">{streak} Day Streak</p>
          <p className="text-xs text-slate-500">Keep it up — you&apos;re on fire!</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-xl text-center"
              style={{ background: badge.bg }}
            >
              <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: badge.color }} />
              <p className="text-xs font-semibold text-navy-800 leading-tight">{badge.label}</p>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors">
        View All Badges →
      </button>
    </div>
  );
}
