---
name: vercel-deploy
description: Use whenever deploying this portfolio to Vercel, or when asked to "deploy", "push to production", "ship this", or to check why a live site doesn't match the repo. Covers the standard production deployment checklist — env var sync, build log verification, deployment health, and analytics/issue checks — not just running `vercel --prod`.
---

# Vercel deployment checklist

This project (`oms-projects-81472274/om-thorat`, production URL `https://om-thorat.vercel.app`) deploys via the `vercel` CLI. A deploy is not just "run the command" — follow this checklist every time so a bad env var, a failed build, or a stale alias doesn't go unnoticed.

## 0. Preconditions

- `vercel whoami` — confirm logged in as the right account.
- `git status` — working tree should be clean and the commit you intend to ship should already be pushed to `origin/main`. Never deploy uncommitted/local-only changes as "production" without telling the user — prefer deploying what's in git so the live site matches the repo history.
- Check whether Git auto-deploy is connected: `vercel git ls` / project dashboard → Git. If it's **not** connected, every production deploy requires an explicit `vercel --prod` after each push — tell the user this, since it's the usual cause of "I pushed but the site didn't update."

## 1. Env vars — sync before build, not after

This app reads three `NEXT_PUBLIC_EMAILJS_*` vars (see `.env.local.example`) at build time, since `NEXT_PUBLIC_*` vars are inlined into the client bundle during `next build`. A var added/changed on Vercel after a build already ran will NOT retroactively apply — a redeploy is required.

- List what's currently set: `vercel env ls`
- Add/update one: `vercel env add <NAME> production` (follow prompts; add to `preview`/`development` too if those environments are used)
- If `.env.local.example` gains a new variable, the same variable must be added to Vercel production env **before** the next deploy, or the build will silently ship without it (EmailJS calls would fail client-side with no build error).
- Never commit `.env.local` — it's gitignored by design; Vercel env vars are the source of truth for deployed secrets/config.

## 2. Deploy

```
vercel --prod
```

- This builds remotely and aliases the result to the production domain if the build succeeds.
- The JSON output's `readyState` must be `READY` and `target` must be `"production"`. If `readyState` is `ERROR` or `BUILDING` when the command returns, don't report success — go to step 3.

## 3. Check build logs

Always check logs, even on a reported success, if anything about the env/deps/structure changed since the last deploy:

```
vercel inspect <deployment-url-or-id> --logs
```

or open the `inspectorUrl` from the deploy output. Look for:
- Build warnings about missing env vars (Next.js warns if a `NEXT_PUBLIC_*` referenced in code isn't set)
- Type errors / lint errors that passed locally but differ remotely (different Node version, stale lockfile)
- Package install issues (compare against `package-lock.json` changes)

## 4. Verify the live deployment

- `vercel curl https://om-thorat.vercel.app` or just fetch it — confirm 200 and that the expected change is visibly present (don't assume the alias updated; hard-refresh / curl bypasses browser cache).
- Spot-check any route touched by the change (e.g. `/blog`, `/projects/<slug>`, `/open-source`) since a bad redirect/rewrite can break one route while others 200.

## 5. Analytics and ongoing issues

This project depends on `@vercel/analytics`. After a deploy that touches pages or navigation:
- Confirm the `Analytics` component is still mounted in `app/layout.tsx` — a layout refactor is the most common way this silently disappears.
- For checking real traffic/errors post-deploy, point the user to the Vercel dashboard's Analytics and Logs tabs (`vercel.com/oms-projects-81472274/om-thorat`) — the CLI doesn't surface runtime analytics, only build/deploy state.
- If the user reports something broken in production that works locally, check `vercel inspect <deployment> --logs` for runtime/function errors first, then diff env vars (step 1) before assuming a code bug.

## Quick reference

| Task | Command |
|---|---|
| Who am I | `vercel whoami` |
| List env vars | `vercel env ls` |
| Add env var | `vercel env add <NAME> production` |
| Pull env vars to local | `vercel env pull` |
| Deploy to production | `vercel --prod` |
| Inspect a deployment + logs | `vercel inspect <url> --logs` |
| Connect/check Git auto-deploy | `vercel git connect` / `vercel git ls` |
