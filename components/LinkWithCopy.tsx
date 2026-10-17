"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

export default function LinkWithCopy({
  label,
  href,
  copyHref,
  internal,
  className,
  note,
  children,
}: {
  label: string;
  href: string;
  copyHref: string;
  internal?: boolean;
  className?: string;
  note?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(copyHref);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        btn.blur();
      }, 900);
    } catch {
      // clipboard not available, ignore
    }
  };

  return (
    <span className="group relative inline-flex">
      {internal ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {children}
        </a>
      )}
      {/* padding (not margin) keeps the gap to the link inside the hoverable hit-box, so moving the
          cursor from the link up to the tooltip doesn't pass through a dead zone and close it */}
      <span className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 pb-1.5 opacity-0 pointer-events-none scale-95 transition-[opacity,transform] duration-150 ease-in-out group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        {note ? (
          <span className="block whitespace-nowrap bg-fg px-2 py-1 font-sans text-[0.6875rem] font-medium text-surface">
            {note}
          </span>
        ) : (
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy link to ${label}`}
            className="flex cursor-pointer items-center gap-1 whitespace-nowrap bg-fg px-2 py-1 font-sans text-[0.6875rem] font-medium text-surface"
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[11px] w-[11px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[11px] w-[11px]">
                <rect x="9" y="9" width="11" height="11" rx="1.5" />
                <path strokeLinecap="round" d="M5 15V6a1.5 1.5 0 0 1 1.5-1.5H15" />
              </svg>
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        )}
      </span>
    </span>
  );
}
