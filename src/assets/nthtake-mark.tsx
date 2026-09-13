"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type MarkState = "locked" | "unlocked";

const EASE = [0.16, 1, 0.3, 1] as const;

const SHACKLE_LOCKED =
  "M 5.50 12.40 L 5.50 3.60 L 18.50 3.60 L 18.50 12.40 L 14.40 12.40 L 14.40 7.50 L 9.60 7.50 L 9.60 12.40 Z";
const SHACKLE_UNLOCKED =
  "M 5.57 12.93 L 3.29 4.43 L 15.85 1.07 L 18.13 9.57 L 14.17 10.63 L 12.90 5.89 L 8.26 7.14 L 9.53 11.87 Z";

export function NthtakeMark({
  state = "locked",
  progress,
  drawn = true,
  reduced = false,
  className,
}: {
  state?: MarkState;
  progress?: number;
  drawn?: boolean;
  reduced?: boolean;
  className?: string;
}) {
  const p = progress ?? (state === "unlocked" ? 1 : 0);
  const unlocked = p >= 0.72;
  const open = p >= 0.45;

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      <rect x="4" y="12.4" width="16" height="11.2" fill="currentColor" />
      <motion.rect
        x="10"
        y="15"
        width="4"
        height="6.2"
        initial={false}
        animate={{
          rotate: reduced ? (unlocked ? 90 : 0) : 90 * p,
        }}
        style={{ transformOrigin: "12px 18.1px" }}
        fill="#141414"
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 24 }
        }
      />
      <motion.path
        d={open ? SHACKLE_UNLOCKED : SHACKLE_LOCKED}
        fill="currentColor"
        initial={false}
        animate={{
          d: open ? SHACKLE_UNLOCKED : SHACKLE_LOCKED,
          opacity: drawn ? 1 : 0.2,
        }}
        transition={reduced ? { duration: 0 } : { duration: 0.36, ease: EASE }}
      />
    </motion.svg>
  );
}
