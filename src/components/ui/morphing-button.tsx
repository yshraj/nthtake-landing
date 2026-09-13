"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';

interface MorphingButtonProps {
  buttonText?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  buttonText = 'Notify Me',
  placeholder = 'Email',
  onSubmit,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.stopPropagation();
      setIsExpanded(true);
    } else if (email) {
      void Promise.resolve(onSubmit?.(email)).then(() => {
        setIsExpanded(false);
        setEmail('');
      });
    }
  };

  const springConfig = {
    type: 'spring',
    stiffness: 240,
    damping: 18,
    mass: 1.1,
  } as const;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 p-8 transition-colors duration-500">
      <div
        className={`flex items-center justify-center will-change-transform ${className}`}
      >
        <motion.div
          ref={containerRef}
          layout
          transition={springConfig}
          style={{ borderRadius: 0 }}
          className={`relative flex items-center overflow-hidden border border-white/15 transition-colors duration-300 ${
            isExpanded
              ? "w-84 bg-black/60 p-1"
              : "w-auto bg-black/40 p-0"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {isExpanded && (
              <motion.div
                key="input-container"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ...springConfig }}
                className="flex flex-1 items-center px-4"
              >
                <motion.input
                  ref={inputRef}
                  layout
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-xl font-semibold text-[#18181B] placeholder-[#A1A1AA] transition-colors outline-none dark:text-[#fefefe] dark:placeholder-[#B2B2B2]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && email) {
                      void Promise.resolve(onSubmit?.(email)).then(() => {
                        setIsExpanded(false);
                        setEmail('');
                      });
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            layout
            onClick={handleToggle}
            transition={springConfig}
            className={`relative flex items-center justify-center gap-3 font-bold whitespace-nowrap transition-colors duration-300 ${
              isExpanded
                ? "bg-primary text-primary-foreground px-5 py-3 hover:bg-primary/90"
                : "bg-primary text-primary-foreground px-6 py-4 hover:bg-primary/90"
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded && (
                <motion.span
                  key="bell-icon"
                  layout
                  className="origin-right"
                  initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                  transition={springConfig}
                >
                  <Bell className="h-5 w-5 text-primary-foreground" />
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span layout="position" className="text-xl tracking-tight">
              {buttonText}
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
