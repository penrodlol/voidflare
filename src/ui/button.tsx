'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: 'flex select-none items-center gap-2 rounded focus:outline-none',
  defaultVariants: { color: 'outline', size: 'md' },
  variants: {
    disabled: { true: 'pointer-events-none opacity-50' },
    color: {
      outline: 'border hover:bg-2/50',
      ghost: 'bg-transparent hover:bg-2/50',
    },
    size: {
      sm: 'text-xs px-3 py-0.5',
      md: 'text-sm px-4 py-1',
      lg: 'text-base px-6 py-1.5',
    },
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof variants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, type, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    type={type ?? 'button'}
    className={twMerge(variants(props), className)}
  />
));

Button.displayName = 'Button';

export default Button;
