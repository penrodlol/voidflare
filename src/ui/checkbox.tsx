'use client';

import * as Radix from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

export type CheckboxProps = Radix.CheckboxProps & { label: string };

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, children, label, ...props }, ref) => {
    const id = useId();

    return (
      <div className={twMerge('flex select-none items-center gap-3', className)}>
        <Radix.Root
          {...props}
          id={id}
          ref={ref}
          className="flex h-4 w-4 appearance-none items-center justify-center rounded-sm border"
        >
          <Radix.Indicator>
            <CheckIcon size={12} aria-hidden />
          </Radix.Indicator>
        </Radix.Root>
        <label htmlFor={id} className="flex-1">
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
