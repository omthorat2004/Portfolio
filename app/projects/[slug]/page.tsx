import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import { projects } from "../../data";
import { TechIcon } from "../../techIcons";
import ThemeToggle from "../../ThemeToggle";
import BgmPlayer from "../../BgmPlayer";
import { LinkIcon } from "../../linkIcons";

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
    <main className={styles.container}>
      <div className={styles.toolbar}>
        <BgmPlayer />
        <ThemeToggle />
      </div>
      <Link href="/" className={styles.back}>
        ← Om Thorat
      </Link>

      <header className={styles.header}>
        <h1 className={styles.name}>
          {project.name}
          {project.status ? <span className={styles.status}>, {project.status}</span> : null}
        </h1>
        <p className={styles.bio}>{project.description}</p>
        <div className={styles.tags}>
          {project.stack.map((item) => (
            <span key={item} className={styles.tag}>
              <TechIcon label={item} />
              {item}
            </span>
          ))}
        </div>
        <nav className={styles.links} aria-label="Project links">
          <a href={project.href} target="_blank" rel="noreferrer">
            <LinkIcon label="Source on GitHub" />
            Source on GitHub
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer">
              <LinkIcon label="Live site" />
              Live site
            </a>
          ) : null}
        </nav>
      </header>
    </main>
  );
}
