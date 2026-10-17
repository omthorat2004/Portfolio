---
name: command-palette-sync
description: Use whenever adding, removing, or renaming a page, homepage section, or project on this portfolio. Explains how to keep the Cmd/Ctrl+K command palette and the sticky section nav in sync with that change.
---

# Keep the command palette in sync

This site has a global Cmd/Ctrl+K command palette (`components/CommandPalette.tsx`) and a sticky in-page nav (`components/SectionNav.tsx`) that both list the same jump targets: pages, homepage sections, and projects. They read from one shared source of truth, `lib/navigation.ts`, plus `lib/data.ts` for projects. Don't hardcode a new link only inside a page's JSX — update the shared list too, or the new destination silently won't be reachable from Cmd+K or the sticky nav.

## When you add a new top-level page (e.g. a new route under `app/`)

Add it to the `PAGES` array in `lib/navigation.ts`:

```ts
export const PAGES = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blogs" },
  { href: "/open-source", label: "Open source contributions" },
  // { href: "/new-route", label: "New Page Label" },
];
```

Both `CommandPalette` and nothing else needs to change — it reads `PAGES` directly.

## When you add a new homepage section (e.g. a new `<section id="...">` in `app/page.tsx`)

Add the matching entry to the `SECTIONS` array in `lib/navigation.ts`, with the same `id` used on the `<section>` element in `app/page.tsx`:

```ts
export const SECTIONS = [
  // ...
  { id: "new-section-id", label: "New Section Label" },
];
```

`SectionNav` and `CommandPalette` both read this array — no further wiring needed. The command palette scrolls to the section via `document.getElementById(id)` when already on `/`, or navigates to `/#id` otherwise.

## When you add/remove a project

Nothing to do — `CommandPalette` already derives project entries live from the `projects` array in `lib/data.ts` (see `sync-github-projects` skill for how to add a project there). Every project automatically becomes searchable in Cmd+K as soon as it's in that array.

## Don't

Don't add a second, separate list of links/sections anywhere else (e.g. inline in a new component) — extend `lib/navigation.ts` instead so there is exactly one place that defines "what's jumpable" on this site.
