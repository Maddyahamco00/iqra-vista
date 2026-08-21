'use client';

const weakAreas = [
  { area: 'Madd Rules', severity: 'high', recommendation: 'Needs Practice' },
  { area: 'Qalqalah', severity: 'medium', recommendation: 'Review Lesson 5' },
  { area: 'Pronunciation of ض', severity: 'medium', recommendation: 'Focus on Makharij' },
];

export function WeakAreas() {
  return (
    <div className="iv-card p-6">
      <h3 className="text-base font-bold text-navy-800 mb-4">Focus Areas</h3>
      <div className="space-y-2.5">
        {weakAreas.map((area, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl border"
            style={{
              background: area.severity === 'high' ? 'rgba(239,68,68,0.04)' : 'rgba(245,158,11,0.04)',
              borderColor: area.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-navy-800">{area.area}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: area.severity === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                  color: area.severity === 'high' ? '#dc2626' : '#d97706',
                }}
              >
                {area.severity}
              </span>
            </div>
            <p className="text-xs text-slate-500">{area.recommendation}</p>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-xs font-semibold text-brand-royal hover:text-brand-bright transition-colors">
        View All Focus Areas →
      </button>
    </div>
  );
}
