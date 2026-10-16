"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SectionNav.module.css";

const SECTIONS = [
  { id: "stack", label: "Stack" },
  { id: "contributions", label: "Contributions" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open source" },
  { id: "education", label: "Education" },
  { id: "testimonials", label: "What people are saying" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav({ name }: { name: string }) {
  const [visible, setVisible] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const check = () => {
      setCanScrollRight(list.scrollWidth - list.clientWidth - list.scrollLeft > 4);
    };

    check();
    list.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      list.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [visible]);

  const scrollRight = () => {
    listRef.current?.scrollBy({ left: 140, behavior: "smooth" });
  };

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
      aria-label="Section navigation"
    >
      <a href="#" className={styles.name}>
        {name}
      </a>
      <div className={styles.listWrap}>
        <ul className={styles.list} ref={listRef}>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
        {canScrollRight ? (
          <button
            type="button"
            className={styles.scrollHint}
            onClick={scrollRight}
            aria-label="Scroll to see more sections"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        ) : null}
      </div>
    </nav>
  );
}
