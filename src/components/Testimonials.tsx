"use client";

import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  occasion: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Suthiba",
    occasion: "Wedding, March 2025",
    review:
      "The team captured my vision perfectly. Every detail was exquisite—the blouse felt like wearing art. Guests couldn't stop complimenting the craftsmanship."
  },
  {
    id: 2,
    name: "Jerina",
    occasion: "Reception Blouse, July 2025",
    review:
      "Beyond expectations. The color choice and design complemented the saree beautifully. The quality of thread work is unmatched. Would book again in a heartbeat."
  },
  {
    id: 3,
    name: "Bala Sudha",
    occasion: "Festival Wear, October 2024",
    review:
      "Incredible attention to detail. The custom embroidery was exactly as discussed, and it arrived on time. The artistry is truly special."
  }
];

export function Testimonials() {
  return (
    <section className="relative w-full bg-charcoal px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <div className="relative z-10 space-y-[clamp(80px,10vw,120px)] max-w-7xl mx-auto">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-semibold text-cream sm:text-5xl md:text-6xl">
            Words from Brides
          </h2>
          <p className="text-[clamp(16px,4vw,18px)] text-cream/70 max-w-2xl">
            Hear from those who&apos;ve trusted us with their special days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,4vw,32px)]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative rounded-[clamp(12px,2vw,20px)] border border-cream/15 bg-charcoal/40 backdrop-blur-sm p-[clamp(24px,4vw,32px)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
            >
              {/* Quote mark accent */}
              <div className="absolute -top-2 -left-2 text-[clamp(32px,8vw,64px)] font-display text-brass/20 leading-none">
                &quot;
              </div>

              <div className="relative z-10 space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-[clamp(14px,3vw,18px)] h-[clamp(14px,3vw,18px)] text-brass fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[clamp(14px,2.5vw,16px)] text-cream/85 leading-[1.65]">
                  {testimonial.review}
                </p>

                {/* Author */}
                <div className="pt-3 border-t border-cream/10 space-y-1">
                  <p className="font-semibold text-[clamp(14px,2.5vw,16px)] text-cream">
                    {testimonial.name}
                  </p>
                  <p className="text-[clamp(12px,2vw,14px)] text-brass/90">
                    {testimonial.occasion}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brass/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
