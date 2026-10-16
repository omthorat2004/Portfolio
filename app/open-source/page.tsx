import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import { openSource } from "../data";
import { PullRequestIcon } from "../icons";
import ThemeToggle from "../ThemeToggle";
import BgmPlayer from "../BgmPlayer";

export const metadata: Metadata = {
  title: "Open source — Om Thorat",
  description: "Pull requests merged into open source projects.",
};

export default function OpenSourcePage() {
  const totalPRs = openSource.reduce((sum, entry) => sum + entry.count, 0);

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
        <h1 className={styles.name}>Open source</h1>
        <p className={styles.bio}>
          {totalPRs} pull requests merged across {openSource.length} projects I don&apos;t
          maintain.
        </p>
      </header>

      <section className={styles.section}>
        <ul className={styles.prList}>
          {openSource.map((entry) => (
            <li key={entry.project} className={styles.prItem}>
              <PullRequestIcon className={styles.prIcon} />
              <div className={styles.item}>
                <p className={styles.itemTitle}>
                  <a href={entry.href} target="_blank" rel="noreferrer">
                    {entry.project}
                  </a>
                  {entry.org ? <span className={styles.status}>, {entry.org}</span> : null}
                  <span className={styles.prCount}>
                    {" "}
                    · {entry.count} {entry.count === 1 ? "PR" : "PRs"} merged
                  </span>
                </p>
                <p className={styles.itemBody}>{entry.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
