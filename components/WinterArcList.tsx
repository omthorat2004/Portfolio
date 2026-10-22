"use client";

import { useState } from "react";
import { LinkIcon } from "@/components/linkIcons";
import type { winterArc2026 } from "@/lib/data";

type Entry = (typeof winterArc2026)[number];

const typeLabel: Record<Entry["type"], string> = {
  project: "Project",
  blog: "Blog",
  skill: "Skill",
  read: "Read",
};
const linkLabel: Record<"blog" | "skill" | "read", string> = {
  blog: "Read the post",
  skill: "View",
  read: "View",
};

const filters = [
  { id: "all", label: "All", match: () => true },
  { id: "project", label: "Project", match: (entry: Entry) => entry.type === "project" },
  { id: "skill", label: "Skill", match: (entry: Entry) => entry.type === "skill" },
  { id: "read", label: "Read", match: (entry: Entry) => entry.type === "read" || entry.type === "blog" },
] as const;

export default function WinterArcList({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const filtered = entries.filter(filters.find((f) => f.id === active)!.match);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by type">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActive(filter.id)}
            aria-pressed={active === filter.id}
            className={`skill-tag inline-flex items-center font-sans text-[0.75rem] font-medium leading-[1.4] px-[9px] py-[3px] border transition-colors duration-150 ease-in-out cursor-pointer ${
              active === filter.id
                ? "bg-fg text-surface border-fg"
                : "border-border text-muted hover:border-fg"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ul className="list-none flex flex-col gap-[26px]">
          {filtered.map((entry) => (
            <li
              key={entry.title}
              className="flex flex-col gap-[5px] pt-6 border-t border-divider first:pt-0 first:border-t-0"
            >
              <div className="flex items-center gap-2">
                <span className="skill-tag inline-flex items-center gap-[5px] font-sans text-[0.75rem] font-medium leading-[1.4] px-[9px] py-[3px] border border-border text-muted transition-colors duration-150 ease-in-out hover:border-fg w-fit">
                  {typeLabel[entry.type]}
                </span>
                {entry.date ? (
                  <span className="font-sans text-[0.75rem] text-muted">{entry.date}</span>
                ) : null}
              </div>
              <p className="font-serif text-base xs:text-[1.0625rem] sm:text-[1.1875rem] font-bold leading-[1.3] text-fg mt-1">
                {entry.title}
                {entry.status ? (
                  <span className="text-[0.85em] font-normal italic text-muted">
                    , {entry.status}
                  </span>
                ) : null}
              </p>
              <p className="font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.65] text-body max-w-[56ch] mt-2">
                {entry.description}
              </p>
              {entry.type === "project" ? (
                <nav
                  className="mt-2 flex flex-wrap gap-x-[18px] gap-y-1.5 font-sans text-[0.875rem] font-medium tracking-[0.01em]"
                  aria-label={`${entry.title} links`}
                >
                  <a href={entry.href} target="_blank" rel="noreferrer" className="underline">
                    <LinkIcon label="Source on GitHub" />
                    Source on GitHub
                  </a>
                  {entry.live ? (
                    <a href={entry.live} target="_blank" rel="noreferrer" className="underline">
                      <LinkIcon label="Live site" />
                      Live site
                    </a>
                  ) : null}
                </nav>
              ) : entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 font-sans text-[0.875rem] font-medium underline"
                >
                  <LinkIcon label="Live site" />
                  {linkLabel[entry.type]}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-sans text-[0.8125rem] leading-[1.5] text-muted">
          Nothing here yet.
        </p>
      )}
    </>
  );
}
