/**
 * ANIMATION STRATEGY & BEST PRACTICES
 * 
 * This file explains the animation architecture and how to extend it
 */

/**
 * ============================================
 * 1. ANIMATION ORGANIZATION
 * ============================================
 * 
 * Files and their purposes:
 * 
 * /lib/animations/
 *   ├── easing.ts           → Custom easing curves (editorial, smooth, snappy)
 *   ├── framer-presets.ts   → Reusable Framer Motion variants
 *   └── gsap-sequences.ts   → GSAP timeline definitions and helpers
 * 
 * /lib/hooks/
 *   ├── useMotionTrack.ts   → RAF-throttled mouse position tracking
 *   └── useScrollTrigger.ts → ScrollTrigger wrapper with cleanup
 */

/**
 * ============================================
 * 2. WHEN TO USE FRAMER MOTION
 * ============================================
 * 
 * ✅ Entry animations (fade, scale, slide)
 * ✅ Hover states (button lift, border glow)
 * ✅ Staggered reveals (letter by letter, card by card)
 * ✅ Simple microinteractions (input focus, toggle)
 * ✅ Light animations with multiple instances
 * 
 * Usage in component:
 * 
 *   import { letterReveal, fadeInUp } from "@/lib/animations/framer-presets";
 *   
 *   <motion.h1
 *     variants={letterReveal}
 *     initial="hidden"
 *     animate="visible"
 *   >
 *     {text.split("").map((letter, i) => (
 *       <motion.span key={i} custom={i} variants={letterReveal} />
 *     ))}
 *   </motion.h1>
 * 
 * Key advantages:
 * - Declarative syntax (easier to read)
 * - React state integration
 * - component-scoped animations
 * - No manual lifecycle cleanup needed
 */

/**
 * ============================================
 * 3. WHEN TO USE GSAP
 * ============================================
 * 
 * ✅ Scroll-triggered animations (parallax, reveal-on-scroll)
 * ✅ Complex sequences (timeline with multiple steps)
 * ✅ SVG path animations (stroke drawing, morphing)
 * ✅ Performance-critical animations (uses RAF internally)
 * ✅ Coordinating Dom elements across entire page
 * 
 * Usage in component:
 * 
 *   import { animateThreadPath, floatingMotion } from "@/lib/animations/gsap-sequences";
 *   import { useEffect, useRef } from "react";
 *   
 *   const threadPathRef = useRef<SVGPathElement>(null);
 *   
 *   useEffect(() => {
 *     if (threadPathRef.current) {
 *       animateThreadPath(threadPathRef.current, 0.2);
 *     }
 *   }, []);
 * 
 * Key advantages:
 * - Lower memory footprint for complex animations
 * - Better control over timing and easing
 * - ScrollTrigger integration
 * - SVG path length calculations
 */

/**
 * ============================================
 * 4. PERFORMANCE RULES
 * ============================================
 * 
 * ❌ DO NOT:
 * • Animate more than 30 DOM elements at once
 * • Use blur() on large sections (performance killer)
 * • Set opacity: 0 for hidden (use visibility: hidden)
 * • Animate dimensions (width, height)
 * • Animate position with left/top (use transform instead)
 * 
 * ✅ DO:
 * • Animate transform and opacity only (GPU accelerated)
 * • Batch animations with gsap.timeline()
 * • Use will-change: transform; (remove after animation)
 * • Throttle RAF updates with flags (see useMotionTrack)
 * • Lazy load heavy components (next/dynamic)
 * 
 * Example - GPU accelerated transform:
 * 
 *   // ✅ GOOD - GPU accelerated
 *   gsap.to(element, {
 *     x: 100,        // transform: translateX
 *     opacity: 0.5,  // opacity
 *     duration: 1
 *   });
 *   
 *   // ❌ BAD - Causes layout recalculation
 *   gsap.to(element, {
 *     left: 100,     // position property
 *     width: 500,    // layout property
 *     duration: 1
 *   });
 */

/**
 * ============================================
 * 5. EASING CURVES EXPLAINED
 * ============================================
 * 
 * Editorial ease [0.22, 1, 0.36, 1]
 * → Used for primary animations
 * → Smooth entrance, gentle exit
 * → Best for: Headlines, reveals, transitions
 * 
 * Smooth ease [0.4, 0, 0.2, 1]
 * → Slower, more natural feel
 * → Best for: Floating motion, scroll animations
 * 
 * Snappy ease [0.68, -0.55, 0.27, 1.55]
 * → Bouncy, playful feel
 * → Best for: Interactive elements, hover states
 * 
 * When to change:
 * - Design changes require different feel → update easing.ts
 * - Single-use animation → use inline ease prop
 * - Scroll-based motion → use GSAP ease "sine.inOut", "power2.out"
 */

/**
 * ============================================
 * 6. COMPONENT ANIMATION PATTERN
 * ============================================
 * 
 * This is the recommended structure for animation-heavy components:
 * 
 * "use client";
 * 
 * import { motion } from "framer-motion";
 * import { useEffect, useRef, useState } from "react";
 * import gsap from "gsap";
 * import { fadeInUp } from "@/lib/animations/framer-presets";
 * import { floatingMotion } from "@/lib/animations/gsap-sequences";
 * 
 * export function MyAnimatedComponent() {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const [isVisible, setIsVisible] = useState(false);
 * 
 *   // GSAP animations (run on mount)
 *   useEffect(() => {
 *     if (elementRef.current) {
 *       floatingMotion(elementRef.current, 0.5);
 *     }
 *     // Cleanup is handled by GSAP
 *   }, []);
 * 
 *   return (
 *     <motion.div
 *       ref={elementRef}
 *       variants={fadeInUp}
 *       initial="hidden"
 *       whileInView="visible"
 *       viewport={{ once: true, amount: 0.4 }}
 *       className="..."
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 */

/**
 * ============================================
 * 7. SCROLL ANIMATION PATTERN
 * ============================================
 * 
 * For scroll triggered animations, use GSAP ScrollTrigger:
 * 
 * useEffect(() => {
 *   const timeline = gsap.timeline({
 *     scrollTrigger: {
 *       trigger: containerRef.current,
 *       start: "top center",
 *       end: "bottom center",
 *       scrub: 1.2,  // Smooth scroll-linked animation
 *       markers: false
 *     }
 *   });
 * 
 *   timeline
 *     .to(element1, { y: -100, duration: 1 }, 0)
 *     .to(element2, { opacity: 0.5, duration: 1 }, 0)
 *     .to(element3, { scale: 1.2, duration: 1 }, 0);
 * 
 *   return () => timeline.kill();
 * }, []);
 */

/**
 * ============================================
 * 8. MOBILE ANIMATION CONSIDERATIONS
 * ============================================
 * 
 * ✅ Keep animations on mobile but simplify FPS
 * ✅ Remove parallax on devices with prefers-reduced-motion
 * ✅ Use will-change sparingly (kills GPU optimization)
 * ✅ Test with DevTools performance throttling
 * 
 * In globals.css:
 * 
 *   @media (prefers-reduced-motion: reduce) {
 *     * {
 *       animation-duration: 0.01ms !important;
 *       transition-duration: 0.01ms !important;
 *     }
 *   }
 */

/**
 * ============================================
 * 9. DEBUGGING ANIMATIONS
 * ============================================
 * 
 * GSAP DevTools (install from browser extension store):
 * → Inspect timelines in real-time
 * → Step through animations frame by frame
 * → Adjust speed and easing on the fly
 * 
 * Chrome DevTools:
 * → Performance tab: Record animation, look for FPS drops
 * → More tools → Rendering: Show paint rectangles
 * → See what's being repainted unnecessarily
 * 
 * React DevTools:
 * → Highlight re-renders (check if animations cause cascading updates)
 */

/**
 * ============================================
 * 10. EXTENDING THE SYSTEM
 * ============================================
 * 
 * Adding a new animation preset:
 * 1. Add to /lib/animations/framer-presets.ts
 * 2. Export with descriptive name
 * 3. Document the use case in a comment
 * 
 * Example:
 * 
 *   export const slideInLeft = {
 *     hidden: { opacity: 0, x: -48 },
 *     visible: {
 *       opacity: 1,
 *       x: 0,
 *       transition: { duration: 0.7, ease: easing.editorial }
 *     }
 *   };
 * 
 * Adding a new GSAP sequence:
 * 1. Add to /lib/animations/gsap-sequences.ts
 * 2. Export as a named function
 * 3. Add JSDoc comment with parameters
 * 4. Handle cleanup in useEffect
 * 
 * Example:
 * 
 *   export const bounceIn = (element: HTMLElement) => {
 *     gsap.from(element, {
 *       y: 40,
 *       opacity: 0,
 *       duration: 0.8,
 *       ease: easing.snappy
 *     });
 *   };
 */

export const animationGuideDocs = true;
