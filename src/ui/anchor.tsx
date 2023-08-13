'use client';

import { ArrowUpRight } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type NextAnchorProps = AnchorProps & LinkProps;

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <a
        {...props}
        ref={ref}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={twMerge('flex items-center gap-2', className)}
      >
        {children} <ArrowUpRight size={16} aria-hidden />
      </a>
    );
  },
);

export const NextAnchor = forwardRef<HTMLAnchorElement, NextAnchorProps>(
  ({ className, ...props }, ref) => {
    return <Link {...props} ref={ref} className={twMerge('flex items-center gap-2', className)} />;
  },
);

Anchor.displayName = 'Anchor';
NextAnchor.displayName = 'NextAnchor';
