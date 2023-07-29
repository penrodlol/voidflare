'use client';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 rounded bg-1">
      <div className="my-2 flex items-center justify-between rounded border bg-2/10 px-4">
        <span></span>
        {/* <NavMenu.Root className="relative py-2 text-xs">
          <NavMenu.List className="flex items-center">
            <NavMenu.Item>
              <NavMenu.Trigger className="group flex items-center gap-1 pr-6 hover:text-brand">
                posts
                <ChevronDown size={16} className="group-data-[state=open]:rotate-180" aria-hidden />
              </NavMenu.Trigger>
              <NavMenu.Content className="absolute left-0 top-0 w-auto rounded border bg-1 p-4"></NavMenu.Content>
            </NavMenu.Item>
            <NavMenu.Item>
              <NavMenu.Trigger className="group flex items-center gap-1 pr-6 hover:text-brand">
                releases
                <ChevronDown size={16} className="group-data-[state=open]:rotate-180" aria-hidden />
              </NavMenu.Trigger>
              <NavMenu.Content className="absolute left-0 top-0 w-auto rounded border bg-1 p-4"></NavMenu.Content>
            </NavMenu.Item>
            <NavMenu.Item>
              <NavMenu.Link asChild>
                <NextAnchor href="/about">about</NextAnchor>
              </NavMenu.Link>
            </NavMenu.Item>
            <NavMenu.Indicator />
          </NavMenu.List>
          <NavMenu.Viewport className="absolute left-0 top-full w-full" />
        </NavMenu.Root> */}
      </div>
    </header>
  );
}
