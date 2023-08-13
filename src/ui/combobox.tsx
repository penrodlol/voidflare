'use client';

import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from './button';
import Button from './button';

const ComboboxContext = createContext({
  open: false,
  selected: new Set<string>(),
  onClear: () => {},
  onItemSelect: (_: string) => {},
});

export type RootProps = Omit<Popover.PopoverProps, 'open' | 'onOpenChange'> & {
  defaultSelected?: Array<string>;
  onBlur?: (items: Array<string> | undefined) => void;
  onClear?: () => void;
};
export type TriggerProps = Omit<ButtonProps, 'role' | 'aria-expanded'>;
export type ContentProps = ComponentPropsWithoutRef<typeof Command> & { items: Array<string> };

export function Root({ onBlur, onClear: _onClear, defaultSelected, ...props }: RootProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(new Set<string>());

  useEffect(() => setSelected(new Set(defaultSelected)), [defaultSelected]);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) onBlur?.(selected.size > 0 ? Array.from(selected) : undefined);
  };

  const onItemSelect = (item: string) => {
    const next = new Set(selected);
    next.has(item) ? next.delete(item) : next.add(item);
    setSelected(next);
  };

  const onClear = () => {
    setSelected(new Set());
    _onClear?.();
  };

  return (
    <ComboboxContext.Provider value={{ open, selected, onItemSelect, onClear }}>
      <Popover.Root {...props} open={open} onOpenChange={onOpenChange} />
    </ComboboxContext.Provider>
  );
}

export function Trigger({ className, children, ...props }: TriggerProps) {
  const { open, selected } = useContext(ComboboxContext);

  return (
    <Popover.Trigger asChild>
      <Button
        {...props}
        role="combobox"
        aria-expanded={open}
        className={twMerge('w-44 text-xs', className)}
      >
        <span className="mr-auto">{children}</span>
        {selected.size > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full border bg-2 text-[10px]">
            {selected.size}
          </span>
        )}
        <ChevronsUpDown size={14} className="shrink-0" aria-hidden />
      </Button>
    </Popover.Trigger>
  );
}

export function Content({ items, placeholder }: ContentProps) {
  const { selected, onItemSelect, onClear } = useContext(ComboboxContext);

  return (
    <Popover.Portal>
      <Popover.Content className="z-50 rounded border bg-1 text-xs">
        <Command loop>
          <div className="relative rounded-t bg-2 p-1">
            <Search className="absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-2/80" />
            <Command.Input
              placeholder={placeholder}
              className="relative z-20 bg-transparent pl-7 placeholder:text-2/80 focus:outline-none"
            />
          </div>
          <Command.Empty className="py-3 text-center">no results</Command.Empty>
          <Command.Group className="px-2 py-3">
            {items.map((item) => (
              <Command.Item
                key={item}
                onSelect={onItemSelect}
                className="flex select-none items-center justify-between rounded px-1 data-[selected=true]:bg-2/70"
              >
                {item}
                {selected.has(item.toLowerCase()) && <Check size={14} className="shrink-0" />}
              </Command.Item>
            ))}
          </Command.Group>
        </Command>
        <div className="flex justify-end bg-2 px-1 py-1.5">
          <Button size="sm" disabled={selected.size === 0} onClick={onClear}>
            clear
          </Button>
        </div>
      </Popover.Content>
    </Popover.Portal>
  );
}
