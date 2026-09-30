"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { joinWaitlist } from "@/actions/waitlist";

export function CtaSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setStatus("loading");
    setMessage("");

    try {
      const result = await joinWaitlist(formData);
      if (result?.error) {
        setStatus("error");
        setMessage(result.error);
      } else {
        setStatus("success");
        setMessage(result?.message || "Joined successfully!");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-secondary/40 border border-border/50 rounded-[3rem] p-8 md:p-16 text-center space-y-8 backdrop-blur-sm shadow-xl"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight text-balance">
              Stop chasing invoices. <br />
              <span className="text-muted-foreground">Start protecting your work.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the waitlist to secure early access. We&apos;re rolling out EditTrack to a select group of professional creators.
            </p>
          </div>
          
          <div className="max-w-md mx-auto mt-8">
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">{message}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  disabled={status === "loading"}
                  className="flex-1 h-14 rounded-xl px-4 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-base disabled:opacity-50"
                  required
                />
                <motion.button 
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="h-14 px-8 rounded-xl bg-foreground text-background font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors whitespace-nowrap group disabled:opacity-80"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
            
            {status === "error" && (
              <p className="text-sm text-red-500 mt-3">{message}</p>
            )}
            
            {status !== "success" && (
              <p className="text-xs text-muted-foreground pt-4">
                No spam. We will only contact you when your account is ready.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
