"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SECTIONS, PAGES } from "@/lib/navigation";
import { projects } from "@/lib/data";
import { OPEN_COMMAND_MENU_EVENT } from "@/lib/commandMenuEvents";

type Item = {
  key: string;
  label: string;
  category: string;
  go: (router: ReturnType<typeof useRouter>, pathname: string) => void;
};

const items: Item[] = [
  ...PAGES.map((page) => ({
    key: `page-${page.href}`,
    label: page.label,
    category: "Page",
    go: (router: ReturnType<typeof useRouter>) => router.push(page.href),
  })),
  ...SECTIONS.map((section) => ({
    key: `section-${section.id}`,
    label: section.label,
    category: "Section",
    go: (router: ReturnType<typeof useRouter>, pathname: string) => {
      if (pathname === "/") {
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/#${section.id}`);
      }
    },
  })),
  ...projects.map((project) => ({
    key: `project-${project.slug}`,
    label: project.name,
    category: "Project",
    go: (router: ReturnType<typeof useRouter>) => router.push(`/projects/${project.slug}`),
  })),
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const onOpenRequest = () => setOpen(true);
    window.addEventListener(OPEN_COMMAND_MENU_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_COMMAND_MENU_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const select = (item: Item) => {
    item.go(router, pathname);
    setOpen(false);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) select(item);
    }
  };

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/50 px-4 pt-[14vh]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-[480px] bg-surface border border-border shadow-[0_32px_64px_-24px_var(--shadow-2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a section or page…"
              className="w-full border-b border-border bg-transparent px-4 py-3.5 font-sans text-[0.9375rem] text-fg outline-none placeholder:text-muted"
            />
            <ul className="max-h-[320px] overflow-y-auto py-1.5">
              {results.length === 0 ? (
                <li className="px-4 py-3 font-sans text-[0.875rem] text-muted">No matches.</li>
              ) : (
                results.map((item, i) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => select(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-sans text-[0.875rem] cursor-pointer ${
                        i === activeIndex ? "bg-surface-alt text-fg" : "text-fg"
                      }`}
                    >
                      {item.label}
                      <span className="text-[0.75rem] text-muted">{item.category}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
