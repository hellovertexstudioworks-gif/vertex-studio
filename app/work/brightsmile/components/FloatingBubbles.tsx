"use client";

import { motion } from "framer-motion";

type SectionBubblesProps = {
  variant?: "left" | "right" | "both";
};

const bubbles = [
  {
    position: "left-[5%] top-[18%]",
    size: "h-4 w-4",
    color: "bg-blue-200/65",
    glow: "shadow-[0_0_24px_rgba(59,130,246,0.14)]",
    x: [0, 10, -5, 0],
    y: [0, -20, 10, 0],
    duration: 7,
    delay: 0,
  },
  {
    position: "left-[13%] top-[70%]",
    size: "h-3 w-3",
    color: "bg-cyan-200/60",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.12)]",
    x: [0, -7, 5, 0],
    y: [0, 14, -7, 0],
    duration: 8,
    delay: 1.1,
  },
  {
    position: "left-[27%] top-[42%]",
    size: "h-2.5 w-2.5",
    color: "bg-blue-100/70",
    glow: "shadow-[0_0_18px_rgba(59,130,246,0.1)]",
    x: [0, 6, -4, 0],
    y: [0, -12, 6, 0],
    duration: 6.8,
    delay: 1.9,
  },
  {
    position: "right-[6%] top-[27%]",
    size: "h-5 w-5",
    color: "bg-cyan-200/55",
    glow: "shadow-[0_0_28px_rgba(6,182,212,0.13)]",
    x: [0, -10, 6, 0],
    y: [0, 18, -10, 0],
    duration: 8,
    delay: 0.6,
  },
  {
    position: "right-[14%] top-[77%]",
    size: "h-3 w-3",
    color: "bg-blue-200/60",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.12)]",
    x: [0, 7, -4, 0],
    y: [0, -14, 7, 0],
    duration: 6.5,
    delay: 1.8,
  },
  {
    position: "right-[29%] top-[48%]",
    size: "h-2.5 w-2.5",
    color: "bg-cyan-100/70",
    glow: "shadow-[0_0_18px_rgba(6,182,212,0.1)]",
    x: [0, -6, 4, 0],
    y: [0, 11, -6, 0],
    duration: 7.2,
    delay: 2.3,
  },
];

export default function SectionBubbles({
  variant = "both",
}: SectionBubblesProps) {
  const visibleBubbles = bubbles.filter((_, index) => {
    if (variant === "both") return true;
    if (variant === "left") return index < 3;
    return index >= 3;
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {visibleBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${bubble.size} ${bubble.color} ${bubble.glow}`}
          animate={{
            x: bubble.x,
            y: bubble.y,
            scale: [1, 1.08, 0.96, 1],
            opacity: [0.5, 0.78, 0.58, 0.5],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
