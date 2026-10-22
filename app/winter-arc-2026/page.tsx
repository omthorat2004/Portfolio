import type { Metadata } from "next";
import Link from "next/link";
import { winterArc2026 } from "@/lib/data";
import WinterArcList from "@/components/WinterArcList";
import ThemeToggle from "@/components/ThemeToggle";
import BgmPlayer from "@/components/BgmPlayer";
import CommandMenuButton from "@/components/CommandMenuButton";
import CatToggle from "@/components/CatToggle";

export const metadata: Metadata = {
  title: "Winter Arc 2026 — Om Thorat",
  description: "Projects, blogs, and skills from the Winter Arc 2026 build streak.",
};

export default function WinterArc2026Page() {
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
          Winter Arc 2026
        </h1>
        <p className="mt-5 font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.6] xs:leading-[1.65] max-w-[54ch] text-muted">
          A running log of everything I build, write, and learn this winter: one good project
          after another, plus the blogs and skills picked up along the way.
        </p>
      </header>

      <section className="border-t border-border scroll-mt-[58px] py-7 xs:py-9">
        <WinterArcList entries={winterArc2026} />
      </section>
    </main>
  );
}
