'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop: static, mobile: slide-in drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile close button */}
        <button
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebar}
      </div>

      {/* Main content */}
      <div className="dashboard-main flex min-h-screen min-w-0 flex-col">
        {/* Mobile top bar */}
        <div className="flex min-h-16 items-center gap-3 border-b border-blue-100 bg-white px-4 py-3 shadow-sm lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-navy-800 hover:bg-surface transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <BrandLogo variant="dark" size="sm" />
        </div>

        <main className="dashboard-content flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
