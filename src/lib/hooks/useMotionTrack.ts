/**
 * Custom hook: useMotionTrack
 * Tracks mouse position efficiently with RAF throttling
 */

import { useState, useEffect } from "react";

export function useMotionTrack() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let isScheduled = false;

    const updatePosition = (e: MouseEvent) => {
      if (isScheduled) return;
      isScheduled = true;

      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        isScheduled = false;
      });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}
