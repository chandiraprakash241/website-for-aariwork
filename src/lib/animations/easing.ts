/**
 * Custom easing curves for editorial, premium aesthetic
 * Aligned with Aari design system
 */

export const easing = {
  // Primary easing for most animations
  editorial: [0.22, 1, 0.36, 1],
  
  // Smooth, gentle curves
  smooth: [0.4, 0, 0.2, 1],
  smooth_slow: [0.3, 0.1, 0.2, 0.95],
  
  // Quick, snappy feel
  snappy: [0.68, -0.55, 0.27, 1.55],
  
  // In/out curves
  ease_in: [0.4, 0, 1, 1],
  ease_out: [0, 0, 0.2, 1],
  
  // Fabric-like motion
  elastic_soft: [0.34, 1.56, 0.64, 1],
} as const;
