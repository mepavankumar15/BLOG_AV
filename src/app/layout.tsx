// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export const metadata: Metadata = {
  title: 'BLOG AV',
  description: 'A modern blog platform built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#000000] text-white min-h-screen font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}