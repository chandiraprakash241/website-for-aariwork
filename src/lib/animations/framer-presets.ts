/**
 * Framer Motion animation variants
 * Reusable presets for consistent motion language
 */

import { easing } from "./easing";

export const letterReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easing.editorial
    }
  })
};

export const lineReveal = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: easing.editorial
    }
  })
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing.editorial
    }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.editorial
    }
  }
};

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const buttonHover = {
  hover: { 
    y: -2,
    boxShadow: "0 12px 32px rgba(74, 26, 31, 0.2)"
  },
  tap: { scale: 0.98 }
};

export const buttonSecondaryHover = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

export const scrollPulse = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.6, 1, 0.6]
  },
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: easing.smooth
  }
};

export const floatingElement = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: easing.smooth_slow
    }
  }
};

export const subtle3D = {
  initial: { 
    rotateX: 0,
    rotateY: 0
  },
  animate: (mousePosition: { x: number; y: number }) => ({
    rotateX: (mousePosition.y - 500) * 0.01,
    rotateY: (mousePosition.x - 500) * 0.01,
    transition: { type: "spring", stiffness: 100 }
  })
};
