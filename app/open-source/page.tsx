import type { Metadata } from "next";
import Link from "next/link";
import { openSource } from "@/lib/data";
import { PullRequestIcon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import BgmPlayer from "@/components/BgmPlayer";
import CommandMenuButton from "@/components/CommandMenuButton";
import CatToggle from "@/components/CatToggle";

export const metadata: Metadata = {
  title: "Open source — Om Thorat",
  description: "Pull requests merged into open source projects.",
};

export default function OpenSourcePage() {
  const totalPRs = openSource.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <main className="relative max-w-[576px] mx-auto bg-surface border-x border-edge shadow-[0_1px_2px_var(--shadow-1),0_32px_64px_-24px_var(--shadow-2)] pt-12 pb-18 px-[18px] xs:pt-18 xs:pb-24 xs:px-6">
      <div className="absolute top-6 right-6 z-5 flex gap-2">
        <CommandMenuButton />
        <CatToggle />
        <BgmPlayer />
        <ThemeToggle />
      </div>
      <Link href="/" className="inline-block font-sans text-[0.875rem] font-medium underline decoration-border hover:decoration-current mb-7">
        ← Om Thorat
      </Link>

      <header className="pb-10">
        <h1 className="font-serif text-[1.75rem] xs:text-[2.125rem] sm:text-[2.5rem] font-bold leading-[1.15] tracking-[-0.015em] text-fg">
          Open source
        </h1>
        <p className="mt-5 font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.6] xs:leading-[1.65] max-w-[54ch] text-muted">
          {totalPRs} pull requests merged across {openSource.length} projects I don&apos;t
          maintain.
        </p>
      </header>

      <section className="border-t border-border scroll-mt-[58px] py-7 xs:py-9">
        <ul className="list-none flex flex-col gap-6">
          {openSource.map((entry) => (
            <li
              key={entry.project}
              className="flex gap-3 items-start pt-5 border-t border-divider first:pt-0 first:border-t-0"
            >
              <PullRequestIcon className="flex-none mt-1 text-muted" />
              <div className="flex flex-col gap-[5px]">
                <p className="font-serif text-[0.9375rem] xs:text-base sm:text-[1.125rem] font-semibold leading-[1.35]">
                  <a href={entry.href} target="_blank" rel="noreferrer" className="underline decoration-border hover:decoration-current">
                    {entry.project}
                  </a>
                  {entry.org ? (
                    <span className="text-[0.85em] font-normal italic text-muted">, {entry.org}</span>
                  ) : null}
                  <span className="font-sans text-[0.8125rem] font-normal text-muted">
                    {" "}
                    · {entry.count} {entry.count === 1 ? "PR" : "PRs"} merged
                  </span>
                </p>
                <p className="font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.65] max-w-[56ch]">
                  {entry.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
