"use client";

import { useEffect, useState } from "react";
import styles from "./Visitors.module.css";

const NAMESPACE = "om-thorat-portfolio-v1";
const VISITED_KEY = "ot_visited";

async function hit(key: string): Promise<number | null> {
  try {
    const res = await fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${key}`);
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.value === "number" ? json.value : null;
  } catch {
    return null;
  }
}

async function get(key: string): Promise<number | null> {
  try {
    const res = await fetch(`https://abacus.jasoncameron.dev/get/${NAMESPACE}/${key}`);
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.value === "number" ? json.value : null;
  } catch {
    return null;
  }
}

export default function Visitors() {
  const [views, setViews] = useState<number | null>(null);
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    hit("views").then((value) => {
      if (!cancelled) setViews(value);
    });

    const alreadyVisited = window.localStorage.getItem(VISITED_KEY);
    const visitorsPromise = alreadyVisited ? get("visitors") : hit("visitors");
    visitorsPromise.then((value) => {
      if (cancelled) return;
      setUniqueVisitors(value);
      if (!alreadyVisited && value !== null) {
        window.localStorage.setItem(VISITED_KEY, "1");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (views === null && uniqueVisitors === null) return null;

  return (
    <p className={styles.visitors}>
      {views !== null ? `${views.toLocaleString()} views` : null}
      {views !== null && uniqueVisitors !== null ? " · " : null}
      {uniqueVisitors !== null ? `${uniqueVisitors.toLocaleString()} visitors` : null}
    </p>
  );
}
