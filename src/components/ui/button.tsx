'use client';

import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'flex items-center gap-2 rounded border px-6 py-1 bg-gradient',
        'hover:text-brand hover:bg-gradient-hover disabled:pointer-events-none',
        'disabled:text-1/50',
        className,
      )}
    />
  );
}
