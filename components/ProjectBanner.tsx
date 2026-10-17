"use client";

import { useState } from "react";
import { parseGithubRepo } from "@/lib/github";

export default function ProjectBanner({ href, name }: { href: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const repo = parseGithubRepo(href);

  if (!repo || failed) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center border border-border bg-surface-alt text-muted">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4.5A1.5 1.5 0 0 1 5.5 3h4.172a1.5 1.5 0 0 1 1.06.44l1.829 1.828a1.5 1.5 0 0 0 1.06.44H18.5A1.5 1.5 0 0 1 20 7.207V18.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-14Z" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://opengraph.githubassets.com/1/${repo.owner}/${repo.repo}`}
      alt={`${name} repository preview`}
      className="block aspect-[2/1] w-full border border-border object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
