"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Sparkles, FileText } from "lucide-react";
import { site } from "@/content/site";

type FlowItem = (typeof site.ai.flow)[number];

/* ── Timing: delay before each message appears (ms) ─────────────── */
const DELAYS = [700, 2000, 1600, 2400, 1300, 1100];
const RESET_DELAY = 4500;

/* ── Individual message renderers ────────────────────────────────── */

function ClientBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-secondary/70 border border-border/60 px-3.5 py-2.5 space-y-0.5">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
        <p className="text-[10px] text-muted-foreground/70">Client</p>
      </div>
    </div>
  );
}

function AIBubble({ item }: { item: Extract<FlowItem, { role: "ai" }> }) {
  return (
    <div className="flex justify-start gap-2.5">
      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3 text-primary" />
      </div>
      <div className="max-w-[85%] space-y-1.5">
        <div className="rounded-2xl rounded-tl-sm bg-background border border-border/60 px-3.5 py-2.5 shadow-sm space-y-2.5">
          {"context" in item && item.context && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="inline-flex items-center gap-1.5 text-[10px] text-primary bg-primary/5 border border-primary/15 rounded-full px-2.5 py-1 font-medium"
            >
              <FileText className="w-2.5 h-2.5 shrink-0" />
              {item.context}
            </motion.div>
          )}
          <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
          {"options" in item && item.options && (
            <ul className="space-y-1.5 pt-0.5">
              {item.options.map((opt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.18, duration: 0.3 }}
                  className={`text-xs rounded-lg px-2.5 py-1.5 font-mono border ${
                    i === 0
                      ? "bg-secondary/70 border-border/50 text-foreground/80"
                      : "bg-secondary/30 border-border/30 text-foreground/60"
                  }`}
                >
                  {opt}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground/70 pl-1">EditTrack</p>
      </div>
    </div>
  );
}

function ChoiceBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <motion.div
        className="max-w-[82%] rounded-2xl rounded-tr-sm bg-primary/10 border border-primary/25 px-3.5 py-2.5 space-y-0.5"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p className="text-xs text-primary font-medium font-mono">{text}</p>
        <p className="text-[10px] text-primary/60">Client selected</p>
      </motion.div>
    </div>
  );
}

function RevisionNote({ text }: { text: string }) {
  return (
    <motion.div
      className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 space-y-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        Revision note · ready for designer
      </div>
      <p className="text-sm text-foreground leading-snug">{text}</p>
    </motion.div>
  );
}

function FlowMessage({ item }: { item: FlowItem }) {
  if (item.role === "client") return <ClientBubble text={item.text} />;
  if (item.role === "ai") return <AIBubble item={item} />;
  if (item.role === "choice") return <ChoiceBubble text={item.text} />;
  if (item.role === "note") return <RevisionNote text={item.text} />;
  return null;
}

/* ── Typing indicator ─────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-2.5">
      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
        <Sparkles className="w-3 h-3 text-primary" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-background border border-border/60 px-3.5 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */

const FLOW = site.ai.flow;

export function AIChatSection() {
  const [visible, setVisible] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    if (visible >= FLOW.length) {
      const t = setTimeout(() => {
        setVisible(0);
        setShowTyping(false);
      }, RESET_DELAY);
      return () => clearTimeout(t);
    }

    const delay = DELAYS[visible] ?? 1500;
    const nextItem = FLOW[visible];
    const isAI = nextItem?.role === "ai";

    if (isAI && delay > 800) {
      // Show typing indicator ~600ms before the AI message appears
      const typingDelay = delay - 700;
      const tTyping = setTimeout(() => setShowTyping(true), typingDelay);
      const tMessage = setTimeout(() => {
        setShowTyping(false);
        setVisible(v => v + 1);
      }, delay);
      return () => { clearTimeout(tTyping); clearTimeout(tMessage); };
    }

    const t = setTimeout(() => setVisible(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible, isInView]);

  // Auto-scroll chat to bottom as messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visible, showTyping]);

  return (
    <section className="py-24 border-t border-border/50 overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:pr-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              {site.ai.kicker}
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
              {site.ai.titleBefore}
              <span className="font-serif italic text-primary">{site.ai.titleAccent}</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {site.ai.body}
            </p>

            <ul className="space-y-3">
              {[
                "Catches contradictory feedback before it reaches you",
                "References the brief, palette, or decisions you already agreed on",
                "Presents 2–3 concrete options — client picks one",
                "Delivers a clear, decided revision note to your inbox",
              ].map(point => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.5rem] bg-secondary/20 border border-border/50 overflow-hidden shadow-xl shadow-primary/5">
              {/* Window bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-background/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border/60" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono ml-2">
                    Brand_Campaign_V2 · Feedback
                  </span>
                </div>
                <span className="text-xs text-primary font-medium">Live</span>
              </div>

              {/* Chat messages */}
              <div
                ref={chatRef}
                className="px-4 py-5 space-y-3 min-h-[340px] max-h-[420px] overflow-y-auto scroll-smooth"
              >
                <AnimatePresence>
                  {FLOW.slice(0, visible).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <FlowMessage item={item} />
                    </motion.div>
                  ))}
                  {showTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status bar */}
              <div className="px-5 py-3 border-t border-border/40 bg-background/50 flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {visible >= FLOW.length ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-600 font-medium"
                    >
                      ✓ Revision note delivered to designer
                    </motion.span>
                  ) : (
                    <motion.span
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-muted-foreground"
                    >
                      {showTyping ? "EditTrack is responding…" : "Awaiting feedback"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
