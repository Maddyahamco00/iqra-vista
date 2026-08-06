'use client';

import { CircularProgress } from '@/components/common/CircularProgress';

export function ProgressOverview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
      <div className="flex justify-center mb-4">
        <CircularProgress percentage={58} size={120} strokeWidth={10} color="#0ea5e9" />
      </div>
      <div className="space-y-3">
        <ProgressBar label="Reading" value={82} color="bg-blue-500" />
        <ProgressBar label="Tajweed" value={75} color="bg-purple-500" />
        <ProgressBar label="Memorization" value={65} color="bg-emerald-500" />
        <ProgressBar label="Fluency" value={70} color="bg-amber-500" />
      </div>
    </div>
  );
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
