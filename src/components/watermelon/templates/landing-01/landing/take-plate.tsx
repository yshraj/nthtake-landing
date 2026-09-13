"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { NthtakeMark } from "@/assets/nthtake-mark";

export const TAKE_FRAMES = [
  {
    n: "01",
    label: "Lock brief",
    src: "/takes/01-interview.png",
    alt: "Interview setup, take 01",
  },
  {
    n: "02",
    label: "Watermarked",
    src: "/takes/02-macro.png",
    alt: "Product close-up, take 02",
  },
  {
    n: "03",
    label: "Client notes",
    src: "/takes/03-night.png",
    alt: "Night exterior, take 03",
  },
  {
    n: "04",
    label: "One round",
    src: "/takes/04-motion.png",
    alt: "Motion graphics frame, take 04",
  },
  {
    n: "05",
    label: "Master",
    src: "/takes/05-studio.png",
    alt: "Color suite, unlocked master",
  },
] as const;

export default function TakePlate({
  n,
  label,
  src,
  alt,
  locked = false,
  watermarked = true,
  unlocked = false,
  showNumber = true,
  priority = false,
  className,
}: {
  n: string;
  label: string;
  src: string;
  alt?: string;
  locked?: boolean;
  watermarked?: boolean;
  unlocked?: boolean;
  showNumber?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/10 bg-neutral-950 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-950">
        <Image
          src={src}
          alt={alt ?? `Take ${n}`}
          fill
          sizes="(max-width: 768px) 80vw, 42vw"
          className={cn(
            "object-cover",
            locked && "scale-[1.02] blur-[1px] saturate-50",
            !unlocked && "contrast-[1.05] saturate-[0.7]",
          )}
          priority={priority}
        />

        {watermarked && !unlocked && (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-32deg, transparent, transparent 28px, rgba(255,255,255,0.55) 28px, rgba(255,255,255,0.55) 29px)",
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20" />

        <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] tracking-[0.28em] text-white/80 uppercase">
          <NthtakeMark
            state={unlocked ? "unlocked" : "locked"}
            className={cn(
              "h-3.5 w-3.5",
              unlocked ? "text-primary" : "text-white/80",
            )}
          />
          {unlocked ? "Master" : "Preview"}
        </div>

        <span className="absolute top-2 right-2 font-mono text-[9px] tracking-widest text-white/55">
          00:12:04
        </span>

        <div className="absolute right-2 bottom-2 left-2 flex items-end justify-between">
          {showNumber ? (
            <span className="text-primary font-mono text-[10px] tracking-[0.32em]">
              TAKE {n}
            </span>
          ) : (
            <span />
          )}
          <span className="font-mono text-[9px] tracking-widest text-white/55 uppercase">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
