"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactModal.module.css";
import { OPEN_CONTACT_MODAL_EVENT } from "./contactModalEvents";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "success" | "error";

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
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Send a message">
        <button
          type="button"
          className={styles.close}
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <p className={styles.successTitle}>Thanks for reaching out</p>
            <p className={styles.successBody}>
              I read every message myself and will get back to you soon. Thanks for visiting my
              full profile.
            </p>
          </div>
        ) : !CONFIGURED ? (
          <>
            <p className={styles.title}>Send a message</p>
            <p className={styles.subtitle}>
              The message form isn&apos;t wired up yet. Reach me directly instead.
            </p>
            <p className={styles.fallback}>
              Email me at <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </>
        ) : (
          <>
            <p className={styles.title}>Send a message</p>
            <p className={styles.subtitle}>I read every message myself and reply from here.</p>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="from_name"
                  type="text"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="from_email"
                  type="email"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  className={styles.textarea}
                />
              </div>
              <button type="submit" className={styles.submit} disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {status === "error" ? (
                <p className={styles.error}>
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
