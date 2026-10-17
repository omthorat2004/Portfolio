---
name: folder-structure
description: Use before adding, moving, or importing any file in this portfolio repo, or when asked about project layout/organization or styling approach. Explains where routing files, components, and shared logic live, the import alias convention, and the Tailwind CSS styling setup.
---

# Portfolio folder structure

This repo keeps `app/` for Next.js routing only. Everything else lives in top-level `components/` and `lib/`, sibling to `app/`, not nested inside it.

## Layout

- `app/` — routing files only: `page.tsx`, `layout.tsx`, `robots.ts`, `sitemap.ts`, `icon.svg`, `globals.css`, route folders (`blog/`, `open-source/`, `projects/[slug]/`). These stay here because Next.js requires them at these exact paths — `robots.ts` and `sitemap.ts` in particular must remain app-router script modules in `app/`, never moved to `lib/`.
- `components/` — all reusable UI components. If a `.tsx` file exports a React component and isn't a routing file, it belongs here.
- `lib/` — non-component logic and data: `data.ts` (all site content: profile, projects, experience, education, open source), `contactModalEvents.ts` (shared event helpers). If a `.ts` file has no JSX and isn't a Next.js config/route file, it belongs here.

## Import convention

Always import from `components/` and `lib/` using the `@/` alias (configured in `tsconfig.json` as `"@/*": ["./*"]`), never relative paths like `../../lib/data`:

```ts
import { projects } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";
```

## Styling: Tailwind CSS, not CSS Modules

There are no `*.module.css` files in this repo and none should be added — the site was fully migrated from CSS Modules to Tailwind CSS v4. Style components with Tailwind utility classes inline in `className`.

- Tailwind config lives in `postcss.config.mjs` (`@tailwindcss/postcss` plugin) and `app/globals.css` (`@import "tailwindcss";` + `@theme` blocks). There is no `tailwind.config.ts` — Tailwind v4 is configured in CSS.
- Theme colors are CSS vars in `app/globals.css` (`--fg`, `--muted`, `--surface`, `--surface-alt`, `--border`, `--divider`, `--edge`, `--page`), mapped into Tailwind as `@theme inline { --color-fg: var(--fg); ... }`. Use them as normal Tailwind utilities — `text-fg`, `bg-surface-alt`, `border-divider` — never hardcode a hex color.
- Two custom breakpoints: `xs` (420px) and `sm` (600px, overrides Tailwind's default). Write responsive classes mobile-first: base class is the smallest/mobile size, `xs:`/`sm:` prefix larger sizes.
- Two font utilities, `font-serif` (Source Serif 4, body default) and `font-sans` (IBM Plex Sans, UI chrome), map to `next/font` CSS vars set in `app/layout.tsx`. Headings stay serif (the default); description/body text explicitly gets `font-sans` for contrast against headings — see `app/page.tsx`.
- Arbitrary-value utilities (`w-[72px]`, `text-[0.875rem]`) are common and expected here since the design has specific pixel/rem values from before the Tailwind migration — don't round them to the nearest default scale step.
- A few things that don't map to utility classes — the CSS-triangle speech bubble, `@keyframes` animations, and the GitHub contribution calendar's per-level colors — are hand-written plain CSS at the bottom of `app/globals.css` under named classes (`.speech-bubble`, `.skill-tag`, `.toggle-btn`, `.icon-*`, `.scroll-hint`, `.section-nav`). Components apply these classes alongside Tailwind utilities in the same `className` string. Extend that block for the same category of problem (parent-hover-affects-child-SVG, keyframes, structural selectors) rather than creating a new per-component stylesheet.

## When adding a new file

1. New React component → `components/<Name>.tsx`, styled with Tailwind classes in `className` (no CSS module).
2. New shared non-component logic, constants, or data → `lib/<name>.ts`.
3. New page or layout → inside `app/`, following Next.js's routing conventions (`page.tsx`, `layout.tsx`, route segment folders).
4. Import it elsewhere with `@/components/...` or `@/lib/...`, not a relative path.
