"use client";

import type { ReactNode } from "react";
import { openContactModal } from "./contactModalEvents";

export default function OpenContactButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={openContactModal}>
      {children}
    </button>
  );
}
