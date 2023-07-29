'use client';

import * as NavMenu from './ui/nav-menu';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 rounded bg-1">
      <div className="my-2 flex items-center justify-between rounded border bg-2/10 px-4">
        <span></span>
        <NavMenu.Root className="py-2 text-xs">
          <NavMenu.Dropdown label="posts">
            <NavMenu.DropdownItem
              href="/"
              label="view all posts"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <NavMenu.DropdownItem
              href="/"
              label="view posts by site"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
          </NavMenu.Dropdown>
          <NavMenu.Dropdown label="releases">
            <NavMenu.DropdownItem
              href="/"
              label="view all releases"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <NavMenu.DropdownItem
              href="/"
              label="view releases by project"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
          </NavMenu.Dropdown>
          <NavMenu.Link href="/about">about</NavMenu.Link>
        </NavMenu.Root>
      </div>
    </header>
  );
}
