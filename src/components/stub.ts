// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    project: 'withastro/astro',
    name: 'astro@2.9.1',
    url: 'https://github.com/withastro/astro/releases/tag/astro%402.9.1',
    published: '2023-07-21T20:39:57Z',
    content: [
      'Fixes case where there is FOUC caused by stylesheets not loaded',
      'Fix parsing image assets from a Markdown line along with other markup.',
      'Prevent animations when prefers-reduced-motion',
      'Trigger full page refresh on back nav from page without VT enabled',
    ],
  },
  {
    project: 'angular/angular',
    name: 'v16.2.0-next.3',
    url: 'https://github.com/angular/angular/releases/tag/16.2.0-next.3',
    published: '2023-07-19T19:32:45Z',
    content: ['Run fetch request out the angular zone (#50981)'],
  },
  {
    project: 'tailwindlabs/tailwindcss',
    name: 'v3.3.3',
    url: 'https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.3.3',
    published: '2023-07-13T16:16:05Z',
    content: [
      'Fix issue where some pseudo-element variants generated the wrong selector',
      'Make font settings propagate into buttons, inputs, etc.',
      'Fix parsing of `theme()` inside `calc()` when there are no spaces around operators',
      'Ensure `repeating-conic-gradient` is detected as an image',
      'Move unknown pseudo-elements outside of `:is` by default',
      'Escape animation names when prefixes contain special characters',
      "Don't prefix arbitrary classes in `group` and `peer` variants",
      'Sort classes using position of first matching rule',
      'Allow variant to be an at-rule without a prelude',
      'Make PostCSS plugin async to improve performance',
      'Don’t error when a config file is missing',
      'Add `aria-busy` utility',
      'Reset padding for `<dialog>` elements in preflight',
    ],
  },
  {
    project: 'nrwl/nx',
    name: '16.5.5',
    url: 'https://github.com/nrwl/nx/releases/tag/16.5.5',
    published: '2023-07-22T04:17:58Z',
    content: ['Bug Fixes:', 'core: revert globs migration'],
  },
  {
    project: 'supabase/supabase-js',
    name: 'v2.27.0',
    url: 'https://github.com/supabase/supabase-js/releases/tag/v2.27.0',
    published: '2023-07-23T15:04:36Z',
    content: ['bump gotrue-js to v2.45.0'],
  },
  {
    project: 'vercel/next.js',
    name: 'v13.4.12',
    url: 'https://github.com/vercel/next.js/releases/tag/v13.4.12',
    published: '2023-07-21T20:42:07Z',
    content: [
      'Separate routing code from render servers',
      'Move Pages API rendering into bundle',
      'update Turbopack',
      'Turbopack: Refactoring module references',
      'Increase timeout for 404 tests',
      'Reland "Refine the not-found rendering process for app router"',
      'Revert "Separate routing code from render servers"',
      "Clarify the 'Existing Projects' section of the TypeScript docs",
      'Update 02-dynamic-routes.mdx',
      'chore(docs): fix broken link',
      'Update to latest version of turborepo',
      'Update `swc_core` to `v0.79.22`',
      'chore(ci): add pnpm workspace for github actions',
      'Changed package manager for install-native.mjs to pnpm',
      'update CODEOWNERS config',
    ],
  },
];