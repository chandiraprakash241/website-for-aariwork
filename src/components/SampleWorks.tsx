"use client";

import { motion } from "framer-motion";
import { hoverLift, tapPress } from "@/lib/animations/micro-interactions";

interface Work {
  id: number;
  name: string;
  style: "bridal" | "reception" | "festive";
  timeWeeks: number;
  startingPrice: string;
  description: string;
}

const sampleWorks: Work[] = [
  {
    id: 1,
    name: "Maharaja Gold",
    style: "bridal",
    timeWeeks: 1,
    startingPrice: "₹10000",
    description: "Heavy gota and zari work with peacock motif"
  },
  {
    id: 2,
    name: "Rose Whisper",
    style: "reception",
    timeWeeks: 1,
    startingPrice: "₹7000",
    description: "Delicate floral embroidery with bead detailing"
  },
  {
    id: 3,
    name: "Emerald Dreams",
    style: "festive",
    timeWeeks: 1,
    startingPrice: "₹3000",
    description: "Contemporary geometric patterns with silk thread"
  }
];

export function SampleWorks() {
  return (
    <section className="relative w-full bg-cream px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <div className="relative z-10 space-y-[clamp(80px,10vw,120px)] max-w-7xl mx-auto">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(32px,7vw,64px)] font-display text-charcoal font-semibold">
            Our Creations
          </h2>
          <p className="text-[clamp(16px,4vw,18px)] text-charcoal/75 max-w-2xl">
            Each piece tells a story of artistry, patience, and love—handcrafted by master
            embroiderers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,4vw,32px)]">
          {sampleWorks.map((work, index) => (
            <motion.div
              key={work.id}
              className="micro-card group relative rounded-[clamp(12px,2vw,20px)] border border-charcoal/10 bg-white p-[clamp(20px,4vw,28px)] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={hoverLift}
              whileTap={tapPress}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              data-cursor="interactive"
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${
                    work.style === "bridal"
                      ? "rgba(196, 150, 61, 0.08)"
                      : work.style === "reception"
                        ? "rgba(139, 58, 58, 0.08)"
                        : "rgba(212, 196, 176, 0.08)"
                  }, transparent)`
                }}
              />

              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-[clamp(18px,3.5vw,24px)] font-display text-charcoal font-semibold">
                        {work.name}
                      </h3>
                      <p className="text-[clamp(11px,2vw,12px)] text-brass uppercase tracking-wider mt-1">
                        {work.style}
                      </p>
                    </div>
                  </div>
                  <p className="text-[clamp(14px,2.5vw,16px)] text-charcoal/70 leading-relaxed">
                    {work.description}
                  </p>
                </div>

                {/* Details */}
                <div className="border-t border-charcoal/10 pt-4 space-y-3">
                  <div className="flex justify-between items-center text-[clamp(12px,2vw,14px)]">
                    <span className="text-charcoal/60">Time</span>
                    <span className="font-semibold text-charcoal">
                      {work.timeWeeks}–{work.timeWeeks + 1} weeks
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[clamp(12px,2vw,14px)]">
                    <span className="text-charcoal/60">Starting from</span>
                    <span className="font-display text-[clamp(16px,3vw,18px)] font-semibold text-brass">
                      {work.startingPrice}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="mailto:muthusowmiya001@gmail.com?subject=Inquiry%20about%20design"
                  className="inline-block mt-3 text-[clamp(12px,2vw,14px)] text-brass hover:text-rust transition-colors duration-300 micro-link font-semibold"
                >
                  Inquire now →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
