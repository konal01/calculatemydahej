"use client";
import { useEffect, useRef } from "react";

const PETAL_COLORS = ["#F5A623", "#F5C842", "#E8622A", "#FBCB6A", "#F28C3A"];

export default function FloatingPetals() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const els: HTMLDivElement[] = [];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      p.style.background = PETAL_COLORS[i % PETAL_COLORS.length];
      p.style.left = `${Math.random() * 100}vw`;
      p.style.width = `${5 + Math.random() * 7}px`;
      p.style.height = `${8 + Math.random() * 9}px`;
      p.style.animationDuration = `${7 + Math.random() * 10}s`;
      p.style.animationDelay = `${Math.random() * 12}s`;
      p.style.opacity = "0";
      c.appendChild(p);
      els.push(p);
    }
    return () => els.forEach((p) => p.remove());
  }, []);
  return <div ref={ref} className="pointer-events-none" />;
}
