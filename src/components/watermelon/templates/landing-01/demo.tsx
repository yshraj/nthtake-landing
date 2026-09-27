"use client";

import Navbar from './landing/navbar';
import Hero from './landing/hero';
import Stats from './landing/stats';
import Features from './landing/features';
import HoldToUnlock from './landing/hold-to-unlock';
import AnimatedBento from './landing/animated-bento';
import ComponentsBento from './landing/component-bento';
import TemplateBento from './landing/template-bento';
import Testimonial from './landing/testimonial';
import Pricing from './landing/pricing';
import Questions from './landing/questions';
import Closer from './landing/closer';
import Footer from './landing/footer';
import { Loader } from './landing/loader';
import { LoaderProvider } from './landing/loader-context';

export default function Landing01Demo() {
  return (
    <LoaderProvider>
      <main className="dark min-h-dvh overflow-x-hidden bg-[#101010]">
        <Loader />
        <Navbar />
        <Hero />
        <Stats />
        <HoldToUnlock />
        <Features />
        <ComponentsBento />
        <TemplateBento />
        <AnimatedBento />
        <Testimonial />
        <Pricing />
        <Questions />
        <Closer />
        <Footer />
      </main>
    </LoaderProvider>
  );
}
