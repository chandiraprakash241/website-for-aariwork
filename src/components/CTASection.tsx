"use client";

import { motion } from "framer-motion";
import { tapPress } from "@/lib/animations/micro-interactions";

export function CTASection() {
  return (
    <section className="relative w-full py-[160px] px-[12%] bg-cream">
      <motion.div
        className="max-w-3xl mx-auto space-y-8 text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-display text-charcoal">
          Ready to commission your heirloom?
        </h2>

        <p className="text-lg leading-relaxed text-charcoal/80 max-w-2xl mx-auto">
          Begin a conversation with our artisans. Share your vision, and we&apos;ll craft a
          masterpiece tailored to your moment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <motion.button className="btn-primary" whileTap={tapPress} data-cursor="interactive">
            Inquire About Your Blouse
          </motion.button>
          <motion.button className="btn-secondary" whileTap={tapPress} data-cursor="interactive">
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
