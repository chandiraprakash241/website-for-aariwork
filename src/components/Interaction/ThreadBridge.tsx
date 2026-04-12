"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ThreadBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceGroupRef = useRef<SVGGElement>(null);
  const targetGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sourceGroupRef.current || !targetGroupRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targetGroupRef.current, { opacity: 0, y: 90 });

      // Option B: Hero lines dissolve and reform near interaction canvas.
      const timeline = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          end: "bottom 28%",
          scrub: 1.15
        }
      });

      timeline
        .to(sourceGroupRef.current, {
          y: 180,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1
        })
        .to(
          targetGroupRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1
          },
          0.2
        )
        .to(
          ".bridge-thread-path",
          {
            strokeDashoffset: -260,
            duration: 1.1,
            stagger: 0.08
          },
          0.25
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-0 right-0 top-[58vh] z-20 h-[125vh] overflow-hidden"
      aria-hidden="true"
    >
      <svg className="h-full w-full" viewBox="0 0 1440 1600" preserveAspectRatio="none">
        <defs>
          <filter id="bridgeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={sourceGroupRef}>
          <path
            className="bridge-thread-path"
            d="M 170 70 Q 420 140 620 120 T 1060 170"
            stroke="#c4963d"
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
            filter="url(#bridgeGlow)"
            strokeDasharray="10 18"
          />
          <path
            className="bridge-thread-path"
            d="M 260 180 Q 520 230 760 200 T 1270 255"
            stroke="#f0e6c8"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
            filter="url(#bridgeGlow)"
            strokeDasharray="8 14"
          />
          <path
            className="bridge-thread-path"
            d="M 110 310 Q 390 250 660 330 T 1230 360"
            stroke="#c4963d"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
            filter="url(#bridgeGlow)"
            strokeDasharray="8 16"
          />
        </g>

        <g ref={targetGroupRef}>
          <path
            className="bridge-thread-path"
            d="M 140 1080 Q 370 1010 590 1085 T 1020 1045"
            stroke="#c4963d"
            strokeWidth="2.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.88"
            filter="url(#bridgeGlow)"
            strokeDasharray="12 22"
          />
          <path
            className="bridge-thread-path"
            d="M 210 1140 Q 480 1080 780 1160 T 1290 1100"
            stroke="#f0e6c8"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            filter="url(#bridgeGlow)"
            strokeDasharray="10 16"
          />
          <path
            className="bridge-thread-path"
            d="M 90 1240 Q 310 1185 530 1240 T 1120 1205"
            stroke="#c4963d"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
            filter="url(#bridgeGlow)"
            strokeDasharray="8 14"
          />
        </g>
      </svg>
    </div>
  );
}
