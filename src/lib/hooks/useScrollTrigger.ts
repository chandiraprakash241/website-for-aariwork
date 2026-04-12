/**
 * Custom hook: useScrollTrigger
 * Wrapper for GSAP ScrollTrigger initialization
 * Auto-cleans up on unmount
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useScrollTrigger(config: ScrollTriggerConfig) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start || "top center",
      end: config.end || "bottom center",
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      markers: config.markers || false
    });

    triggerRef.current = scrollTrigger;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [config]);

  return triggerRef;
}

/**
 * Helper to create a GSAP timeline with ScrollTrigger
 */
export function useGsapScrollTimeline() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return timelineRef;
}
