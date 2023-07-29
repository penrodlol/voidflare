'use client';

import * as Radix from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import type { LinkProps as NextLinkProps } from 'next/link';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { NextAnchor } from './anchor';

type DropdownProps = Radix.NavigationMenuTriggerProps & { label: string };
type DropdownItemProps = LinkProps & { label: string; description?: string };
type LinkProps = Radix.NavigationMenuLinkProps & { href: NextLinkProps<string>['href'] };

export function Root({ className, children, ...props }: Radix.NavigationMenuProps) {
  return (
    <Radix.Root {...props} className={twMerge('relative', className)}>
      <Radix.List className="flex">{children}</Radix.List>
      <div className="absolute left-0 top-full flex justify-center">
        <Radix.Viewport className="relative mt-1.5 w-max max-w-[35ch] overflow-hidden rounded border bg-1 p-3 shadow" />
      </div>
    </Radix.Root>
  );
}

export function Dropdown({ children, className, label, ...props }: DropdownProps) {
  return (
    <Radix.Item>
      <Radix.Trigger
        {...props}
        className={twMerge(
          'group flex items-center gap-1 rounded border px-2 py-0.5 data-[state=closed]:border-transparent',
          'data-[state=open]:text-brand data-[state=open]:bg-gradient',
          className,
        )}
      >
        {label}
        <ChevronDown
          size={16}
          aria-hidden
          className="group-data-[state=open]:rotate-180 motion-safe:transition-transform"
        />
      </Radix.Trigger>
      <Radix.Content>
        <ul className="flex flex-col gap-4">{children}</ul>
      </Radix.Content>
    </Radix.Item>
  );
}

export function DropdownItem({ className, label, description, ...props }: DropdownItemProps) {
  return (
    <li>
      <Link {...props} className={twMerge('flex flex-col items-start gap-1', className)}>
        <span className="text-sm">{label}</span>
        {description && <p className="text-xs text-2">{description}</p>}
      </Link>
    </li>
  );
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, href, ...props }, ref) => {
    return (
      <Radix.Link asChild {...props} ref={ref}>
        <NextAnchor
          href={href}
          className={twMerge(
            'rounded border border-transparent px-2 py-0.5',
            'hover:border-default hover:text-brand hover:bg-gradient',
            className,
          )}
        >
          {children}
        </NextAnchor>
      </Radix.Link>
    );
  },
);

Link.displayName = 'Link';
