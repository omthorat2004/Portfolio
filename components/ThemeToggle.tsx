"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  const toggle = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  if (!theme) return null;

  return (
    <button
      type="button"
      className="toggle-btn flex items-center justify-center w-8 h-8 border border-border bg-surface text-fg cursor-pointer transition-[border-color,transform] duration-150 ease-in-out hover:border-current hover:-translate-y-px active:translate-y-0 active:scale-[0.92] [&_svg]:w-[15px] [&_svg]:h-[15px]"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="icon-spin-in flex" key={theme}>
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="4.2" />
            <path
              strokeLinecap="round"
              d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.273c-4.464 0-8.08-3.616-8.08-8.08 0-1.316.312-2.56.868-3.662a.5.5 0 0 0-.56-.712A9.09 9.09 0 0 0 3.5 10.909 9.09 9.09 0 0 0 12.591 20a9.09 9.09 0 0 0 8.663-6.323.5.5 0 0 0-.512-.632Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
