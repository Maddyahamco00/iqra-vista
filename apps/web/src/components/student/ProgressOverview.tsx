'use client';

import { CircularProgress } from '@/components/common/CircularProgress';
import { useProgressBreakdown } from '@/hooks/useProgressBreakdown';
import { RefreshCw } from 'lucide-react';

export function ProgressOverview() {
  const { breakdown, overall, isLoading, isError, refetch } = useProgressBreakdown();

  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Overall Progress</h3>

      {/* Circular gauge */}
      <div className="flex justify-center mb-5">
        {isLoading ? (
          <div className="w-28 h-28 rounded-full bg-slate-100 animate-pulse" />
        ) : (
          <CircularProgress
            percentage={overall}
            size={112}
            strokeWidth={9}
            color="#168FE8"
          />
        )}
      </div>

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <p className="text-xs text-slate-400">Could not load progress data.</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Category bars — skeleton while loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between mb-1.5">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-3 w-8 bg-slate-200 rounded" />
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div className="h-1.5 bg-slate-200 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live category breakdown bars */}
      {!isLoading && !isError && breakdown.length > 0 && (
        <div className="space-y-3">
          {breakdown.map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-medium">{label}</span>
                <span className="font-bold text-navy-800">
                  {value > 0 ? `${value}%` : '—'}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${value}%`, background: color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No data yet */}
      {!isLoading && !isError && breakdown.length === 0 && (
        <p className="text-xs text-slate-400 text-center py-2">
          Complete some lessons to see your progress breakdown.
        </p>
      )}
    </div>
  );
}
