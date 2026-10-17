"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { OPEN_CONTACT_MODAL_EVENT } from "@/lib/contactModalEvents";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "success" | "error";

const fieldLabel = "block font-sans text-[0.75rem] font-semibold tracking-[0.03em] text-muted mb-1.5";
const fieldInput =
  "w-full px-[10px] py-[9px] font-sans text-[0.875rem] text-fg bg-surface-alt border border-border focus:outline focus:outline-2 focus:outline-fg focus:-outline-offset-1";

export default function ContactModal({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setStatus("idle");
    };
    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="relative w-full max-w-[420px] max-h-[85vh] overflow-y-auto p-6 pt-7 bg-surface border border-edge shadow-[0_24px_64px_var(--shadow-2)]"
        role="dialog"
        aria-modal="true"
        aria-label="Send a message"
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center border border-border bg-transparent text-fg cursor-pointer hover:border-current [&_svg]:w-[13px] [&_svg]:h-[13px]"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-3">
            <p className="text-[1.25rem] font-semibold mb-2">Thanks for reaching out</p>
            <p className="text-[0.9375rem] leading-[1.6] text-muted">
              I read every message myself and will get back to you soon. Thanks for visiting my
              full profile.
            </p>
          </div>
        ) : !CONFIGURED ? (
          <>
            <p className="text-[1.375rem] font-semibold mb-1.5 pr-6">Send a message</p>
            <p className="font-sans text-[0.8125rem] text-muted mb-5">
              The message form isn&apos;t wired up yet. Reach me directly instead.
            </p>
            <p className="font-sans text-[0.875rem] leading-[1.6] text-muted [&_a]:text-fg [&_a]:underline">
              Email me at <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </>
        ) : (
          <>
            <p className="text-[1.375rem] font-semibold mb-1.5 pr-6">Send a message</p>
            <p className="font-sans text-[0.8125rem] text-muted mb-5">
              I read every message myself and reply from here.
            </p>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3.5">
                <label className={fieldLabel} htmlFor="contact-name">
                  Name
                </label>
                <input id="contact-name" name="from_name" type="text" required className={fieldInput} />
              </div>
              <div className="mb-3.5">
                <label className={fieldLabel} htmlFor="contact-email">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="from_email"
                  type="email"
                  required
                  className={fieldInput}
                />
              </div>
              <div className="mb-3.5">
                <label className={fieldLabel} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  className={`${fieldInput} resize-y min-h-24 font-serif`}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-1 py-2.5 font-sans text-[0.875rem] font-semibold text-surface bg-fg border-none cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-default"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {status === "error" ? (
                <p className="font-sans text-[0.8125rem] text-fg mt-2.5 [&_a]:underline">
                  Something went wrong. Email me directly at{" "}
                  <a href={`mailto:${email}`}>{email}</a>.
                </p>
              ) : null}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
