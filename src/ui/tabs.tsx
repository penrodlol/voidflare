'use client';

import * as Radix from '@radix-ui/react-tabs';
import { twJoin, twMerge } from 'tailwind-merge';

type Props = Radix.TabsProps & { values: Array<string> };

export function Tabs({ children, defaultValue, values, ...props }: Props) {
  return (
    <Radix.Root {...props} defaultValue={defaultValue ?? values[0]}>
      <Radix.List className="flex rounded-lg border p-1.5">
        {values.map((value) => (
          <Radix.Trigger
            key={value}
            value={value}
            className={twJoin(
              'flex-1 rounded border p-1 data-[state=inactive]:border-transparent',
              'hover:text-brand/90 data-[state=active]:bg-gradient motion-safe:transition-colors',
            )}
          >
            {value}
          </Radix.Trigger>
        ))}
      </Radix.List>
      {children}
    </Radix.Root>
  );
}

export function Tab({ className, ...props }: Radix.TabsContentProps) {
  return <Radix.Content {...props} className={twMerge('mt-10', className)} />;
}
