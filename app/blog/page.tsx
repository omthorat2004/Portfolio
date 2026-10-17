import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BgmPlayer from "@/components/BgmPlayer";
import CommandMenuButton from "@/components/CommandMenuButton";
import CatToggle from "@/components/CatToggle";

export const metadata: Metadata = {
  title: "Blog — Om Thorat",
  description: "Writing. Coming soon.",
};

export default function BlogPage() {
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
          Blog
        </h1>
        <p className="mt-5 font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.6] xs:leading-[1.65] max-w-[54ch] text-muted">
          Coming soon. I am putting together some writing on the projects above and what I am
          learning while building them.
        </p>
      </header>
    </main>
  );
}
