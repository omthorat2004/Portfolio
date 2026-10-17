<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Folder structure

`app/` holds routing files only: `page.tsx`, `layout.tsx`, `robots.ts`, `sitemap.ts`, `icon.svg`, `globals.css`, and route folders. `robots.ts` and `sitemap.ts` must stay here — Next.js requires these route-module files at this exact path.

Everything else lives in top-level `components/` and `lib/` (siblings of `app/`, not nested inside it):

- `components/` — React components, styled with Tailwind utility classes directly in `className` (see Styling below).
- `lib/` — non-component logic and data (`data.ts` holds all site content, `contactModalEvents.ts` holds shared event helpers).

Import from both using the `@/` alias (`tsconfig.json` maps `@/*` to `./*`), e.g. `import { projects } from "@/lib/data"` — never a relative path like `../../lib/data`.

New file → new component goes in `components/`, new non-component logic/data goes in `lib/`, new page/layout goes in `app/` following Next.js conventions.

## Styling

This site uses Tailwind CSS v4, not CSS Modules — there are no `*.module.css` files and none should be added. Tailwind is wired up via `postcss.config.mjs` (`@tailwindcss/postcss`) and `app/globals.css` (`@import "tailwindcss";`).

- Style components with Tailwind utility classes inline in `className`, including arbitrary values (`w-[72px]`, `text-[0.875rem]`) when a design value doesn't match Tailwind's default scale — this codebase has many of these since it's porting an existing pixel-specific design, not building new layouts from Tailwind's scale.
- Theme colors are CSS custom properties in `app/globals.css` (`--fg`, `--body`, `--muted`, `--surface`, `--surface-alt`, `--border`, `--divider`, `--edge`, `--page`), redefined for dark mode via `prefers-color-scheme` and a manual `data-theme` attribute (set by `components/ThemeToggle.tsx`). They're mapped into Tailwind's `@theme inline` block as `--color-*`, so use them as ordinary Tailwind color utilities: `text-fg`, `bg-surface-alt`, `border-divider`, etc. — never hardcode a hex value or reintroduce a separate CSS variable scheme. `--fg` is full-strength text (headings), `--body` is paragraph/description copy (readable but secondary — use `text-body`), `--muted` is small UI chrome (tags, meta lines, labels) — keep these three distinct rather than collapsing description text back onto `--muted`.
- Two custom breakpoints are defined in `@theme { --breakpoint-xs: 26.25rem; --breakpoint-sm: 37.5rem; }` (420px / 600px, overriding Tailwind's default `sm`) to match this design's mobile breakpoints. Write responsive utilities mobile-first (base class = smallest/mobile size, `xs:`/`sm:` = larger).
- Two font families come from `next/font/google` in `app/layout.tsx` as CSS vars `--font-serif` (Source Serif 4, body default) and `--font-sans` (IBM Plex Sans, UI chrome), also mapped into `@theme inline` — use the `font-serif` / `font-sans` Tailwind utilities, not literal `font-family` values. Headings and body copy intentionally pair serif headings with sans-serif description text for contrast (see `.name`/`.bio`-equivalent usage in `app/page.tsx`).
- A handful of things that don't map cleanly to utility classes — the CSS-triangle speech bubble, `@keyframes` animations (icon spin/pulse/wiggle/bounce, nav scroll hint), and the GitHub contribution calendar's per-level colors — are hand-written plain CSS at the bottom of `app/globals.css` under named classes (`.speech-bubble`, `.skill-tag`, `.toggle-btn`, `.icon-*`, `.scroll-hint`, `.section-nav`). Components apply these alongside Tailwind utility classes in the same `className` string rather than duplicating the CSS. Extend that block rather than reinventing a module-scoped stylesheet when you hit the same kind of problem (parent-hover-affects-child-SVG, keyframes, `nth-of-type` structural selectors).

## Navigation / command palette

There's a global Cmd/Ctrl+K command palette (`components/CommandPalette.tsx`, mounted in `app/layout.tsx`) and a sticky in-page nav (`components/SectionNav.tsx`). Both read jump targets from one shared source, `lib/navigation.ts` (`PAGES` for top-level routes, `SECTIONS` for homepage `<section id>` anchors) plus the `projects` array in `lib/data.ts` (projects are derived automatically, no separate list). **Whenever you add, remove, or rename a page, a homepage section, or a project, update `lib/navigation.ts` (and `lib/data.ts` for projects) — don't just add a link inside JSX — or the new destination won't be reachable from Cmd+K or the sticky nav.** See the `command-palette-sync` skill for details.
