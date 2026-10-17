"use client";

import { useEffect } from "react";
import { playClickSound } from "@/lib/clickSound";

export default function ClickSound() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'button:not(:disabled), a[href], [role="button"]',
      );
      if (target) playClickSound();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
