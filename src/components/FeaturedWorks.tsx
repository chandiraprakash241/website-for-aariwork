"use client";

import { motion } from "framer-motion";
import { hoverLift, tapPress } from "@/lib/animations/micro-interactions";

export function FeaturedWorks() {
  return (
    <section className="relative w-full py-[160px] px-[12%] bg-cream">
      <div className="relative z-10 space-y-[120px]">
        <motion.h2
          className="text-5xl md:text-6xl font-display text-charcoal max-w-2xl micro-link"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Artisan Masterworks
        </motion.h2>

        {/* Asymmetrical broken grid layout */}
        <div className="relative h-[800px] overflow-hidden">
          {/* Card 1: Large, top-left */}
          <motion.div
            className="absolute top-0 left-0 w-[48%] h-[350px] card micro-card rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ ...hoverLift, rotate: -0.8 }}
            whileTap={tapPress}
            transition={{ duration: 0.8 }}
            data-cursor="interactive"
          >
            <div className="w-full h-full micro-card-inner">
              <img
                src="/photo/master1.png"
                alt="Masterwork 1"
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Card 2: Medium, center with offset */}
          <motion.div
            className="absolute top-[240px] left-[40%] w-[40%] h-[320px] card micro-card rounded-2xl overflow-hidden shadow-lg rotate-subtle"
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            whileHover={{ ...hoverLift, rotate: -2.2 }}
            whileTap={tapPress}
            transition={{ delay: 0.15, duration: 0.8 }}
            data-cursor="interactive"
          >
            <div className="w-full h-full micro-card-inner">
              <img
                src="/photo/master2.jpeg"
                alt="Masterwork 2"
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Card 3: Small, right with top offset */}
          <motion.div
            className="absolute top-[60px] right-0 w-[36%] h-[280px] card micro-card rounded-2xl overflow-hidden shadow-lg rotate-subtle-cw"
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
            whileHover={{ ...hoverLift, rotate: 2.3 }}
            whileTap={tapPress}
            transition={{ delay: 0.3, duration: 0.8 }}
            data-cursor="interactive"
          >
            <div className="w-full h-full micro-card-inner">
              <img
                src="/photo/master3.jpeg"
                alt="Masterwork 3"
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
