'use client';

import { useWeakAreas } from '@/hooks/useWeakAreas';
import { RefreshCw } from 'lucide-react';

export function WeakAreas() {
  const { weakAreas, isLoading, isError, refetch } = useWeakAreas();

  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Focus Areas</h3>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-100 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3.5 w-24 bg-slate-200 rounded" />
                <div className="h-5 w-12 bg-slate-100 rounded-full" />
              </div>
              <div className="h-3 w-40 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <p className="text-xs text-slate-400">Could not load focus areas.</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Empty — no weak areas means everything is going well */}
      {!isLoading && !isError && weakAreas.length === 0 && (
        <div className="py-4 text-center">
          <p className="text-sm font-semibold text-brand-emerald mb-1">Great work! 🎉</p>
          <p className="text-xs text-slate-400">
            No weak areas detected. Keep up the consistent practice!
          </p>
        </div>
      )}

      {/* Weak area cards */}
      {!isLoading && !isError && weakAreas.length > 0 && (
        <div className="space-y-2.5">
          {weakAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border"
              style={{
                background:
                  area.severity === 'high'
                    ? 'rgba(239,68,68,0.04)'
                    : 'rgba(245,158,11,0.04)',
                borderColor:
                  area.severity === 'high'
                    ? 'rgba(239,68,68,0.15)'
                    : 'rgba(245,158,11,0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-navy-800">{area.area}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background:
                      area.severity === 'high'
                        ? 'rgba(239,68,68,0.1)'
                        : 'rgba(245,158,11,0.1)',
                    color:
                      area.severity === 'high' ? '#dc2626' : '#d97706',
                  }}
                >
                  {area.avgScore}%
                </span>
              </div>
              <p className="text-xs text-slate-500">{area.recommendation}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="w-full mt-4 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors"
        onClick={() => refetch()}
      >
        View All Focus Areas →
      </button>
    </div>
  );
}
