'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useRecentPerformance } from '@/hooks/useRecentPerformance';
import { RefreshCw } from 'lucide-react';

// Skeleton bars while loading
function ChartSkeleton() {
  return (
    <div className="h-56 flex items-end gap-2 px-2 animate-pulse">
      {[40, 65, 55, 80, 70, 85, 75].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-slate-200 rounded-t"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function RecentPerformance() {
  const { points, weekDelta, isLoading, isError, refetch } = useRecentPerformance();

  const deltaLabel =
    weekDelta > 0
      ? `↑ +${weekDelta}pts this week`
      : weekDelta < 0
        ? `↓ ${weekDelta}pts this week`
        : 'Stable this week';

  const deltaColor =
    weekDelta > 0 ? '#18A96B' : weekDelta < 0 ? '#ef4444' : '#94a3b8';
  const deltaBg =
    weekDelta > 0
      ? 'rgba(24,169,107,0.1)'
      : weekDelta < 0
        ? 'rgba(239,68,68,0.1)'
        : 'rgba(148,163,184,0.1)';

  return (
    <div className="iv-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-navy-800">Recent Performance</h3>
        {!isLoading && !isError && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: deltaBg, color: deltaColor }}
          >
            {deltaLabel}
          </span>
        )}
        {isLoading && (
          <div className="h-6 w-32 bg-slate-200 rounded-full animate-pulse" />
        )}
      </div>

      {isLoading && <ChartSkeleton />}

      {isError && !isLoading && (
        <div className="h-56 flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-slate-400">Could not load performance data.</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && points.length === 0 && (
        <div className="h-56 flex items-center justify-center">
          <p className="text-xs text-slate-400">
            Complete some lessons to see your performance chart.
          </p>
        </div>
      )}

      {!isLoading && !isError && points.length > 0 && (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFF6FF" />
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #DBEAFE',
                  boxShadow: '0 4px 16px rgba(6,27,79,0.08)',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                dot={{ fill: '#168FE8', r: 3.5, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#1455B8' }}
              />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1455B8" />
                  <stop offset="100%" stopColor="#168FE8" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
