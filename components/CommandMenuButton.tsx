"use client";

import { useEffect, useState } from "react";
import { openCommandMenu } from "@/lib/commandMenuEvents";

const HINT_SEEN_KEY = "ot_cmdk_hint_seen";

export default function CommandMenuButton() {
  const [hintVisible, setHintVisible] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(window.navigator.platform ?? window.navigator.userAgent));
  }, []);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.localStorage.getItem(HINT_SEEN_KEY) === "1";
    } catch {
      // localStorage not available, don't show the hint
    }
    if (seen) return;

    const showTimer = setTimeout(() => setHintVisible(true), 1000);
    const hideTimer = setTimeout(() => dismissHint(), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissHint = () => {
    setHintVisible(false);
    try {
      window.localStorage.setItem(HINT_SEEN_KEY, "1");
    } catch {
      // ignore
    }
  };

  const open = () => {
    dismissHint();
    openCommandMenu();
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={open}
        aria-label="Open command menu (⌘K)"
        title="Search (⌘K)"
        className="flex items-center gap-1.5 h-8 px-2 border border-border bg-surface text-fg cursor-pointer transition-[border-color,transform] duration-150 ease-in-out hover:border-current hover:-translate-y-px active:translate-y-0 active:scale-[0.92] [&_svg]:w-[15px] [&_svg]:h-[15px]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
        </svg>
        <kbd className="font-sans text-[0.6875rem] font-medium text-muted">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
      <span
        role="status"
        className={`absolute right-0 top-full z-30 mt-2 flex items-center gap-2 whitespace-nowrap bg-fg px-3 py-2 font-sans text-[0.8125rem] text-surface shadow-[0_2px_8px_var(--shadow-1)] transition-[opacity,transform] duration-300 ease-in-out ${
          hintVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        Press <kbd className="font-sans font-semibold">⌘K</kbd> to jump anywhere
        <button
          type="button"
          onClick={dismissHint}
          aria-label="Dismiss hint"
          className="cursor-pointer text-surface/70 hover:text-surface"
        >
          ×
        </button>
      </span>
    </span>
  );
}
