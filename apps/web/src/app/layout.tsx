import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/common/QueryProvider';
import { AuthProvider } from '@/components/common/AuthProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IQRA VISTA - AI-Powered Quran Learning',
  description: 'Learn to Build the Future. Personalized AI Quran education for everyone.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
