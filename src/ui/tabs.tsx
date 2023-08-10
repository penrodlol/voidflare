'use client';

import * as Radix from '@radix-ui/react-tabs';
import { twJoin } from 'tailwind-merge';

type Props = Radix.TabsProps & { values: Array<string> };

export const Tab = Radix.TabsContent;

export function Tabs({ children, defaultValue, values, ...props }: Props) {
  return (
    <Radix.Root {...props} defaultValue={defaultValue ?? values[0]}>
      <Radix.List className="mb-10 flex rounded border p-1.5">
        {values.map((value) => (
          <Radix.Trigger
            key={value}
            value={value}
            className={twJoin(
              'flex-1 rounded border p-1 text-2 data-[state=active]:bg-2',
              'data-[state=inactive]:border-transparent data-[state=active]:text-1',
              'motion-safe:transition-colors',
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
