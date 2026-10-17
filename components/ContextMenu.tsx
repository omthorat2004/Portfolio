"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { openCommandMenu } from "@/lib/commandMenuEvents";

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA"]);

export default function ContextMenu() {
  const [state, setState] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (EDITABLE_TAGS.has(target.tagName) || target.isContentEditable) return;

      e.preventDefault();
      const menuWidth = 232;
      const menuHeight = 268;
      const x = Math.min(e.clientX, window.innerWidth - menuWidth - 8);
      const y = Math.min(e.clientY, window.innerHeight - menuHeight - 8);
      setState({ x: Math.max(8, x), y: Math.max(8, y) });
      setCopied(false);
    };

    const close = () => setState(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!state) return null;

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
    setState(null);
  };

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setState(null), 700);
    } catch {
      // clipboard not available, ignore
    }
  };

  const items = [
    {
      label: "Back",
      disabled: typeof window !== "undefined" && window.history.length <= 1,
      onClick: () => {
        router.back();
        setState(null);
      },
    },
    {
      label: "Forward",
      onClick: () => {
        window.history.forward();
        setState(null);
      },
    },
    {
      label: "Reload",
      onClick: () => window.location.reload(),
    },
    { divider: true },
    {
      label: "Print…",
      onClick: () => {
        window.print();
        setState(null);
      },
    },
    {
      label: "View page source",
      onClick: () => {
        window.open(`view-source:${window.location.href}`, "_blank", "noopener,noreferrer");
        setState(null);
      },
    },
    ...(typeof document !== "undefined" && document.fullscreenElement
      ? [
          {
            label: "Exit full screen",
            onClick: () => {
              document.exitFullscreen();
              setState(null);
            },
          },
        ]
      : []),
    { divider: true },
    {
      label: copied ? "Copied" : "Copy page link",
      onClick: copyLink,
    },
    {
      label: "Toggle light / dark theme",
      onClick: toggleTheme,
    },
    { divider: true },
    {
      label: "Jump to a section… (⌘K)",
      onClick: () => {
        openCommandMenu();
        setState(null);
      },
    },
    {
      label: "Get in touch",
      onClick: () => {
        if (pathname === "/") {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#contact");
        }
        setState(null);
      },
    },
  ];

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Page actions"
      style={{ top: state.y, left: state.x }}
      className="fixed z-50 w-[232px] bg-surface border border-border font-sans text-[0.8125rem] shadow-[0_32px_64px_-24px_var(--shadow-2)]"
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        "divider" in item ? (
          <div key={i} className="border-t border-divider my-1" />
        ) : (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            disabled={"disabled" in item ? item.disabled : false}
            onClick={item.onClick as (e: React.MouseEvent) => void}
            className="flex w-full items-center px-3.5 py-2 text-left text-fg cursor-pointer hover:bg-surface-alt disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent"
          >
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}
