"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  letterReveal,
  fadeInUp,
  fadeInScale,
  buttonHover,
  buttonSecondaryHover,
  scrollPulse
} from "@/lib/animations/framer-presets";
import { animateThreadPath, floatingMotion } from "@/lib/animations/gsap-sequences";

export function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const threadPath1 = useRef<SVGPathElement>(null);
  const threadPath2 = useRef<SVGPathElement>(null);
  const threadPath3 = useRef<SVGPathElement>(null);

  const headlineLines = ["Threads of", "Heritage"];

  useEffect(() => {
    // Animate SVG thread paths with staggered delays
    if (threadPath1.current) animateThreadPath(threadPath1.current, 0.2);
    if (threadPath2.current) animateThreadPath(threadPath2.current, 0.4);
    if (threadPath3.current) animateThreadPath(threadPath3.current, 0.6);

    // Add floating motion to visual container
    if (visualRef.current) {
      floatingMotion(visualRef.current, 0.8);
    }
  }, []);

  return (
    <section className="bg-hero relative z-10 min-h-screen w-full overflow-hidden px-4 py-10 sm:px-6 md:px-12 md:py-20">
      {/* Floating thread particles SVG background */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated thread trails */}
        <path
          ref={threadPath1}
          d="M 100 200 Q 300 250 500 180 T 900 220"
          stroke="#c4963d"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />

        <path
          ref={threadPath2}
          d="M 150 400 Q 400 350 650 400 T 1050 380"
          stroke="#f0e6c8"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
          filter="url(#glow)"
        />

        <path
          ref={threadPath3}
          d="M 200 600 L 400 550 Q 600 500 800 580 L 950 540"
          stroke="#c4963d"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
          filter="url(#glow)"
        />
      </svg>

      {/* Main content container with responsive asymmetrical layout */}
      <div className="relative z-30 mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl flex-col gap-10 pt-16 md:min-h-[calc(100vh-220px)] md:flex-row md:items-center md:gap-12 md:pt-0">
        {/* Left text block */}
        <motion.div
          className="relative z-10 space-y-6 md:w-1/2 md:space-y-[clamp(20px,4vw,24px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand identity block */}
          <motion.div
            className="relative z-10 mb-6 w-fit"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/15 bg-oxblood/25 px-3 py-1.5 backdrop-blur-sm transition duration-300 hover:bg-oxblood/35 hover:border-gold/30 sm:gap-3 sm:px-4 sm:py-2 md:gap-4 md:px-5 md:py-3"
              data-cursor="interactive"
              aria-label="Sewzy Bee"
            >
              <img
                src="/photo/logo.webp"
                alt="Sewzy Bee logo"
                className="h-auto w-[80%] max-w-xs object-contain logo-glow sm:w-14 md:w-[80%] md:max-w-md"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/photo/logo.png";
                }}
              />
              <span className="font-display text-2xl font-semibold leading-tight tracking-[0.045em] text-cream/90 transition duration-300 group-hover:text-gold sm:text-3xl md:text-[clamp(20px,2.8vw,34px)]">
                Sewzy Bee
              </span>
            </a>
          </motion.div>

          {/* Main Headline - controlled two-line break with staggered reveal */}
          <h1 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-cream sm:text-4xl md:text-6xl md:leading-[1.08]">
            {headlineLines.map((line, lineIndex) => {
              const delayOffset =
                headlineLines.slice(0, lineIndex).join("").length + lineIndex * 2;

              return (
                <span key={line} className="block break-words sm:whitespace-nowrap">
                  {line.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${line}-${letter}-${letterIndex}`}
                      custom={delayOffset + letterIndex}
                      variants={letterReveal}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-xl text-sm leading-relaxed text-cream/95 sm:text-base md:text-[clamp(14px,3.5vw,18px)]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            Aari is not just embroidery&mdash;it&apos;s storytelling with thread, a conversation between artist
            and fiber.
          </motion.p>

          {/* CTA Buttons - responsive and full-width on mobile */}
          <motion.div
            className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-[clamp(12px,2.5vw,16px)] sm:pt-[clamp(16px,3vw,24px)]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <motion.a
              href="mailto:hello@aariwork.com?subject=Start%20My%20Blouse%20Design"
              className="btn-primary w-full sm:w-auto"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              data-cursor="interactive"
            >
              Start Your Blouse
            </motion.a>

            <motion.a
              href="#portfolio"
              className="btn-secondary w-full sm:w-auto"
              variants={buttonSecondaryHover}
              whileHover="hover"
              whileTap="tap"
              data-cursor="interactive"
            >
              Explore Designs
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right visual - stacked on mobile, split column on desktop */}
        <motion.div
          ref={visualRef}
          className="relative z-10 w-full md:w-1/2 md:-translate-y-[40px] offset-right"
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="relative h-[320px] overflow-hidden rounded-[24px] border border-cream/20 bg-gradient-to-br from-rust/20 to-gold/10 sm:h-[380px] md:h-[520px]">
            {/* Embroidery pattern simulation */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 520"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="embroidery-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="6" fill="#c4963d" opacity="0.3" />
                  <path
                    d="M 5 20 Q 15 10 25 20 Q 20 28 5 20"
                    stroke="#f0e6c8"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                </pattern>
              </defs>

              {/* Background pattern */}
              <rect width="400" height="520" fill="url(#embroidery-pattern)" />

              {/* Decorative embroidery motif - Peacock inspired */}
              <g transform="translate(200, 260)">
                {/* Tail feathers */}
                <motion.path
                  d="M 0 0 Q 60 -80 100 -120"
                  stroke="#c4963d"
                  strokeWidth="3"
                  fill="none"
                  initial={{ strokeDashoffset: 200, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 0.8 }}
                  transition={{ delay: 1.2, duration: 1.4 }}
                />
                <motion.path
                  d="M 0 0 Q -60 -80 -100 -120"
                  stroke="#c4963d"
                  strokeWidth="3"
                  fill="none"
                  initial={{ strokeDashoffset: 200, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 0.8 }}
                  transition={{ delay: 1.2, duration: 1.4 }}
                />

                {/* Center motif */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="none"
                  stroke="#f0e6c8"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                />
                <motion.circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="#c4963d"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ delay: 2, duration: 0.5 }}
                />
              </g>
            </svg>

            {/* Floating label */}
            <motion.div
              className="absolute bottom-4 left-4 rounded-xl border border-cream/30 bg-oxblood/40 px-3 py-2 backdrop-blur sm:bottom-6 sm:left-6 sm:px-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-wide text-gold sm:text-sm">Macro Aari stitch</p>
              <p className="text-[11px] text-cream/75 sm:text-xs">Hand-rendered embroidery art</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
        animate={scrollPulse.animate}
        transition={scrollPulse.transition}
      >
        <p className="text-xs text-cream/60 uppercase tracking-wider">Scroll to explore</p>
        <svg className="w-4 h-4 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent via-oxblood/45 to-cream/95" />
    </section>
  );
}
