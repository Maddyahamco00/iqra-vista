import type { Metadata } from 'next';
import { Inter, Amiri } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/common/QueryProvider';
import { AuthProvider } from '@/components/common/AuthProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'Iqra Vista — Learn to Build the Future',
  description: 'AI-Powered Personalized Quran Learning & Future Education Platform. Quran → School → University → Life.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    title: 'Iqra Vista — Learn to Build the Future',
    description: 'AI-Powered Personalized Quran Learning & Future Education Platform',
    siteName: 'Iqra Vista',
    images: [{ url: '/images/iqra-vista-logo.svg', width: 320, height: 80, alt: 'Iqra Vista' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Iqra Vista — Learn to Build the Future',
    description: 'AI-Powered Personalized Quran Learning & Future Education Platform',
    images: ['/images/iqra-vista-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1455B8" />
      </head>
      <body className={`${inter.variable} ${amiri.variable} ${inter.className}`}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: '12px',
                  border: '1px solid #DBEAFE',
                  fontSize: '14px',
                  color: '#061B4F',
                },
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
