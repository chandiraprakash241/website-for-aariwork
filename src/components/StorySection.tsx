"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sectionParallax } from "@/lib/animations/gsap-sequences";

interface StorySection {
  title: string;
  description: string;
}

const stories: StorySection[] = [
  {
    title: "Heritage Roots",
    description:
      "Aari embroidery traces back to the Mughal courts, where master artisans created couture that told dynasties' stories through golden thread."
  },
  {
    title: "Craft as Prayer",
    description:
      "Each stitch is a meditation. Artisans spend weeks on a single blouse, imbuing it with intention, rhythm, and intimate dialogue with cloth."
  },
  {
    title: "Modern Heirloom",
    description:
      "Today's Aari celebrates tradition while embracing contemporary drapes, colors, and personal expression for the modern bride."
  }
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textureRef.current) return;
    const tween = sectionParallax(textureRef.current, sectionRef.current, 24, -28, 0.7);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-[160px] px-[12%] bg-cream">
      {/* Fabric texture overlay */}
      <div ref={textureRef} className="absolute inset-0 pointer-events-none fabric-texture opacity-30" />

      <div className="relative z-10 space-y-[120px]">
        {/* Section intro */}
        <motion.div
          className="max-w-3xl space-y-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-display text-charcoal">
            Craft as Culture
          </h2>
          <p className="text-lg leading-relaxed text-charcoal/80 max-w-2xl">
            Aari embroidery is storytelling with thread. For centuries, artisans have transformed
            silk into heritage, one stitch at a time.
          </p>
        </motion.div>

        {/* Three-column asymmetrical story grid */}
        <div className="grid gap-8 md:grid-cols-3 auto-rows-max break-grid">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              className="card-artisan"
              style={{
                "--rotate": `${-1 + index * 1.2}deg`
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: index * 0.16,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-2 h-2 bg-brass rounded-full mt-2 flex-shrink-0" />
                <h3 className="text-2xl font-display text-charcoal">{story.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-charcoal/85">{story.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Textile detail callout */}
        <motion.div
          className="mt-[120px] p-8 rounded-4xl border border-taupe/50 bg-gold/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <p className="overline text-charcoal/70 mb-3">Fabric Heritage</p>
          <h4 className="text-2xl font-display text-charcoal mb-2">
            Each silk tells a different story
          </h4>
          <p className="text-base leading-relaxed text-charcoal/85">
            From raw silk's subtle texture to velvet's regal density, the choice of foundation
            fabric shapes how light dances across embroidery. This decision is as important as the
            stitches themselves.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
