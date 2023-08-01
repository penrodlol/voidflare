'use client';

import { ArrowUpRight } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

const base = tv({ base: 'flex items-center gap-2 hover:text-brand' });

export const Anchor = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, ...props }: Props, ref) => {
    return (
      <a
        {...props}
        ref={ref}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={twMerge(base(), 'text-brand hover:text-brand/80', className)}
      >
        {children} <ArrowUpRight size={16} aria-hidden />
      </a>
    );
  },
);

export const NextAnchor = forwardRef<HTMLAnchorElement, LinkProps<string>>(
  ({ className, ...props }, ref) => {
    return <Link {...props} ref={ref} className={twMerge(base(), className)} />;
  },
);

Anchor.displayName = 'Anchor';
NextAnchor.displayName = 'NextAnchor';
