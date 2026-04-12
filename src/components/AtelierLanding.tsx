"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SignatureField } from "@/components/SignatureField";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export function AtelierLanding() {
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!panelRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".atelier-card",
        { opacity: 0, y: 42, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.16,
          delay: 0.2
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-mesh text-ink">
      <div className="pointer-events-none absolute inset-0 opacity-35 atelier-fabric-texture" />

      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute left-[-10%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute bottom-[-24%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-signal/15 blur-[96px]" />
      </div>

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 pb-16 pt-24 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-10 md:px-10 md:pb-20 md:pt-28">
        <div ref={panelRef} className="space-y-7">
          <motion.p
            className="atelier-card inline-flex rounded-full border border-ink/20 bg-pearl/80 px-4 py-2 text-xs uppercase tracking-[0.24em]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
          >
            The Heirloom Atelier
          </motion.p>

          <h1 className="atelier-card font-display text-4xl leading-[0.98] sm:text-5xl md:text-7xl">
            Couture Aari blouses, hand-embroidered for your moment.
          </h1>

          <p className="atelier-card max-w-2xl text-base leading-relaxed text-clove/90 md:text-lg">
            Enter a private embroidery salon where every neckline, sleeve curve, and motif
            placement is tailored to your saree and celebration. Designed with heritage detail,
            measured for comfort, and finished by skilled Aari artisans.
          </p>

          <div className="atelier-card flex flex-wrap items-center gap-4 pt-2">
            <button className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas shadow-aura transition hover:-translate-y-0.5 hover:bg-ink/90">
              Begin Your Blouse
            </button>
            <button className="rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-pearl/70">
              View Bridal Editions
            </button>
          </div>

          <motion.div {...fadeUp} className="atelier-card grid grid-cols-1 gap-3 pt-6 sm:grid-cols-3">
            {[
              "45-120 hours handwork",
              "Personal fitting guidance",
              "Occasion-matched motifs"
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-ink/15 bg-pearl/70 p-4 text-center backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-clove">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="relative h-auto overflow-hidden rounded-[2rem] border border-ink/15 bg-pearl/70 p-5 shadow-aura backdrop-blur-sm md:h-[560px] md:p-6"
        >
          <h3 className="font-display text-2xl text-ink md:text-3xl">Craftsmanship Board</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-clove/90 md:text-base">
            Choose a blouse foundation and pair it with delicate zari trails, bead accents,
            and bridal motifs crafted to complement your drape.
          </p>

          <div className="mt-7 grid gap-4">
            {[
              { name: "Raw Silk - Ivory Gold", note: "Temple vine neckline" },
              { name: "Velvet - Maroon Ruby", note: "Peacock sleeve border" },
              { name: "Tissue - Rose Beige", note: "Back motif medallion" }
            ].map((swatch) => (
              <div
                key={swatch.name}
                className="rounded-2xl border border-ink/15 bg-canvas/75 p-4"
              >
                <p className="font-display text-xl text-ink">{swatch.name}</p>
                <p className="text-sm text-clove/85">{swatch.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 to-signal/10 px-4 py-3 text-sm text-clove">
            Bridal delivery includes design preview, measurement check, and final finishing notes.
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-10 md:pb-16">
        <motion.div
          {...fadeUp}
          className="rounded-[2.2rem] border border-ink/15 bg-pearl/70 p-6 shadow-aura backdrop-blur-md md:p-10"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl">Design Your Blouse</h2>
            <p className="max-w-xl text-sm text-clove/90 md:text-base">
              Shape your neckline, sleeve length, and embroidery intensity with live garment
              preview before placing your order.
            </p>
          </div>
          <SignatureField />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:px-10">
        <motion.div
          {...fadeUp}
          className="grid gap-4 rounded-[2rem] border border-ink/15 bg-pearl/65 p-6 shadow-aura md:grid-cols-3 md:p-8"
        >
          {[
            {
              title: "1. Enter the atelier",
              text: "Share your occasion and saree tone to begin your custom blouse direction."
            },
            {
              title: "2. Refine the design",
              text: "Adjust neckline shape, sleeve style, motif density, and thread finish."
            },
            {
              title: "3. Confirm your order",
              text: "Lock your measurements, review timeline, and reserve artisan hours."
            }
          ].map((step) => (
            <article key={step.title} className="rounded-2xl border border-ink/10 bg-canvas/70 p-5">
              <h3 className="font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-clove/90">{step.text}</p>
            </article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
