"use client";

import { useEffect, useState } from "react";

const HIDE_CAT_KEY = "hide_cat";

export default function CatToggle() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(HIDE_CAT_KEY) === "1";
    setHidden(stored);
    document.documentElement.setAttribute("data-hide-cat", stored ? "1" : "0");
  }, []);

  const toggle = () => {
    setHidden((current) => {
      const next = !current;
      window.localStorage.setItem(HIDE_CAT_KEY, next ? "1" : "0");
      document.documentElement.setAttribute("data-hide-cat", next ? "1" : "0");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={hidden ? "Show the cat" : "Hide the cat"}
      title={hidden ? "Show the cat" : "Hide the cat"}
      className="flex items-center justify-center w-8 h-8 border border-border bg-surface text-fg cursor-pointer transition-[border-color,transform] duration-150 ease-in-out hover:border-current hover:-translate-y-px active:translate-y-0 active:scale-[0.92] [&_svg]:w-[15px] [&_svg]:h-[15px]"
    >
      {hidden ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12Z" opacity="0.4" />
          <circle cx="12" cy="12" r="2.6" opacity="0.4" />
          <path strokeLinecap="round" d="M4 4l16 16" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15c0-4 2-7 4-8.5-.3 1-.4 2-.2 2.8C9 7.3 10.4 6.5 12 6.5s3 .8 4.2 2.8c.2-.8.1-1.8-.2-2.8 2 1.5 4 4.5 4 8.5 0 3-3.6 5.5-8 5.5s-8-2.5-8-5.5Z" />
          <circle cx="9.5" cy="14.5" r="0.8" fill="currentColor" />
          <circle cx="14.5" cy="14.5" r="0.8" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
