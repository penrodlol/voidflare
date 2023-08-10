'use client';

import * as Switch from '@radix-ui/react-switch';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useState } from 'react';

export default function View() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch.Root
      className="rounded border"
      aria-label={`toggle ${checked ? 'grid' : 'list'} view`}
      checked={checked}
      onCheckedChange={setChecked}
    >
      <Switch.Thumb className="group flex h-full p-0.5">
        <div className="flex items-center rounded-sm px-3 transition-colors group-data-[state=unchecked]:bg-2">
          <LayoutGrid size={14} aria-hidden />
        </div>
        <div className="flex items-center rounded-sm px-3 transition-colors group-data-[state=checked]:bg-2">
          <LayoutList size={14} aria-hidden />
        </div>
      </Switch.Thumb>
    </Switch.Root>
  );
}