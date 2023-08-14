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

type ContextState = { open: boolean; value: string | undefined };
type ContextActions = { setOpen: (open: boolean) => void; setValue: (value: string) => void };
const Context = createContext<ContextState & ContextActions>({
  open: false,
  value: undefined,
  setOpen: () => {},
  setValue: () => {},
});

type BaseRootProps = Omit<Popover.PopoverProps, 'open' | 'onOpenChange'>;
type AdditionalRootProps = { value?: string; onSelect?: (value: string) => void };
export type RootProps = BaseRootProps & AdditionalRootProps;
export type TriggerProps = Omit<ButtonProps, 'role' | 'aria-expanded'>;
export type ContentProps = ComponentPropsWithoutRef<typeof Command> & { items: Array<string> };

export function Root({ value: defaultValue, onSelect, ...props }: RootProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const _setValue = (value: string) => (setValue(value), onSelect?.(value));

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <Context.Provider value={{ open, value, setOpen, setValue: _setValue }}>
      <Popover.Root {...props} open={open} onOpenChange={setOpen} />
    </Context.Provider>
  );
}

export function Trigger({ className, children, ...props }: TriggerProps) {
  const { open, value } = useContext(Context);

  return (
    <Popover.Trigger asChild>
      <Button
        {...props}
        role="combobox"
        aria-expanded={open}
        className={twMerge('w-48 justify-between text-xs', className)}
      >
        {value ?? children} <ChevronsUpDown size={14} className="shrink-0" aria-hidden />
      </Button>
    </Popover.Trigger>
  );
}

export function Content({ placeholder, items }: ContentProps) {
  const { value, setOpen, setValue } = useContext(Context);

  return (
    <Popover.Portal>
      <Popover.Content className="z-50 rounded border bg-1 text-xs">
        <Command loop>
          <div className="relative rounded-t bg-2 p-1">
            <Search
              aria-hidden
              size={12}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform text-2/80"
            />
            <Command.Input
              placeholder={placeholder}
              className="relative z-20 bg-transparent pl-6 placeholder:text-2/80 focus:outline-none"
            />
          </div>
          <Command.Empty className="py-3 text-center">no results</Command.Empty>
          <Command.Group className="px-2 py-3">
            {items.map((item) => (
              <Command.Item
                key={item}
                onSelect={() => (setOpen(false), setValue(item))}
                className={twMerge(
                  'flex select-none items-center justify-between rounded px-1',
                  item === value ? 'bg-2' : 'hover:bg-2',
                )}
              >
                {item} {item === value && <Check size={14} aria-hidden />}
              </Command.Item>
            ))}
          </Command.Group>
        </Command>
      </Popover.Content>
    </Popover.Portal>
  );
}
