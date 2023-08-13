'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type RootProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type HeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;
export type BodyProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'>;

export function Root({ className, href, ...props }: RootProps) {
  const external = href?.startsWith('http');
  const Component = external ? 'a' : Link;

  return (
    <Component
      {...props}
      href={href}
      rel={external ? 'nofollow noopener noreferrer' : undefined}
      className={twMerge(
        'relative z-10 block h-full rounded border p-3 before:absolute',
        'bg-[linear-gradient(to_bottom_right,#1a1a1a,#0c0c0c)] before:content-[""]',
        'before:inset-0 before:-z-10 before:rounded before:opacity-0 before:transition-opacity',
        'before:duration-20 before:bg-[linear-gradient(to_bottom_right,#2c2c2c,#0c0c0c)]',
        'hover:before:opacity-100',
        className,
      )}
    />
  );
}

export function Header(props: HeaderProps) {
  return <div {...props} className="flex items-center justify-between text-xs text-2" />;
}

export function Body(props: BodyProps) {
  return <div {...props} className="px-1 py-3" />;
}
