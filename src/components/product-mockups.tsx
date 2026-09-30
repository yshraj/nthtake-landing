"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, CreditCard, Lock, Play, Pause, Shield, User, Loader2, Copy, Check, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MockupWorkspace({ children, title = "Website Redesign — Client Review", className = "" }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <div className={`w-full rounded-[1.5rem] md:rounded-[2rem] bg-secondary/30 border border-border/50 p-2 md:p-4 overflow-hidden shadow-2xl shadow-primary/5 ${className}`}>
      <div className="w-full bg-background rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
        <div className="h-12 border-b border-border flex items-center px-4 justify-between bg-muted/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground font-mono">{title}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20"
            >
              Payment Protected
            </motion.span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MockupVideoPlayer({
  showAnnotation = true,
  className = ""
}: {
  showAnnotation?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(33);
  const [annotations, setAnnotations] = useState<{ x: number; y: number; id: number }[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.4;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  }, []);

  const handleVideoClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAnnotations(prev => [...prev.slice(-2), { x, y, id: Date.now() }]);
  }, [playing]);

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * 72);
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  };

  return (
    <div className={`flex-1 bg-muted/30 relative flex flex-col min-h-[300px] h-full ${className}`}>
      <div
        className="flex-1 relative m-2 md:m-4 rounded-lg md:rounded-xl bg-muted overflow-hidden border border-border/50 shadow-sm select-none"
        onClick={handleVideoClick}
        style={{ cursor: playing ? "crosshair" : "default" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-all duration-700 ${playing ? "scale-100 opacity-90" : "scale-105 opacity-60"}`}
          alt="Video frame mockup"
          draggable={false}
        />

        {/* Paused overlay with play button */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/25 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); setPlaying(true); }}
                className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current ml-1 text-foreground" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pre-existing annotation bubble */}
        {showAnnotation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-[35%] left-[25%] md:top-[40%] md:left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg border-2 border-background z-10"
            >
              1
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-2 bg-background/95 backdrop-blur text-foreground text-sm font-medium py-2 px-3 rounded-lg shadow-xl border border-border whitespace-nowrap hidden sm:block"
            >
              &quot;Make the logo bigger here&quot;
            </motion.div>
          </motion.div>
        )}

        {/* User-placed annotation pins */}
        <AnimatePresence>
          {annotations.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center font-bold text-xs shadow-lg border-2 border-background pointer-events-none z-20"
            >
              {i + 2}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="text-2xl md:text-4xl font-bold uppercase tracking-widest rotate-[-30deg]">EditTrack Preview</div>
        </div>

        {/* Click-to-pin hint */}
        <AnimatePresence>
          {playing && annotations.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none"
            >
              Click to pin feedback
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="h-12 md:h-14 border-t border-border/50 flex items-center px-4 gap-3 bg-background shrink-0">
        <button
          onClick={() => setPlaying(p => !p)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {playing
            ? <Pause className="w-4 h-4 fill-current" />
            : <Play className="w-4 h-4 fill-current" />
          }
        </button>
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="flex-1 h-2 bg-secondary rounded-full overflow-visible cursor-pointer group relative"
        >
          <div className="h-full bg-primary rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
          </div>
        </div>
        <div className="text-[10px] md:text-xs text-muted-foreground font-mono">
          {formatTime(progress)} / 1:12
        </div>
      </div>
    </div>
  );
}

export function MockupSidebar({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<"comments" | "versions">("comments");

  return (
    <div className={`w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background flex flex-col h-full shrink-0 ${className}`}>
      <div className="p-3 md:p-4 border-b border-border flex gap-2 shrink-0">
        <button
          onClick={() => setTab("comments")}
          className={`flex-1 text-sm font-medium pb-2 border-b-2 transition-colors ${tab === "comments" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Comments
        </button>
        <button
          onClick={() => setTab("versions")}
          className={`flex-1 text-sm font-medium pb-2 border-b-2 transition-colors ${tab === "versions" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Versions
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {tab === "comments" ? (
            <motion.div
              key="comments"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="p-3 md:p-4 space-y-3"
            >
              <div className="flex items-start gap-2.5 opacity-60">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-border shrink-0 mt-0.5">SC</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground">Sarah Chen</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">2h ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">&ldquo;Make the logo bigger here.&rdquo;</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-medium">Resolved · @ 0:12</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 opacity-60">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20 shrink-0 mt-0.5">Me</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground">You</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">1h ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">&ldquo;On it — uploading V2 now.&rdquo;</p>
                </div>
              </div>

              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(198,90,50,0.12)", "0 0 0 4px rgba(198,90,50,0)", "0 0 0 0 rgba(198,90,50,0.12)"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="flex items-start gap-2.5 rounded-lg p-2 bg-primary/5 border border-primary/20"
              >
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-border shrink-0 mt-0.5">SC</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground">Sarah Chen</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">now</span>
                  </div>
                  <p className="text-xs text-foreground mt-0.5">&ldquo;Looks great! Just need the outro slightly shorter.&rdquo;</p>
                  <span className="text-[10px] text-primary font-medium">@ 1:05 · Active</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="versions"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="p-3 md:p-4 space-y-3"
            >
              {[
                { label: "V1", name: "Initial Draft", meta: "5 comments · Sep 28", done: true, delay: 0.05 },
              ].map(v => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: v.delay }}
                  className="flex items-start gap-3 opacity-50"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-border shrink-0">{v.label}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-through decoration-muted-foreground/40">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.meta}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(198,90,50,0.2)", "0 0 0 6px rgba(198,90,50,0)", "0 0 0 0 rgba(198,90,50,0.2)"] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0"
                >
                  V2
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">Revised Edit</div>
                  <div className="text-xs text-primary font-medium">Current · 1 open comment</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Sep 30</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-start gap-3 opacity-35"
              >
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-dashed border-border/60 flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">V3</div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-sm text-muted-foreground">Not yet uploaded</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MockupPayLock({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      setState(s => {
        if (s === "idle") return "processing";
        return s;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state !== "processing") return;
    const t = setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 4000);
    }, 1500);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className={`w-full max-w-sm bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden flex flex-col relative z-20 ${className}`}>
      <div className="p-5 text-center space-y-2 bg-muted/40 border-b border-border/50">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">Final Version Approved</h4>
        <p className="text-xs text-muted-foreground">Pay the balance to unlock your high-res files.</p>
      </div>
      <div className="p-5 space-y-5">
        <div className="flex justify-between items-center text-sm border-b border-border/50 pb-3">
          <div className="font-medium text-muted-foreground">Project Balance</div>
          <div className="text-xl font-heading font-semibold text-foreground">$850.00</div>
        </div>
        <div className="space-y-2.5 pt-1">
          <div className="h-9 rounded-lg border border-border bg-background flex items-center px-3 gap-3 shadow-sm">
            <CreditCard className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="text-xs text-muted-foreground tracking-widest">•••• •••• •••• 4242</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-9 rounded-lg border border-border bg-background flex items-center px-3 shadow-sm"><span className="text-xs text-muted-foreground">MM / YY</span></div>
            <div className="h-9 rounded-lg border border-border bg-background flex items-center px-3 shadow-sm"><span className="text-xs text-muted-foreground">CVC</span></div>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.button
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setState("processing")}
                className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:bg-foreground/90 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 fill-current opacity-70" />
                Pay & Unlock Files
              </motion.button>
            )}
            {state === "processing" && (
              <motion.button
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                disabled
                className="w-full py-3 bg-foreground/80 text-background rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md cursor-not-allowed"
              >
                <Loader2 className="w-4 h-4 animate-spin opacity-70" />
                Processing...
              </motion.button>
            )}
            {state === "success" && (
              <motion.button
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Payment Successful
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function MockupMagicLink({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [linkSuffix, setLinkSuffix] = useState("xyz123");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (generating) return;
    setGenerating(true);
    setTimeout(() => {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      const suffix = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      setLinkSuffix(suffix);
      setGenerating(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-sm bg-background rounded-2xl shadow-xl border border-border/50 p-6 space-y-5 relative z-10 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground">Secure Review Link</div>
          <div className="text-sm text-muted-foreground">Expires in 7 days</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRegenerate}
          disabled={generating}
          className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          title="Generate new link"
        >
          <motion.div animate={{ rotate: generating ? 360 : 0 }} transition={{ duration: 0.8, ease: "linear", repeat: generating ? Infinity : 0 }}>
            <RefreshCw className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between border border-border/50 gap-2">
        <AnimatePresence mode="wait">
          {generating ? (
            <motion.span key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
              Generating...
            </motion.span>
          ) : (
            <motion.span key={linkSuffix} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-sm text-muted-foreground truncate">
              edittrack.com/r/{linkSuffix}...
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="shrink-0"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="copied" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                <Check className="w-3.5 h-3.5" />
                Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-primary font-medium text-sm hover:opacity-80 transition-opacity">
                <Copy className="w-3.5 h-3.5" />
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground p-3 rounded-lg border border-border cursor-default"
      >
        <User className="w-4 h-4 shrink-0 opacity-60" />
        Client bypasses login screen
      </motion.div>
    </motion.div>
  );
}

export function MockupSuccessState({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex items-center gap-3 bg-background p-4 rounded-full shadow-sm border border-border/50">
        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-sm font-medium pr-2">Client Approved • Payment Processing...</span>
      </div>
      <p className="text-muted-foreground font-medium text-sm">
        Source files unlocked instantly.
      </p>
    </div>
  );
}
