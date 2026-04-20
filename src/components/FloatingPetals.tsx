"use client";
import { useEffect, useRef } from "react";

const PETAL_COLORS = [
  "#FF9933", // saffron
  "#FFD700", // gold
  "#FF6B6B", // red
  "#FFC0CB", // pink
  "#FF8C00", // dark orange
  "#FFE4B5", // moccasin
];

export default function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petals: HTMLDivElement[] = [];

    for (let i = 0; i < 18; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      const color = PETAL_COLORS[i % PETAL_COLORS.length];
      petal.style.background = color;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${6 + Math.random() * 10}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      petal.style.width = `${6 + Math.random() * 8}px`;
      petal.style.height = `${10 + Math.random() * 10}px`;
      petal.style.opacity = `${0.4 + Math.random() * 0.4}`;
      container.appendChild(petal);
      petals.push(petal);
    }

    return () => {
      petals.forEach((p) => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none" />;
}
