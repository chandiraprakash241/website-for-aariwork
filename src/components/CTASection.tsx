"use client";

import { motion } from "framer-motion";
import { tapPress } from "@/lib/animations/micro-interactions";

export function CTASection() {
  return (
    <section className="relative w-full bg-cream px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <motion.div
        className="mx-auto max-w-3xl space-y-6 text-center md:space-y-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-4xl text-charcoal sm:text-5xl md:text-6xl">
          Ready to commission your heirloom?
        </h2>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-charcoal/80 md:text-lg">
          Begin a conversation with our artisans. Share your vision, and we&apos;ll craft a
          masterpiece tailored to your moment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <motion.button className="btn-primary w-full sm:w-auto" whileTap={tapPress} data-cursor="interactive">
            Inquire About Your Blouse
          </motion.button>
          <motion.button className="btn-secondary w-full sm:w-auto" whileTap={tapPress} data-cursor="interactive">
            View Collaboration Process
          </motion.button>
        </div>

        <div className="pt-8 border-t border-taupe/30">
          <p className="text-sm text-charcoal/60 uppercase tracking-wider">Contact us directly</p>
          <a
            href="mailto:hello@aariwork.com"
            className="text-lg font-semibold text-brass hover:text-rust transition-colors duration-300 micro-link"
            data-cursor="interactive"
          >
            hello@aariwork.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}
