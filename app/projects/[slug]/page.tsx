import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { TechIcon } from "@/components/techIcons";
import ThemeToggle from "@/components/ThemeToggle";
import BgmPlayer from "@/components/BgmPlayer";
import CommandMenuButton from "@/components/CommandMenuButton";
import CatToggle from "@/components/CatToggle";
import { LinkIcon } from "@/components/linkIcons";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Om Thorat`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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
          {project.name}
          {project.status ? (
            <span className="text-[0.85em] font-normal italic text-muted">, {project.status}</span>
          ) : null}
        </h1>
        <p className="mt-5 font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.6] xs:leading-[1.65] max-w-[54ch] text-body">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="skill-tag inline-flex items-center gap-[5px] font-sans text-[0.75rem] font-medium leading-[1.4] px-[9px] py-[3px] border border-border text-muted transition-colors duration-150 ease-in-out hover:border-fg"
            >
              <TechIcon label={item} />
              {item}
            </span>
          ))}
        </div>
        <nav
          className="mt-6 flex flex-wrap gap-x-[18px] gap-y-1.5 font-sans text-[0.875rem] font-medium tracking-[0.01em]"
          aria-label="Project links"
        >
          <a href={project.href} target="_blank" rel="noreferrer" className="underline">
            <LinkIcon label="Source on GitHub" />
            Source on GitHub
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="underline">
              <LinkIcon label="Live site" />
              Live site
            </a>
          ) : null}
        </nav>
      </header>
    </main>
  );
}
