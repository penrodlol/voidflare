'use client';

import Combobox from '@/ui/combobox';
import Input, { type InputProps } from '@/ui/input';
import Separator from '@/ui/separator';
import { Search } from 'lucide-react';

export default function Filter({ items, ...props }: InputProps & { items: Array<string> }) {
  return (
    <form className="flex gap-6 text-xs">
      <Input {...props} icon={<Search />} className="flex-1" />
      <Separator orientation="vertical" />
      <Combobox placeholder="search sites" items={items} />
    </form>
  );
}
