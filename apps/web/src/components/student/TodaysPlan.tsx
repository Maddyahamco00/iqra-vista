'use client';

import { CheckCircle2, Circle, Loader2, RefreshCw } from 'lucide-react';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';

const typeStyles: Record<string, { bg: string; color: string }> = {
  reading:      { bg: 'rgba(20,85,184,0.08)',   color: '#1455B8' },
  tajweed:      { bg: 'rgba(22,166,160,0.08)',  color: '#16A6A0' },
  memorization: { bg: 'rgba(24,169,107,0.08)',  color: '#18A96B' },
  recitation:   { bg: 'rgba(217,164,65,0.1)',   color: '#B8860B' },
  // fallback
  lesson:       { bg: 'rgba(22,166,160,0.08)',  color: '#16A6A0' },
  practice:     { bg: 'rgba(217,164,65,0.1)',   color: '#B8860B' },
};

function getTypeStyle(type: string) {
  return typeStyles[type] ?? { bg: 'rgba(99,102,241,0.08)', color: '#6366F1' };
}

export function TodaysPlan() {
  const { tasks, isLoading, isError, refetch } = useTodaysPlan();

  const done = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className="iv-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-navy-800">Today&apos;s Plan</h3>
          {isLoading ? (
            <p className="text-xs text-slate-400 mt-0.5">Loading…</p>
          ) : (
            <p className="text-xs text-slate-400 mt-0.5">{done}/{total} completed</p>
          )}
        </div>
        <span
          className="text-xs font-semibold text-brand-royal cursor-pointer hover:text-brand-bright transition-colors"
          onClick={() => refetch()}
        >
          View Full Plan →
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-track mb-5">
        <div
          className="progress-fill"
          style={{
            width: total > 0 ? `${(done / total) * 100}%` : '0%',
            background: 'linear-gradient(90deg, #1455B8, #168FE8)',
          }}
        />
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
              <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 h-4 bg-slate-200 rounded" />
              <div className="w-16 h-5 bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <p className="text-xs text-slate-400">Could not load today&apos;s plan.</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && tasks.length === 0 && (
        <p className="text-xs text-slate-400 text-center py-6">
          No lessons assigned for your level yet.
        </p>
      )}

      {/* Task list */}
      {!isLoading && !isError && tasks.length > 0 && (
        <div className="space-y-2">
          {tasks.map((task) => {
            const style = getTypeStyle(task.type);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-blue-50/50"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#18A96B' }} />
                ) : (
                  <Circle className="w-5 h-5 shrink-0 text-slate-300" />
                )}
                <p
                  className={`flex-1 text-sm font-medium ${
                    task.completed ? 'text-slate-400 line-through' : 'text-navy-800'
                  }`}
                >
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
      )}
    </div>
  );
}
