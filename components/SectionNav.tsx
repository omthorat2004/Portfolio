"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SECTIONS } from "@/lib/navigation";

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
      className={`section-nav fixed top-0 left-1/2 w-full max-w-[576px] z-20 px-6 py-3.5 flex items-center gap-[18px] bg-surface border-b border-border font-sans transition-[transform,opacity] duration-200 ease-in-out ${
        visible
          ? "-translate-x-1/2 translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-x-1/2 -translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
      aria-label="Section navigation"
    >
      <a href="#" className="flex-none flex items-center gap-2 text-[0.875rem] font-semibold no-underline">
        <Image
          src="/avatar.jpg"
          alt=""
          width={26}
          height={26}
          className="block w-[26px] h-[26px] object-cover border border-border"
        />
        {name}
      </a>
      <div className="relative flex-1 min-w-0">
        <ul
          className="list-none flex gap-4 pr-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_a]:block [&_a]:whitespace-nowrap [&_a]:text-[0.8125rem] [&_a]:text-muted [&_a]:no-underline [&_a]:py-0.5 [&_a:hover]:text-fg"
          ref={listRef}
        >
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
        {canScrollRight ? (
          <button
            type="button"
            className="scroll-hint absolute top-0 right-0 bottom-0 w-[34px] flex items-center justify-end pr-0.5 bg-[linear-gradient(to_right,transparent,var(--surface)_55%)] border-none text-muted cursor-pointer hover:text-fg [&_svg]:w-[13px] [&_svg]:h-[13px]"
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
