"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Film, Link2, Monitor, MessageSquare, Sparkles,
  CheckCircle2, Unlock, Play,
} from "lucide-react";

const STEP_MS = 4200;

const FLOW = [
  {
    id: 1, icon: Film,
    label: "You upload the project",
    detail: "Brand_Campaign_Final.mp4 · 2.4 GB",
  },
  {
    id: 2, icon: Link2,
    label: "A secure review link is generated",
    detail: "edittrack.com/r/acme-rebrand · expires in 7 days",
  },
  {
    id: 3, icon: Monitor,
    label: "Client opens the review room",
    detail: "Full watermarked preview · no account needed",
  },
  {
    id: 4, icon: MessageSquare,
    label: "Client leaves timestamped feedback",
    detail: "@ 1:05 — The outro feels too long. Maybe cut to 5s?",
  },
  {
    id: 5, icon: Sparkles,
    label: "EditTrack turns feedback into revision notes",
    detail: "1 change · AI-assisted summary",
  },
  {
    id: 6, icon: CheckCircle2,
    label: "Client approves the final version",
    detail: "V2 · Approved by Sarah Chen",
  },
  {
    id: 7, icon: Unlock,
    label: "Source files unlock instantly",
    detail: "Brand_Campaign_MASTER.mp4 · clean file · ready to download",
  },
] as const;

/* ── Step visual panels ───────────────────────────────────────── */

function UploadPanel() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Film className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">Brand_Campaign_Final.mp4</p>
          <p className="text-xs text-muted-foreground">2.4 GB · MP4</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Uploading…</span>
          <motion.span
            className="text-emerald-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9 }}
          >
            ✓ Complete
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function LinkPanel() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Link2 className="w-4 h-4 text-primary" />
        Review link ready
      </div>
      <div className="rounded-lg bg-secondary/60 border border-border px-3 py-2 font-mono text-xs text-foreground/80 truncate">
        edittrack.com/r/acme-rebrand-2026
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Expires in 7 days</span>
        <motion.span
          className="text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Link copied ✓
        </motion.span>
      </div>
    </div>
  );
}

function PreviewPanel() {
  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden border border-border shadow-sm">
      <div className="relative bg-muted aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/50 via-pink-300/30 to-teal-400/50" />
        <div className="relative z-10 text-white/50 text-[10px] font-mono font-bold tracking-[0.3em] select-none">
          EDITTRACK PREVIEW
        </div>
        <motion.div
          className="absolute bottom-2 right-2 z-10 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Play className="w-3 h-3 text-white fill-white" />
        </motion.div>
      </div>
      <div className="bg-background px-3 py-2 border-t border-border flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground shrink-0">1:05</span>
        <div className="flex-1 h-1 rounded-full bg-secondary relative">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "47%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground shrink-0">2:20</span>
      </div>
    </div>
  );
}

function FeedbackPanel() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
        <span className="text-xs font-mono text-primary font-medium">@ 1:05</span>
      </div>
      <motion.div
        className="rounded-xl rounded-tl-sm bg-background border border-border p-3 shadow-sm"
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm">The outro feels too long. Maybe cut it to 5 seconds?</p>
        <p className="text-xs text-muted-foreground mt-1.5">Sarah Chen · just now</p>
      </motion.div>
    </div>
  );
}

function AIPanel() {
  return (
    <div className="w-full max-w-sm space-y-2.5">
      <div className="rounded-xl rounded-tl-sm bg-background border border-border/50 p-3 opacity-50">
        <p className="text-xs text-muted-foreground">The outro feels too long. Maybe cut it to 5 seconds?</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Sarah Chen</p>
      </div>
      <motion.div
        className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          EditTrack summarized 1 revision note
        </div>
        <ul className="space-y-1">
          <li className="text-sm flex items-start gap-2">
            <span className="text-primary shrink-0 mt-0.5">•</span>
            <span>Shorten outro from 10s to 5s</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function ApprovePanel() {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-4">
      <motion.div
        className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
      >
        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
      </motion.div>
      <motion.div
        className="space-y-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <p className="font-semibold text-foreground">Final Version Approved</p>
        <p className="text-sm text-muted-foreground">V2 · Sarah Chen · just now</p>
      </motion.div>
      <motion.div
        className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Revision complete
      </motion.div>
    </div>
  );
}

function UnlockPanel() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-4 space-y-3">
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Unlock className="w-5 h-5 text-emerald-600" />
        </motion.div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">Brand_Campaign_MASTER.mp4</p>
          <motion.p
            className="text-xs text-emerald-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Clean file · unlocked
          </motion.p>
        </div>
      </div>
      <motion.div
        className="w-full rounded-lg bg-foreground text-background text-sm font-medium py-2 px-4 text-center"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Download
      </motion.div>
    </div>
  );
}

function StepVisual({ id }: { id: number }) {
  switch (id) {
    case 1: return <UploadPanel />;
    case 2: return <LinkPanel />;
    case 3: return <PreviewPanel />;
    case 4: return <FeedbackPanel />;
    case 5: return <AIPanel />;
    case 6: return <ApprovePanel />;
    case 7: return <UnlockPanel />;
    default: return null;
  }
}

/* ── Main component ───────────────────────────────────────────── */

export function ProductFlow() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepStartRef = useRef(0);

  useEffect(() => {
    stepStartRef.current = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - stepStartRef.current;
      setProgress(Math.min((elapsed / STEP_MS) * 100, 100));
    }, 50);

    const advance = setTimeout(() => {
      setStep(s => (s + 1) % FLOW.length);
    }, STEP_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(advance);
    };
  }, [step]);

  const current = FLOW[step];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-[1.5rem] md:rounded-[2rem] bg-secondary/30 border border-border/50 overflow-hidden shadow-xl shadow-primary/5">
        {/* Step indicator */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-background/40">
          <div className="flex items-center gap-1.5">
            {FLOW.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-5 bg-primary"
                    : i < step
                    ? "w-1.5 bg-primary/40"
                    : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-mono">{step + 1} / {FLOW.length}</span>
        </div>

        {/* Visual area */}
        <div className="relative min-h-[240px] md:min-h-[320px] flex items-center justify-center px-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center"
            >
              <StepVisual id={step + 1} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Label + detail */}
        <div className="px-5 pb-4 border-t border-border/40 bg-background/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 space-y-1"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm font-medium text-foreground">{current.label}</p>
              </div>
              <p className="text-xs text-muted-foreground pl-6">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-progress bar */}
        <div className="h-0.5 bg-border/50">
          <motion.div
            className="h-full bg-primary/50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
