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
    <section ref={sectionRef} className="bg-rust-section relative w-full py-[160px] px-[12%]">
      <img
       ref={ornamentRef}
        src="/photo/logo.webp"
       alt="Brand Logo"
       className="pointer-events-none absolute right-[6%] top-[12%] z-0 w-[120px] opacity-90"
       />
      <div className="relative z-10 space-y-[80px]">
        <motion.h2
          className="text-5xl md:text-6xl font-display text-cream max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Handcraft, Heritage, Heart
        </motion.h2>

        {/* Asymmetric two-column layout: 1fr and 0.85fr */}
        <div className="grid gap-12 md:[grid-template-columns:1fr_0.85fr]">
          {/* Left column: Artisan legacy (wider) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-display text-gold">Artisan Legacy</h3>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-cream/95">
                Our collective of master embroiderers brings 200+ years of combined cultural
                knowledge to every piece.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                Training spans a decade. Each stitch is meditative precision paired with intuitive artistry.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                We collaborate only with ethical, family-run ateliers across India's embroidery heartlands.
              </p>
              <p className="text-base leading-relaxed text-cream/85">
                Every commission is a dialogue between tradition and the wearer's vision.
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
            <h3 className="text-3xl font-display text-gold">Core Techniques</h3>
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
