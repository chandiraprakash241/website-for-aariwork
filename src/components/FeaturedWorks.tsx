"use client";

import { motion } from "framer-motion";
import { hoverLift, tapPress } from "@/lib/animations/micro-interactions";

export function FeaturedWorks() {
  return (
    <section className="relative w-full bg-cream px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 md:space-y-24">
        <motion.h2
          className="micro-link max-w-2xl font-display text-4xl text-charcoal sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Artisan Masterworks
        </motion.h2>

        {/* Mobile-first stacked layout */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {["/photo/master1.png", "/photo/master2.jpeg", "/photo/master3.jpeg"].map((src, index) => (
            <motion.div
              key={src}
              className="card micro-card overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={hoverLift}
              whileTap={tapPress}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              data-cursor="interactive"
            >
              <div className="micro-card-inner w-full">
                <img
                  src={src}
                  alt={`Masterwork ${index + 1}`}
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Asymmetrical desktop layout */}
        <div className="relative hidden h-[800px] overflow-hidden md:block">
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
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
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
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
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
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
