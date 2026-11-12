"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: number;
  as?: "div" | "li" | "section";
};

/** Fades/slides children in the first time they scroll into view. */
export default function Reveal({ children, className = "", delay = 0, tilt = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  const style = { "--delay": `${delay}ms`, "--tilt": `${tilt}deg` } as CSSProperties;
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
