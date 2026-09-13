"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Variants,
} from "motion/react";

export interface Slide {
  id: number;
  img: string;
}

interface CarouselSliderProps {
  slides?: Slide[];
}

const DEFAULT_SLIDES: Slide[] = [
  { id: 1, img: "/takes/01-interview.png" },
  { id: 2, img: "/takes/02-macro.png" },
  { id: 3, img: "/takes/03-night.png" },
  { id: 4, img: "/takes/04-motion.png" },
  { id: 5, img: "/takes/05-studio.png" },
];

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    scale: 0.94,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -180 : 180,
    scale: 0.94,
    opacity: 0,
    zIndex: 0,
  }),
};

export const CarouselSlider: React.FC<CarouselSliderProps> = ({
  slides = DEFAULT_SLIDES,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-6, 6]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) paginate(1);
    else if (info.offset.x > 80) paginate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative aspect-video w-56 sm:w-64 flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 280, damping: 28 },
              scale: { duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 overflow-hidden border border-white/15 bg-neutral-950"
          >
            <img
              src={slides[index].img}
              alt=""
              className="object-cover w-full h-full pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Take ${i + 1}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={i === index ? "bg-primary h-1.5 w-5" : "h-1.5 w-5 bg-white/20"}
          />
        ))}
      </div>
    </div>
  );
};
