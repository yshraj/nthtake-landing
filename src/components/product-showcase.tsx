"use client";

import { Link2, Unlock } from "lucide-react";
import { motion } from "motion/react";
import { MockupMagicLink, MockupPayLock, MockupSidebar, MockupVideoPlayer, MockupWorkspace } from "./product-mockups";

export function ProductShowcase() {
  return (
    <div className="w-full space-y-32">
      {/* 1. Secure Sharing & No Account Needed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
             <Link2 className="w-4 h-4" />
             Frictionless Access
           </div>
           <h3 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
             Share securely. <br />
             <span className="text-muted-foreground">No client signup required.</span>
           </h3>
           <p className="text-lg text-muted-foreground">
             Generate a unique, expiring magic link. Your client clicks it and goes straight to the review room. Their privacy is protected, and they never have to remember another password.
           </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[400px] lg:min-h-[500px] py-12 lg:py-16 rounded-3xl bg-secondary/50 border border-border/50 overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-inner"
        >
           <MockupMagicLink className="relative z-10" />
           
           {/* Decorative background elements */}
           <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
           <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
        </motion.div>
      </section>

      {/* 2. Version History & Feedback Annotation */}
      <section className="flex flex-col gap-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <h3 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            Pinpoint feedback. <br />
            <span className="text-muted-foreground">Keep versions organized.</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Clients can point, click, and comment directly on the frame. Every revision round is tracked automatically.
          </p>
        </motion.div>

        {/* Mockup of Review Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MockupWorkspace title="Social Campaign — Client Review" className="mt-8">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[500px]">
               <MockupVideoPlayer />
               <MockupSidebar />
            </div>
          </MockupWorkspace>
        </motion.div>
      </section>

      {/* 3 & 4. PayLock & Approval */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 relative min-h-[400px] lg:min-h-[500px] py-12 lg:py-16 rounded-3xl bg-secondary/50 border border-border/50 overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-inner"
        >
           {/* Mockup of PayLock screen */}
           <MockupPayLock className="relative z-10" />

           {/* Decorative background elements */}
           <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 space-y-6"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
             <Unlock className="w-4 h-4" />
             PayLock Gateway
           </div>
           <h3 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
             Get paid before <br />
             <span className="text-muted-foreground">they get the files.</span>
           </h3>
           <p className="text-lg text-muted-foreground">
             No more chasing invoices. Once the client approves the final version, they are automatically prompted to pay the remaining balance through a secure gateway. 
           </p>
           <p className="text-lg text-muted-foreground">
             The clean, unwatermarked source files are instantly unlocked and delivered the second payment succeeds.
           </p>
        </motion.div>
      </section>
    </div>
  );
}
