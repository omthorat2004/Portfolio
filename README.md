# Portfolio

Personal portfolio site for Om Thorat, built with Next.js. Black and white theme, content capped at 576px wide and centered, with light/dark modes a visitor can toggle.

Live structure: one long home page with jump-to sections, plus a few dedicated pages (`/projects/<slug>`, `/open-source`, `/blog`).

## Stack

- Next.js 16, App Router
- TypeScript
- Plain CSS Modules, no UI framework
- `@emailjs/browser` for the contact form (no backend needed)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test the contact form locally, copy `.env.local.example` to `.env.local` (see [Contact form](#contact-form) below).

## Structure

```
app/
  layout.tsx                 Root layout, fonts, page metadata, oneko.js script
  page.tsx                    Home page: header, sticky section nav, all sections
  page.module.css             Shared layout and section styling, reused by every page
  globals.css                 Theme variables (light/dark), resets, base typography
  data.ts                     All editable content: profile, stack, experience, projects, open source, education
  techIcons.tsx                Brand-colored tech stack icons (grayscale at rest, color on hover)
  linkIcons.tsx / .module.css  Animated icons for the contact links row
  icons.tsx                    Pull request icon used on the open source page
  SectionNav.tsx / .module.css Sticky nav that appears on scroll: jump links to every section
  ThemeToggle.tsx / .module.css  Light/dark toggle, persisted in localStorage
  BgmPlayer.tsx / .module.css    Background music: track picker, volume, play/pause
  ContactModal.tsx / .module.css Contact form modal, sent via EmailJS
  OpenContactButton.tsx          Button that opens the contact modal from anywhere
  contactModalEvents.ts          Tiny window-event bus so multiple buttons can open one modal
  CopyEmailButton.tsx            Copies the email address to the clipboard
  Visitors.tsx / .module.css     Live view/visitor counter (abacus.jasoncameron.dev)
  ContributionsCalendar.tsx      GitHub contribution calendar with year picker and real counts
  sitemap.ts                     Generates /sitemap.xml
  robots.ts                      Generates /robots.txt
  projects/[slug]/page.tsx       One page per project, generated from data.ts at build time
  open-source/page.tsx           Full list of merged pull requests, with a PR icon per entry
  blog/page.tsx                  Coming soon placeholder
```

Each project on the home page links to its own page at `/projects/<slug>`. The open source section on the home page is a short summary that links to `/open-source` for the full list.

All content lives in `app/data.ts`. To update what's on the site (a new project, a new job, a changed bio), edit that file. Nothing else needs to change for a content-only update.

Before deploying, update `SITE_URL` in `app/data.ts` to your real domain. It feeds `sitemap.ts`, `robots.ts`, and the page's `metadataBase`.

## Contact form

Messages are sent client-side via [EmailJS](https://www.emailjs.com) — no server or API route needed. Configure it with three environment variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

See `.env.local.example` for the current values. These are meant to be public (EmailJS public keys are designed for client-side use), so they're safe to also set as plain environment variables on your hosting provider.

If the variables aren't set, the modal still opens but shows a fallback: your email address as a plain mailto link, so the form is never a dead end.

The EmailJS template must use these variable names in its body: `{{from_name}}`, `{{from_email}}`, `{{message}}`.

## Background music

`app/BgmPlayer.tsx` is a small player in the top-right toolbar with four tracks in `public/bgm/` (Heroic, Lofi, Synthwave, Focus), a play/pause toggle, and a volume slider. All tracks are Pixabay License (free for this use, no attribution required). Nothing autoplays — audio only starts on a visitor's own click, both because unsolicited sound is bad UX and because browsers block autoplay-with-sound anyway.

## The cat

`oneko.js` (`public/oneko.js` + `public/oneko.gif`) is the classic cursor-chasing pixel cat script, MIT licensed. It's wired in via `next/script` in the root layout and needs no React component. The sprite was recolored to an orange tabby with a small script (not checked in, since it was a one-time edit); replace `public/oneko.gif` with any sprite sheet in the same 256x128, 8x4-frame layout to change it.

## Theme

Both light and dark variants are defined as CSS variables in `app/globals.css`. They follow the system `prefers-color-scheme` by default, and can be overridden by the visitor via the theme toggle (stored in `localStorage`, applied via a `data-theme` attribute with no flash on load).

- `--page`: the background behind the content column, giving left/right margin contrast
- `--surface` / `--surface-alt`: the content column's background and its alternate tone for every other section
- `--edge`: the content column's outer border, for a crisper edge than `--page` vs `--surface` alone gives
- `--fg` / `--muted`: text colors
- `--border` / `--divider`: hairline dividers (`--divider` is the stronger one, used between list items like projects and pull requests)
- `--shadow-1` / `--shadow-2`: the content column's drop shadow

## Content tooling

This project has a `.claude` setup for keeping the site in sync with [github.com/omthorat2004](https://github.com/omthorat2004):

- `.claude/skills/sync-github-projects` — a skill for pulling new repos, jobs, or education entries from GitHub and LinkedIn into `app/data.ts`
- `.claude/agents/portfolio-content.md` — a subagent that does the same research and editing in the background, for larger syncs
- `.claude/settings.json` — hooks that run `tsc --noEmit` after every edit to catch type errors immediately, and review new content in `data.ts` for natural, human-sounding writing

## Deploying

Any Next.js host works. For Vercel:

```bash
npx vercel
```

Set the three `NEXT_PUBLIC_EMAILJS_*` variables (see above) in the project's environment variables before deploying, since `.env.local` is not committed to git.
