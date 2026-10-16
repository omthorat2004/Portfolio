# Portfolio

Personal portfolio site for Om Thorat, built with Next.js. Black and white theme, content capped at 576px wide and centered.

## Stack

- Next.js 16, App Router
- TypeScript
- Plain CSS Modules, no UI framework

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx              Root layout, font, page metadata
  page.tsx                 Home page, pulls content from data.ts
  page.module.css          Shared layout and section styling, reused by every page
  globals.css               Theme variables, resets, base typography
  data.ts                   All editable content: profile, experience, projects, open source, education
  icons.tsx                 Inline SVG icons (pull request icon)
  Cat.tsx                   Small decorative cat that walks along the bottom of the page
  Cat.module.css            Walk animation, respects prefers-reduced-motion
  sitemap.ts                Generates /sitemap.xml
  robots.ts                 Generates /robots.txt
  projects/[slug]/page.tsx  One page per project, generated from data.ts at build time
  open-source/page.tsx      Full list of merged pull requests, with a pull request icon per entry
```

Each project on the home page links to its own page at `/projects/<slug>`. The open source section on the home page is a short summary that links to `/open-source` for the full list.

Before deploying, update `SITE_URL` in `app/data.ts` to your real domain. It feeds `sitemap.ts`, `robots.ts`, and the page's `metadataBase`.

## Contributions section

The GitHub contribution calendar is pulled live from `ghchart.rshah.org/141414/omthorat2004`, an unofficial service that renders your public commit activity as an SVG. It has no build step and needs no API key. The image is recolored with a CSS filter for dark mode.

All content lives in `app/data.ts`. To update what's on the site (a new project, a new job, a changed bio), edit that file. Nothing else needs to change for a content-only update.

## Theme

Pure black and white, no accent color. Both light and dark variants are defined as CSS variables in `app/globals.css` and switch automatically with the system `prefers-color-scheme`.

- `--page`: the background behind the content column, giving left and right margin contrast on wider screens
- `--surface`: the content column's own background
- `--surface-alt`: a slightly different tone used on alternating sections for visual separation
- `--fg` / `--muted`: text colors
- `--border`: hairline dividers between sections

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
