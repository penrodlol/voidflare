'use client';

import { ArrowUpRight } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

const base = tv({ base: 'flex items-center gap-2 hover:text-brand' });

export function Anchor({ children, className, ...props }: Props) {
  <a
    {...props}
    target="_blank"
    rel="nofollow noopener noreferrer"
    className={twMerge(base(), 'text-brand hover:text-brand/80', className)}
  >
    {children} <ArrowUpRight size={16} aria-hidden />
  </a>;
}

export function NextAnchor<T extends string>({ className, ...props }: LinkProps<T>) {
  return <Link {...props} className={twMerge(base(), className)} />;
}
