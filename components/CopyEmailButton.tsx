"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available, ignore
    }
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 font-sans text-[0.875rem] font-medium text-muted bg-transparent border-none p-0 cursor-pointer hover:text-fg [&_svg]:w-[13px] [&_svg]:h-[13px] [&_svg]:transition-transform [&_svg]:duration-150 [&_svg]:ease-in-out hover:[&_svg]:scale-[1.15]"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="9" y="9" width="11" height="11" rx="1.5" />
          <path strokeLinecap="round" d="M5 15V6a1.5 1.5 0 0 1 1.5-1.5H15" />
        </svg>
      )}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
