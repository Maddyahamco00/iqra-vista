'use client';

import { CircularProgress } from '@/components/common/CircularProgress';

const bars = [
  { label: 'Reading', value: 82, color: '#1455B8' },
  { label: 'Tajweed', value: 75, color: '#16A6A0' },
  { label: 'Memorization', value: 65, color: '#18A96B' },
  { label: 'Fluency', value: 70, color: '#D9A441' },
];

export function ProgressOverview() {
  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Overall Progress</h3>
      <div className="flex justify-center mb-5">
        <CircularProgress percentage={58} size={112} strokeWidth={9} color="#168FE8" />
      </div>
      <div className="space-y-3">
        {bars.map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">{label}</span>
              <span className="font-bold text-navy-800">{value}%</span>
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
    </div>
  );
}
