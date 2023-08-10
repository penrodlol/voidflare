'use client';

import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const base = tv({
  base:
    'block h-full rounded border p-3 relative z-10 before:absolute ' +
    'bg-[linear-gradient(to_bottom_right,#1a1a1a,#0c0c0c)] before:content-[""] ' +
    'before:inset-0 before:-z-10 before:opacity-0 before:rounded before:transition-opacity ' +
    'before:bg-[linear-gradient(to_bottom_right,#2c2c2c,#0c0c0c)] before:duration-200 ' +
    'hover:before:opacity-100',
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
