"use client";

import { useEffect, useState } from "react";

const COUNTED_KEY = "ot_counted";

type Counts = { views: number | null; visitors: number | null };

export default function Visitors() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let cancelled = false;
    let counted = false;
    try {
      counted = window.sessionStorage.getItem(COUNTED_KEY) === "1";
    } catch {}

    // Count once per browser session; later loads only read the totals.
    fetch("/api/visit", { method: counted ? "GET" : "POST" })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((data) => {
        if (cancelled || !data) return;
        setCounts(data);
        if (!counted && data.views !== null) {
          try {
            window.sessionStorage.setItem(COUNTED_KEY, "1");
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!counts || counts.views === null || counts.visitors === null) return null;

  return (
    <p className="mt-4 flex flex-wrap gap-x-[18px] gap-y-1 font-sans text-[0.8125rem] text-muted">
      {counts.views.toLocaleString()} views · {counts.visitors.toLocaleString()} visitors
    </p>
  );
}
