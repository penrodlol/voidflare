import type { Metadata } from 'next';
import { Kaisei_Tokumin, Maitree } from 'next/font/google';
import type { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import 'tailwindcss/tailwind.css';
import Header from './header';

const maitree = Maitree({
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
});

const kaisei = Kaisei_Tokumin({
  weight: ['500'],
  variable: '--font-serif',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = { title: 'astral' };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={twJoin(maitree.variable, kaisei.variable, 'ml-[calc(100vw-100%)]')}>
      <body
        className={twJoin(
          'mx-auto flex min-h-screen max-w-screen-lg flex-col overscroll-none',
          'bg-1 px-fluid-4 text-sm text-1 antialiased',
        )}
      >
        <Header />
        <main className="mx-auto mb-fluid-4 w-full max-w-screen-md flex-1">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
