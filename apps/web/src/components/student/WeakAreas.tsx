'use client';

const weakAreas = [
  { area: 'Madd Rules', severity: 'high', recommendation: 'Needs Practice' },
  { area: 'Qalqalah', severity: 'medium', recommendation: 'Review Lesson 5' },
  { area: 'Pronunciation of ض', severity: 'medium', recommendation: 'Focus on Makharij' },
];

export function WeakAreas() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weak Areas</h3>
      <div className="space-y-3">
        {weakAreas.map((area, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-red-50 border border-red-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">{area.area}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                area.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>{area.severity}</span>
            </div>
            <p className="text-xs text-gray-500">{area.recommendation}</p>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:text-primary-700">
        View All Weak Areas →
      </button>
    </div>
  );
}
