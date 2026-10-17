"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onekoDash } from "@/lib/onekoDash";

type Quote = { text: string; from: string };

const ROTATE_MS = 4500;
const EXIT_MS = 300;

export default function AvatarQuote({
  quotes,
  avatarSrc,
  avatarAlt,
}: {
  quotes: Quote[];
  avatarSrc: string;
  avatarAlt: string;
}) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hasRotatedOnce, setHasRotatedOnce] = useState(false);

  const handleAvatarClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    onekoDash(next);
  };

  useEffect(() => {
    if (quotes.length < 2) return;
    const tick = setInterval(() => {
      setLeaving(true);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setLeaving(false);
        setHasRotatedOnce(true);
      }, EXIT_MS);
      return () => clearTimeout(swap);
    }, ROTATE_MS);
    return () => clearInterval(tick);
  }, [quotes.length]);

  const quote = quotes[index];

  return (
    <div className="flex flex-col items-start xs:flex-row xs:items-center gap-3.5 mb-3">
      <Image
        className="block flex-none w-[60px] h-[60px] xs:w-[72px] xs:h-[72px] object-cover border border-border cursor-pointer transition-transform duration-150 ease-in-out active:scale-90"
        src={avatarSrc}
        alt={avatarAlt}
        width={72}
        height={72}
        priority
        onClick={handleAvatarClick}
        title="Click for a surprise"
      />
      <span className="group relative">
        <p className="speech-bubble relative mb-1.5 px-3 py-2 max-w-full xs:max-w-[230px] bg-surface-alt border border-border font-sans text-[0.75rem] italic leading-[1.45] text-fg cursor-default">
          <span className="relative block overflow-hidden">
            <span
              key={index}
              className={`block transition-[opacity,transform] duration-300 ease-in-out ${
                leaving
                  ? "opacity-0 -translate-y-2"
                  : `opacity-100 translate-y-0 ${hasRotatedOnce ? "quote-in" : ""}`
              }`}
            >
              {quote.text}
              <span className="block mt-1 not-italic text-muted">{quote.from}</span>
            </span>
          </span>
        </p>
        <span className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100">
          <span className="flex max-w-[460px] flex-col items-center gap-4 bg-surface border border-border px-8 py-7 text-center shadow-[0_32px_64px_-24px_var(--shadow-2)]">
            <Image
              className="block w-20 h-20 object-cover border border-border"
              src={avatarSrc}
              alt=""
              width={80}
              height={80}
            />
            <span className="font-serif text-[1.375rem] italic leading-[1.5] text-fg">
              {quote.text}
              <span className="block mt-3 font-sans text-[0.9375rem] not-italic text-muted">
                — {quote.from}
              </span>
            </span>
          </span>
        </span>
      </span>
    </div>
  );
}
