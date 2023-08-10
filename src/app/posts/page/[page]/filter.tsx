'use client';

import Combobox from '@/ui/combobox';
import Input from '@/ui/input';
import { Search } from 'lucide-react';

type Props = { sites: Array<string> };

export default function Filter({ sites }: Props) {
  return (
    <form className="flex items-center gap-6 text-xs">
      <Input className="flex-1" placeholder="search posts" icon={<Search />} />
      <Combobox trigger="filter by sites" filter="search sites" items={sites} />
    </form>
  );
}
