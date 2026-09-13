"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NthtakeMark } from "@/assets/nthtake-mark";
import { cn } from "@/lib/utils";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTc(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `00:${pad(m)}:${pad(s)}`;
}

export default function TakePlayer({
  locked,
  progress,
  reduced,
  lockedLabel,
  unlockedLabel,
  onHoldStart,
  onHoldEnd,
}: {
  locked: boolean;
  progress: number;
  reduced: boolean;
  lockedLabel: string;
  unlockedLabel: string;
  onHoldStart?: () => void;
  onHoldEnd?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(8);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play();
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const onTime = () => setTime(video.currentTime);
    const onMeta = () => setDuration(video.duration || 8);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [reduced]);

  const watermark = locked ? 0.2 * (1 - progress * 0.85) : 0;
  const previewFade = locked ? Math.max(0, 1 - progress) : 0;
  const playhead = duration > 0 ? Math.min(1, time / duration) : 0;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-neutral-950",
        locked && onHoldStart && "cursor-pointer select-none",
      )}
      onPointerDown={locked ? onHoldStart : undefined}
      onPointerUp={locked ? onHoldEnd : undefined}
      onPointerCancel={locked ? onHoldEnd : undefined}
      onLostPointerCapture={locked ? onHoldEnd : undefined}
    >
      {reduced ? (
        <Image
          src="/takes/03-night.png"
          alt="Take 03 still"
          fill
          sizes="(max-width: 768px) 100vw, 960px"
          className={cn(
            "pointer-events-none object-cover transition-[filter] duration-500",
            locked && "saturate-50 contrast-90",
          )}
        />
      ) : (
        <video
          ref={videoRef}
          className="pointer-events-none h-full w-full object-cover transition-[filter] duration-500"
          style={{
            filter: locked
              ? `saturate(${0.5 + progress * 0.5}) brightness(${0.82 + progress * 0.18})`
              : "none",
          }}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/takes/03-night.png"
          aria-label={locked ? "Take 03 watermarked preview" : "Take 03 unlocked master"}
        >
          <source src="/takes/take-03.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: watermark,
          backgroundImage:
            "repeating-linear-gradient(-32deg, transparent, transparent 28px, rgba(255,255,255,0.7) 28px, rgba(255,255,255,0.7) 29px)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/25" />

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500"
        style={{ opacity: previewFade }}
      >
        <NthtakeMark
          progress={locked ? progress : 1}
          reduced={reduced}
          className={cn("h-14 w-14 md:h-16 md:w-16", locked ? "text-white" : "text-primary")}
        />
        <p className="font-sans text-3xl tracking-[0.4em] text-white/25 md:text-5xl">PREVIEW</p>
      </div>

      <p className="pointer-events-none absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/70 uppercase">
        {!locked && (
          <NthtakeMark
            state="unlocked"
            reduced={reduced}
            className="text-primary h-3.5 w-3.5"
          />
        )}
        {locked ? lockedLabel : unlockedLabel}
      </p>

      <p className="pointer-events-none absolute top-4 right-4 font-mono text-[10px] tracking-widest text-white/70 uppercase">
        {formatTc(time)}
      </p>

      <div className="pointer-events-none absolute right-4 bottom-3 left-4">
        <div className="mb-1 h-px w-full bg-white/15">
          <div
            className={cn("h-px", locked ? "bg-white/55" : "bg-primary")}
            style={{ width: `${playhead * 100}%` }}
          />
        </div>
      </div>
      {locked && (
        <div
          className="bg-primary pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      )}
    </div>
  );
}
