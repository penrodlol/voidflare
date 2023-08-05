'use client';

import type { AriaAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type DividerProps = { className?: string; orientation?: AriaAttributes['aria-orientation'] };

export default function Separator({ className, orientation = 'horizontal' }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={twMerge(
        'rounded bg-2',
        orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
        className,
      )}
    />
  );
}
