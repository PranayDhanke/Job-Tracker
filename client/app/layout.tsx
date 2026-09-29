import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthLayout } from './auth-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trackly',
  description: 'Less tracking. More landing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
