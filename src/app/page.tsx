"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { ProductShowcase } from "@/components/product-showcase";
import { TrustSection } from "@/components/trust-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { MockupPayLock, MockupSidebar, MockupVideoPlayer, MockupWorkspace } from "@/components/product-mockups";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      <Navbar />

      <main className="pt-52 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-[80px] font-heading font-medium tracking-tight text-foreground leading-[1.1]"
            >
              Control <span className="font-serif italic text-primary">delivery, review</span>, and payment in one workflow.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-muted-foreground max-w-xl mx-auto"
            >
              Send a watermarked preview. Your client reviews, gives feedback, approves, and pays. The clean files unlock instantly. No client account needed.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md mx-auto sm:max-w-none"
            >
              <motion.button 
                onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background px-8 py-4 rounded-full text-lg font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg group"
              >
                Join the Waitlist
                <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-background/30 transition-colors">
                  <motion.svg 
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </motion.svg>
                </div>
              </motion.button>
            </motion.div>
          </section>

          {/* Supporting Hero Visual */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 w-full max-w-5xl mx-auto relative perspective-1000"
          >
            {/* Main App Workspace */}
            <div className="relative z-10">
               <MockupWorkspace title="Acme Corp Rebrand — Final Review">
                 <div className="flex flex-col lg:flex-row h-auto lg:h-[500px]">
                   <MockupVideoPlayer />
                   <MockupSidebar className="hidden sm:flex" />
                 </div>
               </MockupWorkspace>
            </div>

            {/* Floating PayLock Checkout overlapping the workspace */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 z-20 hidden md:block scale-90 lg:scale-100"
            >
               <MockupPayLock />
            </motion.div>
            
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          </motion.section>

          {/* Core Container Structure for sections */}
          <section id="features" className="mt-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-4 mb-24"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">How it works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A seamless experience for you and your clients.</p>
            </motion.div>
            
            <div id="workflow">
              <ProductShowcase />
            </div>
          </section>
        </div>

        {/* Phase 4 Sections */}
        <TrustSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  );
}
