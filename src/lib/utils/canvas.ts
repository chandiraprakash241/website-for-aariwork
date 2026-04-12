/**
 * Canvas drawing utilities
 * Smooth curves, stroke rendering, particle effects
 */

/**
 * Catmull-Rom spline interpolation for smooth curves
 * Creates natural thread-like flowing paths
 */
export function catmullRom(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;

  return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
         (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
         v0 * t +
         p1;
}

/**
 * Interpolate between two points using Catmull-Rom
 */
export function interpolatePath(
  points: Array<{ x: number; y: number }>,
  resolution: number = 5
): Array<{ x: number; y: number }> {
  if (points.length < 2) return points;
  if (points.length === 2) return points;

  const interpolated: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[i] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : points[i + 1];

    for (let t = 0; t < 1; t += 1 / resolution) {
      const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
      const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
      interpolated.push({ x, y });
    }
  }

  interpolated.push(points[points.length - 1]);
  return interpolated;
}

/**
 * Calculate distance between two points
 */
export function distance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Calculate angle between two points
 */
export function angle(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * Smooth position using exponential moving average
 * Creates natural, less jittery motion
 */
export function exponentialSmooth(
  current: number,
  target: number,
  alpha: number = 0.15
): number {
  return current + (target - current) * alpha;
}
