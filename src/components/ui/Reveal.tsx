import type { ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string };

/**
 * Fades content up as it scrolls into view, using a CSS scroll-driven animation (.reveal in
 * globals.css). Browsers without animation-timeline support, reduced-motion users and no-JS
 * visitors simply see the content — it is never hidden waiting for JavaScript.
 */
export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
