import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import ThemeToggle from "../ThemeToggle";
import BgmPlayer from "../BgmPlayer";

export const metadata: Metadata = {
  title: "Blog — Om Thorat",
  description: "Writing. Coming soon.",
};

export default function BlogPage() {
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
        <h1 className={styles.name}>Blog</h1>
        <p className={styles.bio}>
          Coming soon. I am putting together some writing on the projects above and what I am
          learning while building them.
        </p>
      </header>
    </main>
  );
}
