import { NextAnchor } from '@/ui/anchor';
import type { Metadata } from 'next';
import { Kaisei_Tokumin, Maitree } from 'next/font/google';
import type { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import 'tailwindcss/tailwind.css';

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
          '!mx-auto flex min-h-screen max-w-screen-lg flex-col overscroll-none',
          'bg-1 px-fluid-4 text-sm text-1 antialiased',
        )}
      >
        <header className="sticky top-0 z-50 rounded bg-1">
          <div className="my-2 flex items-center justify-between rounded border px-4 py-2 text-xs">
            <NextAnchor href="/" aria-label="home" className="h-5 w-5 rounded border bg-2" />
            <nav>
              {/* prettier-ignore */}
              <ul className='flex gap-4'>
                {/* @ts-ignore */}
                <li><NextAnchor href="/posts/page/1">posts</NextAnchor></li>
                {/* @ts-ignore */}
                <li><NextAnchor href="/releases/page/1">releases</NextAnchor></li>
                <li><NextAnchor href="/about">about</NextAnchor></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="mx-auto mb-fluid-4 w-full max-w-screen-md flex-1">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
