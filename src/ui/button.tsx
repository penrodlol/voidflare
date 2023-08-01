'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={twMerge(
      'flex select-none items-center gap-2 rounded border px-4 py-1 bg-gradient',
      'hover:text-brand hover:bg-gradient-hover disabled:pointer-events-none',
      'disabled:opacity-50',
      className,
    )}
  />
));

Button.displayName = 'Button';

export default Button;
