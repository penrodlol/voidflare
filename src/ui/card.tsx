'use client';

import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const base = tv({
  base: 'block h-full rounded border p-3 text-sm bg-gradient hover:text-brand hover:bg-gradient-hover',
});

export function Internal({ className, ...props }: LinkProps<string>) {
  return <Link {...props} className={twMerge(base(), className)} />;
}

export function External({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={twMerge(base(), className)}
    />
  );
}

export function Header({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge('flex items-center justify-between text-xs text-2', className)}
    />
  );
}

export function Body({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={twMerge('px-1 py-3', className)} />;
}
