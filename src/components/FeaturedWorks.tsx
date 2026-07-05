"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { hoverLift, tapPress } from "@/lib/animations/micro-interactions";

const ALL_MASTERWORKS = [
  "/photo/master1.png",
  "/photo/master2.jpeg",
  "/photo/master3.jpeg",
  "/photo/attachments (2)/1000223252.jpg",
  "/photo/attachments (2)/1000244438.png",
  "/photo/attachments (2)/1000244439.png",
  "/photo/attachments (2)/1000249139.webp",
  "/photo/attachments (2)/1000249140.webp",
  "/photo/attachments (2)/1000249165.png",
  "/photo/attachments (2)/1000249166.png",
  "/photo/attachments (2)/1000249167.png",
  "/photo/attachments (2)/1000249168.png",
  "/photo/attachments (2)/1000249183.png",
  "/photo/attachments (2)/1000270569.jpg"
];

export function FeaturedWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const index = Math.round(scrollLeft / (clientWidth * 0.82));
    setActiveIndex(Math.max(0, Math.min(index, ALL_MASTERWORKS.length - 1)));
  };

  return (
    <section id="artisan-masterwork" className="relative w-full bg-cream px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 md:space-y-24">
        <motion.h2
          className="micro-link max-w-2xl font-display text-4xl text-charcoal sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Artisan Masterworks
        </motion.h2>

        {/* Mobile horizontal swipeable carousel */}
        <div className="relative md:hidden">
          <div 
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {ALL_MASTERWORKS.map((src, index) => (
              <motion.div
                key={src}
                className="w-[82vw] flex-shrink-0 snap-center card micro-card overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={hoverLift}
                whileTap={tapPress}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                data-cursor="interactive"
              >
                <div className="micro-card-inner w-full h-[400px]">
                  <img
                    src={src}
                    alt={`Masterwork ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Pagination Progress */}
          <div className="flex flex-col items-center gap-1.5 mt-4">
            <span className="font-display text-sm font-semibold tracking-widest text-brass">
              {String(activeIndex + 1).padStart(2, "0")} / {String(ALL_MASTERWORKS.length).padStart(2, "0")}
            </span>
            <div className="w-24 h-0.5 bg-charcoal/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brass transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / ALL_MASTERWORKS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Asymmetrical desktop grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ALL_MASTERWORKS.map((src, index) => {
            // Alternating rotation angles to create an editorial, hand-crafted feel
            const rotations = [-1.5, 0.8, -0.5, 1.2, -1, 1.5, -0.8, 0.5, -1.2, 0.6, -0.6, 1, -1.5, 0.8];
            const rotation = rotations[index % rotations.length];
            const hoverRotation = rotation * 1.5;
            
            // Alternating heights to create a premium masonry-like grid
            const heights = ["h-[400px]", "h-[320px]", "h-[450px]", "h-[360px]"];
            const heightClass = heights[index % heights.length];

            return (
              <motion.div
                key={src}
                className="card micro-card rounded-2xl overflow-hidden shadow-lg"
                style={{ rotate: rotation }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, rotate: hoverRotation, scale: 1.02 }}
                whileTap={tapPress}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                data-cursor="interactive"
              >
                <div className={`w-full ${heightClass} micro-card-inner`}>
                  <img
                    src={src}
                    alt={`Masterwork ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
