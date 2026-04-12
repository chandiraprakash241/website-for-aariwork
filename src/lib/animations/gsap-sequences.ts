/**
 * GSAP animation sequences and helpers
 * Centralized motion logic for complex, scroll-based animations
 */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate SVG path stroke with double wave for embroidery effect
 * @param element - SVG path element
 * @param delay - Start delay in seconds
 */
export const animateThreadPath = (element: SVGPathElement, delay = 0) => {
  const length = element.getTotalLength();
  
  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  gsap.to(element, {
    strokeDashoffset: 0,
    duration: 2,
    delay,
    ease: "sine.inOut"
  });
};

/**
 * Floating motion for visual elements
 * Creates a gentle up-down sway
 */
export const floatingMotion = (element: HTMLElement, startDelay = 0) => {
  gsap.to(element, {
    y: -24,
    duration: 4,
    delay: startDelay,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
};

/**
 * Parallax motion triggered on scroll
 * Moves element vertically at different speed than scroll
 */
export const scrollParallax = (
  element: HTMLElement,
  intensity: number = 0.5
) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element.parentElement,
      start: "top center",
      end: "bottom center",
      scrub: 1.2, // Smooth scroll linking
      markers: false
    }
  });

  timeline.to(element, {
    y: window.innerHeight * intensity * -0.4,
    duration: 1
  });
};

/**
 * Subtle background parallax for section ornaments.
 * Uses only transform + opacity for smooth performance.
 */
export const sectionParallax = (
  element: HTMLElement,
  trigger: HTMLElement,
  yFrom = 32,
  yTo = -32,
  fadeTo = 0.8
) => {
  return gsap.fromTo(
    element,
    { y: yFrom, opacity: 0.45 },
    {
      y: yTo,
      opacity: fadeTo,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1
      }
    }
  );
};

/**
 * Shimmer effect for thread shimmer layers
 * Creates a radial glow that radiates outward
 */
export const shimmerEffect = (container: HTMLElement, x: number, y: number) => {
  const shimmer = document.createElement("div");
  shimmer.style.position = "absolute";
  shimmer.style.left = `${x}px`;
  shimmer.style.top = `${y}px`;
  shimmer.style.width = "40px";
  shimmer.style.height = "40px";
  shimmer.style.borderRadius = "50%";
  shimmer.style.background = "radial-gradient(circle, #c4963d 0%, transparent 70%)";
  shimmer.style.pointerEvents = "none";

  container.appendChild(shimmer);

  gsap.timeline()
    .to(shimmer, {
      opacity: 0,
      scale: 2.5,
      duration: 0.8,
      ease: "power1.out"
    }, 0)
    .then(() => shimmer.remove());
};

/**
 * Staggered reveal for multiple elements
 * Animates elements one after another
 */
export const staggerReveal = (
  elements: HTMLElement[],
  delay: number = 0.1,
  duration: number = 0.6
) => {
  const timeline = gsap.timeline();

  elements.forEach((el, index) => {
    timeline.to(
      el,
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out"
      },
      delay + index * delay
    );
  });

  return timeline;
};

/**
 * Continuous rotation animation
 * Perfect for decorative elements
 */
export const infiniteRotate = (
  element: HTMLElement,
  duration: number = 6,
  direction: "cw" | "ccw" = "cw"
) => {
  gsap.to(element, {
    rotation: direction === "cw" ? 360 : -360,
    duration,
    repeat: -1,
    ease: "none"
  });
};

/**
 * Text letter reveal with stagger (using GSAP)
 * Alternative to Framer Motion for fine control
 */
export const textLetterReveal = (
  element: HTMLElement,
  delay: number = 0,
  letterDelay: number = 0.05
) => {
  const letters = element.querySelectorAll("span");
  const timeline = gsap.timeline({ delay });

  gsap.set(letters, { opacity: 0, y: 20 });

  letters.forEach((letter, index) => {
    timeline.to(
      letter,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      },
      index * letterDelay
    );
  });

  return timeline;
};
