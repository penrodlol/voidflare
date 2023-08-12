'use client';

import { cloneElement, forwardRef, type InputHTMLAttributes, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { icon?: ReactElement };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, spellCheck, autoComplete, type, disabled, ...props }, ref) => {
    return (
      <div className={twMerge('relative rounded border bg-1', disabled && 'opacity-50', className)}>
        {icon &&
          cloneElement(icon, {
            'aria-hidden': true,
            size: 14,
            className: 'z-10 absolute left-3 top-1/2 transform -translate-y-1/2 text-2/80',
          })}
        <input
          {...props}
          ref={ref}
          spellCheck={spellCheck ?? false}
          autoComplete={autoComplete ?? 'off'}
          type={type ?? 'text'}
          disabled={disabled ?? false}
          className={twMerge(
            'relative z-20 w-full bg-transparent py-1.5 pr-3 placeholder:text-2/80',
            'rounded focus:outline-none focus-visible:ring',
            icon ? 'pl-8' : 'pl-3',
          )}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
