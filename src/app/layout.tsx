import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import 'tailwindcss/tailwind.css';

const sans = Inter({
  weight: ['400'],
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = { title: 'voidflare' };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={twJoin(sans.variable, 'ml-[calc(100vw-100%)]')}>
      <body className="flex min-h-screen flex-col bg-1 px-fluid-4 text-sm text-1 antialiased">
        <header className="border-b p-3">
          <div className="mx-auto flex max-w-screen-md justify-between">
            <span></span>
            <nav>
              {/* prettier-ignore */}
              <ul className="flex gap-4 text-xs">
                <li><Link href="/posts/page/1">posts</Link></li>
                {/* @ts-ignore */}
                <li><Link href="/releases/page/1">releases</Link></li>
                <li><Link href="/about">about</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t p-3">
          <div className="mx-auto max-w-screen-md"></div>
        </footer>
      </body>
    </html>
  );
}
