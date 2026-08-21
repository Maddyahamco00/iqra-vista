'use client';

import { CheckCircle2, Circle } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Revision: Surah Al-Mulk (1-10)', completed: true, type: 'revision' },
  { id: 2, title: 'Tajweed: Madd Rules', completed: false, type: 'lesson' },
  { id: 3, title: 'Practice: Letters ج، ح، خ', completed: false, type: 'practice' },
  { id: 4, title: 'Memorization: New Verses', completed: false, type: 'memorization' },
];

const typeStyles: Record<string, { bg: string; color: string }> = {
  revision:    { bg: 'rgba(20,85,184,0.08)',   color: '#1455B8' },
  lesson:      { bg: 'rgba(22,166,160,0.08)',  color: '#16A6A0' },
  practice:    { bg: 'rgba(217,164,65,0.1)',   color: '#B8860B' },
  memorization:{ bg: 'rgba(24,169,107,0.08)', color: '#18A96B' },
};

export function TodaysPlan() {
  const done = tasks.filter((t) => t.completed).length;
  return (
    <div className="iv-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-navy-800">Today&apos;s Plan</h3>
          <p className="text-xs text-slate-400 mt-0.5">{done}/{tasks.length} completed</p>
        </div>
        <span className="text-xs font-semibold text-brand-royal cursor-pointer hover:text-brand-bright transition-colors">
          View Full Plan →
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-track mb-5">
        <div
          className="progress-fill"
          style={{ width: `${(done / tasks.length) * 100}%`, background: 'linear-gradient(90deg, #1455B8, #168FE8)' }}
        />
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const style = typeStyles[task.type];
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-blue-50/50"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#18A96B' }} />
              ) : (
                <Circle className="w-5 h-5 flex-shrink-0 text-slate-300" />
              )}
              <p className={`flex-1 text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-navy-800'}`}>
                {task.title}
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                style={{ background: style.bg, color: style.color }}
              >
                {task.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
