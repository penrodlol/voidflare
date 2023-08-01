'use client';

import { cloneElement, forwardRef, type InputHTMLAttributes, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { icon?: ReactElement };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, spellCheck, autoComplete, ...props }, ref) => {
    return (
      <div className={twMerge('relative rounded border bg-1', className)}>
        {icon &&
          cloneElement(icon, {
            'aria-hidden': true,
            className: 'w-4 h-4 z-10 absolute left-3 top-1/2 transform -translate-y-1/2 text-2/80',
          })}
        <input
          {...props}
          ref={ref}
          spellCheck={spellCheck ?? false}
          autoComplete={autoComplete ?? 'off'}
          className={twMerge(
            'relative z-20 w-full bg-transparent py-1.5 pr-3',
            'placeholder:text-2/80 focus:outline-none',
            icon ? 'pl-10' : 'pl-3',
          )}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;