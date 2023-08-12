'use client';

import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Button from './button';

export type ComboboxProps = {
  trigger: string;
  filter: string;
  items: Array<string>;
  defaultSelected?: Array<string>;
  disabled?: boolean;
  onApply?: (items: Array<string>) => void;
  onClear?: () => void;
};

export default function Combobox(props: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(props.defaultSelected));
  const [applied, setApplied] = useState<Set<string>>(new Set(props.defaultSelected));

  const isEqual = useMemo(() => {
    if (applied.size === 0 || selected.size !== applied.size) return false;
    return Array.from(selected).every((item) => applied.has(item));
  }, [selected, applied]);

  const handleSelect = (item: string) => {
    const next = new Set(selected);
    next.has(item) ? next.delete(item) : next.add(item);
    setSelected(next);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (applied.size === 0) setSelected(new Set());
  };

  const handleClear = () => {
    setSelected(new Set());
    setApplied(new Set());
    if (applied.size > 0) props.onClear?.();
    setOpen(false);
  };

  const handleApply = () => {
    setApplied(selected);
    props.onApply?.(Array.from(selected));
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          disabled={props.disabled ?? false}
          className="w-44 text-xs"
        >
          <span className="mr-auto">{props.trigger}</span>
          {applied.size > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full border bg-2 text-[10px]">
              {applied.size}
            </span>
          )}
          <ChevronsUpDown size={14} className="shrink-0" aria-hidden />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-50 rounded border bg-1 text-xs">
          <Command loop>
            <div className="relative rounded-t bg-2 p-1">
              <Search
                aria-hidden
                className="absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-2/80"
              />
              <Command.Input
                placeholder={props.filter}
                className="relative z-20 bg-transparent pl-7 placeholder:text-2/80 focus:outline-none"
              />
            </div>
            <Command.Empty className="py-3 text-center">no results</Command.Empty>
            <Command.Group className="px-2 py-3">
              {props.items.map((item) => (
                <Command.Item
                  key={item}
                  onSelect={handleSelect}
                  className="flex select-none items-center justify-between rounded px-1 data-[selected=true]:bg-2/70"
                >
                  {item}
                  {selected.has(item.toLowerCase()) && (
                    <Check size={14} aria-hidden className="shrink-0" />
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          </Command>
          <div className="flex justify-between bg-2 px-1 py-1.5">
            <Button color="ghost" size="sm" disabled={selected.size === 0} onClick={handleClear}>
              clear
            </Button>
            <Button size="sm" disabled={selected.size === 0 || isEqual} onClick={handleApply}>
              apply
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
