"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, CreditCard, Lock, Play, Shield, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MockupWorkspace({ children, title = "Website Redesign — Client Review", className = "" }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <div className={`w-full rounded-[1.5rem] md:rounded-[2rem] bg-secondary/30 border border-border/50 p-2 md:p-4 overflow-hidden shadow-2xl shadow-primary/5 ${className}`}>
      <div className="w-full bg-background rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
        {/* Workspace Header */}
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
        {/* Workspace Body */}
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
  return (
    <div className={`flex-1 bg-muted/30 relative flex flex-col min-h-[300px] h-full ${className}`}>
      <div className="flex-1 relative m-2 md:m-4 rounded-lg md:rounded-xl bg-muted overflow-hidden group border border-border/50 shadow-sm">
        {/* Fake Media */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" alt="Video frame mockup" />
        
        {/* Annotation Bubble */}
        {showAnnotation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-[35%] left-[25%] md:top-[40%] md:left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
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

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="text-2xl md:text-4xl font-bold uppercase tracking-widest rotate-[-30deg]">EditTrack Preview</div>
        </div>
      </div>
      {/* Controls */}
      <div className="h-12 md:h-14 border-t border-border/50 flex items-center px-4 gap-4 bg-background shrink-0">
        <Play className="w-4 h-4 text-muted-foreground fill-current" />
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "33%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-primary rounded-full relative"
          />
        </div>
        <div className="text-[10px] md:text-xs text-muted-foreground font-mono">0:24 / 1:12</div>
      </div>
    </div>
  );
}

export function MockupSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background flex flex-col h-full shrink-0 ${className}`}>
      <div className="p-3 md:p-4 border-b border-border flex gap-2 shrink-0">
        <button className="flex-1 text-sm font-medium pb-2 border-b-2 border-primary text-foreground">Comments</button>
        <button className="flex-1 text-sm font-medium pb-2 text-muted-foreground border-b-2 border-transparent transition-colors hover:text-foreground">Versions</button>
      </div>
      
      <div className="p-3 md:p-4 space-y-4 flex-1 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 opacity-60"
        >
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-border shrink-0">V1</div>
          <div>
            <div className="text-sm font-medium line-through decoration-muted-foreground/50">Initial Draft</div>
            <div className="text-xs text-muted-foreground">5 comments resolved</div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3"
        >
          <motion.div 
            animate={{ boxShadow: ["0 0 0 0 rgba(198, 90, 50, 0.2)", "0 0 0 6px rgba(198, 90, 50, 0)", "0 0 0 0 rgba(198, 90, 50, 0)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0"
          >
            V2
          </motion.div>
          <div>
            <div className="text-sm font-medium">Revised Edit</div>
            <div className="text-xs text-primary font-medium mt-1">1 active comment</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function MockupPayLock({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Auto-cycle the animation state for presentation purposes when it comes into view
    const handleScroll = () => {
      // Just a simple automatic cycle that restarts occasionally to show the interaction
      if (state === "idle" && Math.random() > 0.99) { // Trigger randomly as user looks at it
        setState("processing");
        timeout = setTimeout(() => {
          setState("success");
          setTimeout(() => setState("idle"), 3000);
        }, 1500);
      }
    };
    
    // Instead of tying to scroll which might be too often, just cycle it slowly
    const interval = setInterval(() => {
       if (state === "idle") {
         setState("processing");
         timeout = setTimeout(() => {
           setState("success");
           setTimeout(() => setState("idle"), 4000);
         }, 1500);
       }
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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
                onClick={() => {
                  setState("processing");
                  setTimeout(() => {
                    setState("success");
                    setTimeout(() => setState("idle"), 3000);
                  }, 1500);
                }}
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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-sm bg-background rounded-2xl shadow-xl border border-border/50 p-6 space-y-6 relative z-10 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <div className="font-medium text-foreground">Secure Review Link</div>
          <div className="text-sm text-muted-foreground">Expires in 7 days</div>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between border border-border/50 group">
        <span className="text-sm text-muted-foreground truncate pr-4 transition-colors group-hover:text-foreground">edittrack.com/r/xyz123...</span>
        <button className="text-primary font-medium text-sm whitespace-nowrap hover:opacity-80 transition-opacity">Copy Link</button>
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
