---
name: sync-github-projects
description: Use when the user wants to add, remove, or refresh a project, job, or open source entry on the portfolio from their GitHub profile (github.com/omthorat2004) or profile README. Triggers on requests like "add my new repo to the site", "sync my projects", "I added a new job on LinkedIn, update the site".
---

# Sync GitHub projects into the portfolio

This site's content lives entirely in `app/data.ts`, not in markdown or a CMS. Keep edits confined to that file unless the user asks for a layout change too.

## Steps

1. Fetch what changed:
   - Profile README: `curl -s https://raw.githubusercontent.com/omthorat2004/omthorat2004/main/README.md`
   - Repo list: `curl -s "https://api.github.com/users/omthorat2004/repos?per_page=100&sort=updated"`
   - A single repo's description/README when the user names one repo specifically.
2. Open `app/data.ts` and find the matching array: `projects`, `experience`, `openSource`, or `education`.
3. Match the existing object shape exactly (same keys, same field order) when adding an entry. Do not add new fields unless the user asks for one, since `app/page.tsx` only renders the fields that already exist.
4. Write project and experience descriptions the way the rest of the file is written: plain sentences, no em dashes, no marketing adjectives, specific about what the thing does rather than why it's impressive. Keep descriptions to two or three sentences.
5. For LinkedIn-sourced experience or education (the user may paste a screenshot instead of a link), transcribe the role, organization, dates, and location exactly as shown; do not infer or round dates.
6. After editing, run `npx tsc --noEmit` from the project root to confirm the file still type-checks.
7. Do not touch `app/page.tsx`, `app/page.module.css`, or `app/globals.css` for a content-only sync. Only propose layout changes if the new content doesn't fit the existing structure (for example, a field the current cards don't display).
