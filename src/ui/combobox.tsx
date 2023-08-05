'use client';

import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Button from './button';
import { input, inputIcon } from './input';

export type ComboboxProps = { placeholder: string; items: Array<string> };

export default function Combobox({ placeholder, items: _items }: ComboboxProps) {
  const items = useMemo(() => _items.map((item) => item.toLowerCase()), [_items]);
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const onSelect = (item: string) => {
    const next = new Set(selected);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setSelected(next);
  };

  const onOpenChange = (open: boolean) => {
    if (!open && !applied) setSelected(new Set());
    setOpen(open);
  };

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <Button
          role="combobox"
          color="secondary"
          aria-expanded={open}
          className="w-52 justify-between"
        >
          filter sites
          <ChevronsUpDown size={14} className="shrink-0" aria-hidden />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded border bg-1 text-xs shadow" sideOffset={5}>
          <Command loop className="flex max-h-96 w-56 flex-col overflow-hidden">
            <div className="relative rounded-t border-b" cmdk-input-wrapper="">
              <Search className={inputIcon()} />
              <Command.Input placeholder={placeholder} className={twJoin(input(), 'pl-10')} />
            </div>
            <Command.Group className="overflow-y-auto p-3">
              {items.map((item) => (
                <Command.Item
                  key={item}
                  onSelect={onSelect}
                  className={twJoin(
                    'flex select-none items-center justify-between rounded border border-transparent text-2',
                    'px-2 py-0.5 hover:border-default hover:text-brand hover:bg-gradient-hover',
                    'data-[selected=true]:border-default data-[selected=true]:text-brand',
                    'data-[selected=true]:bg-gradient-hover',
                  )}
                >
                  {item}
                  {selected.has(item) && <Check size={14} aria-hidden className="shrink-0" />}
                </Command.Item>
              ))}
            </Command.Group>
          </Command>
          <div className="flex justify-between rounded-b border-t p-3">
            <Button
              color="ghost"
              size="sm"
              disabled={selected.size === 0}
              onClick={() => [setSelected(new Set()), setApplied(false)]}
            >
              clear
            </Button>
            <Button
              size="sm"
              disabled={selected.size === 0}
              onClick={() => [setApplied(true), setOpen(false)]}
            >
              apply
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
