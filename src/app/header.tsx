'use client';

import * as NavMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { NextAnchor } from '../components/ui/anchor';

// prettier-ignore
const trigger = tv({ base: 'group flex items-center gap-1 rounded border px-2 py-0.5 data-[state=closed]:border-transparent data-[state=open]:text-brand data-[state=open]:bg-gradient' });
const chevron = tv({ base: 'group-data-[state=open]:rotate-180 motion-safe:transition-transform' });
// prettier-ignore
const link = tv({ base: 'rounded border border-transparent px-2 py-0.5 hover:border-default hover:text-brand hover:bg-gradient' });
const linkOption = tv({ extend: link, base: 'flex flex-col items-start gap-1' });

export default function Header() {
  return (
    <header className="sticky top-0 z-50 rounded bg-1">
      <div className="my-2 flex items-center justify-between rounded border bg-2/10 px-4">
        <span></span>
        <NavMenu.Root className="relative py-2 text-xs">
          <NavMenu.List className="flex">
            <NavMenu.Item>
              <NavMenu.Trigger className={trigger()}>
                posts <ChevronDown size={16} className={chevron()} aria-hidden />
              </NavMenu.Trigger>
              <NavMenu.Content>
                <ul className="flex flex-col gap-4">
                  <li>
                    <NavMenu.Link asChild>
                      {/* @ts-ignore */}
                      <NextAnchor href="/posts/page/1" className={linkOption()}>
                        <span className="text-sm">view all posts</span>
                        <p className="text-xs text-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                      </NextAnchor>
                    </NavMenu.Link>
                  </li>
                  <li>
                    <NavMenu.Link asChild>
                      <NextAnchor href="/" className={linkOption()}>
                        <span className="text-sm">view posts by site</span>
                        <p className="text-xs text-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                      </NextAnchor>
                    </NavMenu.Link>
                  </li>
                </ul>
              </NavMenu.Content>
            </NavMenu.Item>
            <NavMenu.Item>
              <NavMenu.Trigger className={trigger()}>
                releases <ChevronDown size={16} className={chevron()} aria-hidden />
              </NavMenu.Trigger>
              <NavMenu.Content>
                <ul className="flex flex-col gap-4">
                  <li>
                    <NavMenu.Link asChild>
                      <NextAnchor href="/" className={linkOption()}>
                        <span className="text-sm">view all releases</span>
                        <p className="text-xs text-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                      </NextAnchor>
                    </NavMenu.Link>
                  </li>
                  <li>
                    <NavMenu.Link asChild>
                      <NextAnchor href="/" className={linkOption()}>
                        <span className="text-sm">view releases by project</span>
                        <p className="text-xs text-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                      </NextAnchor>
                    </NavMenu.Link>
                  </li>
                </ul>
              </NavMenu.Content>
            </NavMenu.Item>
            <NavMenu.Item>
              <NavMenu.Link asChild>
                <NextAnchor href="/about" className={link()}>
                  about
                </NextAnchor>
              </NavMenu.Link>
            </NavMenu.Item>
          </NavMenu.List>
          <div className="absolute left-0 top-full flex justify-center">
            <NavMenu.Viewport className="relative mt-1.5 w-max max-w-[35ch] overflow-hidden rounded border bg-1 p-3 shadow" />
          </div>
        </NavMenu.Root>
      </div>
    </header>
  );
}
