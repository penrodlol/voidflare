'use client';

import { NextAnchor } from '@/ui/anchor';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { twJoin } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type Props = { prev: string; next: string; isFirst: boolean; isLast: boolean };

const anchor = tv({
  base: 'flex items-center gap-2 rounded border px-6 py-1.5 bg-gradient hover:bg-gradient-hover',
});

export default function Paginator({ prev, next, isFirst, isLast }: Props) {
  return (
    <nav className="flex items-center justify-between">
      {!isFirst && (
        // @ts-ignore
        <NextAnchor href={prev} className={anchor()}>
          <ArrowLeft size={16} aria-hidden /> previous page
        </NextAnchor>
      )}
      {!isLast && (
        // @ts-ignore
        <NextAnchor href={next} className={twJoin(anchor(), 'ml-auto')}>
          next page <ArrowRight size={16} aria-hidden />
        </NextAnchor>
      )}
    </nav>
  );
}
