"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sectionParallax } from "@/lib/animations/gsap-sequences";

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ornamentRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !ornamentRef.current) return;
    const tween = sectionParallax(ornamentRef.current, sectionRef.current, 32, -22, 0.75);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-rust-section relative w-full px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <img
       ref={ornamentRef}
        src="/photo/logo.webp"
       alt="Brand Logo"
       className="pointer-events-none absolute right-4 top-8 z-0 w-16 opacity-90 sm:w-20 md:right-[6%] md:top-[12%] md:w-28"
       />
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 md:space-y-20">
        <motion.h2
          className="max-w-3xl font-display text-4xl text-cream sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Handcraft, Heritage, Heart
        </motion.h2>

        {/* Asymmetric two-column layout: 1fr and 0.85fr */}
        <div className="grid gap-10 md:[grid-template-columns:1fr_0.85fr] md:gap-12">
          {/* Left column: Artisan legacy (wider) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl text-gold md:text-3xl">Artisan Legacy</h3>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-cream/95 md:text-lg">
                Our collective of master embroiderers brings 200+ years of combined cultural
                knowledge to every piece.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                Training spans a decade. Each stitch is meditative precision paired with intuitive artistry.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                We collaborate only with ethical, family-run ateliers across India&apos;s embroidery heartlands.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                Every commission is a dialogue between tradition and the wearer&apos;s vision.
              </p>
            </div>
          </motion.div>

          {/* Right column: Core techniques (narrower) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <h3 className="font-display text-2xl text-gold md:text-3xl">Core Techniques</h3>
            <ul className="space-y-3">
              {[
                "Zari couching with pure gold thread",
                "Bead setting in organic patterns",
                "Silk cross-stitch for dimensional effect",
                "Velvet appliqué layering"
              ].map((technique, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-base leading-relaxed text-cream/85 micro-link"
                  data-cursor="interactive"
                >
                  <span className="text-brass font-semibold">→</span>
                  <span>{technique}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
