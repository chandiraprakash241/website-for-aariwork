"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { distance, exponentialSmooth } from "@/lib/utils/canvas";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  createdAt: number;
  baseWidth: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  createdAt: number;
  life: number;
  size: number;
}

interface ArcZone {
  id: "neckline" | "leftSleeve" | "rightSleeve";
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  influence: number;
  pull: number;
}

const MAX_STROKES = 80;
const MAX_POINTS_PER_STROKE = 260;
const MAX_SPARKLES = 120;
const MIN_POINT_DISTANCE = 1.8;
const STROKE_FADE_START = 3200;
const STROKE_FADE_DURATION = 2200;
const TAU = Math.PI * 2;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const lerpPoint = (from: Point, to: Point, t: number): Point => ({
  x: from.x + (to.x - from.x) * t,
  y: from.y + (to.y - from.y) * t
});

const angleInArc = (angle: number, start: number, end: number) => {
  const normalize = (a: number) => {
    let next = a % TAU;
    if (next < 0) next += TAU;
    return next;
  };

  const nAngle = normalize(angle);
  const nStart = normalize(start);
  const nEnd = normalize(end);

  if (nStart <= nEnd) {
    return nAngle >= nStart && nAngle <= nEnd;
  }

  return nAngle >= nStart || nAngle <= nEnd;
};

const closestPointOnArc = (point: Point, zone: ArcZone): Point => {
  const rawAngle = Math.atan2(point.y - zone.cy, point.x - zone.cx);
  let angle = rawAngle;

  if (!angleInArc(rawAngle, zone.start, zone.end)) {
    const toStart = Math.abs(rawAngle - zone.start);
    const toEnd = Math.abs(rawAngle - zone.end);
    angle = toStart < toEnd ? zone.start : zone.end;
  }

  return {
    x: zone.cx + Math.cos(angle) * zone.r,
    y: zone.cy + Math.sin(angle) * zone.r
  };
};

const createEmbroideryZones = (width: number, height: number): ArcZone[] => {
  const blouseWidth = width * 0.7;
  const blouseHeight = height * 0.72;
  const cx = width * 0.5;
  const cy = height * 0.54;
  const left = cx - blouseWidth * 0.5;
  const right = cx + blouseWidth * 0.5;
  const top = cy - blouseHeight * 0.48;

  return [
    {
      id: "neckline",
      cx,
      cy: top + blouseHeight * 0.34,
      r: blouseWidth * 0.2,
      start: Math.PI * 0.12,
      end: Math.PI * 0.88,
      influence: blouseWidth * 0.19,
      pull: 0.34
    },
    {
      id: "leftSleeve",
      cx: left + blouseWidth * 0.09,
      cy: top + blouseHeight * 0.28,
      r: blouseWidth * 0.14,
      start: Math.PI * 0.72,
      end: Math.PI * 1.45,
      influence: blouseWidth * 0.2,
      pull: 0.22
    },
    {
      id: "rightSleeve",
      cx: right - blouseWidth * 0.09,
      cy: top + blouseHeight * 0.28,
      r: blouseWidth * 0.14,
      start: Math.PI * -0.45,
      end: Math.PI * 0.28,
      influence: blouseWidth * 0.2,
      pull: 0.22
    }
  ];
};

export function ThreadCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const bgPatternRef = useRef<HTMLCanvasElement | null>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const zonesRef = useRef<ArcZone[]>([]);

  const isDrawingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const activeZoneRef = useRef<ArcZone["id"] | null>(null);
  const shimmerTickRef = useRef(0);

  const pointerRef = useRef<Point>({ x: 0, y: 0 });
  const smoothPointerRef = useRef<Point>({ x: 0, y: 0 });
  const velocityRef = useRef(0);

  const [strokeCount, setStrokeCount] = useState(0);
  const [isDrawingUi, setIsDrawingUi] = useState(false);

  const drawThreadStroke = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    baseWidth: number,
    color: string,
    opacity: number
  ) => {
    if (points.length < 2) return;

    const drawLayer = (widthScale: number, alphaScale: number, strokeStyle: string) => {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = baseWidth * widthScale;
      ctx.globalAlpha = opacity * alphaScale;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const midX = (current.x + next.x) * 0.5;
        const midY = (current.y + next.y) * 0.5;
        ctx.quadraticCurveTo(current.x, current.y, midX, midY);
      }

      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    };

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    drawLayer(2.15, 0.18, color);
    drawLayer(1.15, 0.84, color);
    drawLayer(0.62, 0.36, "#f0e6c8");

    ctx.globalAlpha = 1;
  };

  const drawFabricBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#2c0f14");
    gradient.addColorStop(0.55, "#3a151b");
    gradient.addColorStop(1, "#241015");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (bgPatternRef.current) {
      ctx.globalAlpha = 0.15;
      ctx.drawImage(bgPatternRef.current, 0, 0, width, height);
      ctx.globalAlpha = 1;
    }
  };

  const drawBlouseOutline = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const blouseWidth = width * 0.7;
    const blouseHeight = height * 0.72;
    const cx = width * 0.5;
    const cy = height * 0.54;
    const left = cx - blouseWidth * 0.5;
    const right = cx + blouseWidth * 0.5;
    const top = cy - blouseHeight * 0.48;
    const bottom = cy + blouseHeight * 0.42;

    ctx.save();
    ctx.strokeStyle = "rgba(240, 230, 200, 0.16)";
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(left + blouseWidth * 0.12, top + blouseHeight * 0.1);
    ctx.quadraticCurveTo(left + blouseWidth * 0.04, top + blouseHeight * 0.22, left + blouseWidth * 0.03, top + blouseHeight * 0.38);
    ctx.quadraticCurveTo(left + blouseWidth * 0.05, top + blouseHeight * 0.64, left + blouseWidth * 0.16, bottom);
    ctx.lineTo(right - blouseWidth * 0.16, bottom);
    ctx.quadraticCurveTo(right - blouseWidth * 0.05, top + blouseHeight * 0.64, right - blouseWidth * 0.03, top + blouseHeight * 0.38);
    ctx.quadraticCurveTo(right - blouseWidth * 0.04, top + blouseHeight * 0.22, right - blouseWidth * 0.12, top + blouseHeight * 0.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, top + blouseHeight * 0.34, blouseWidth * 0.2, Math.PI * 0.12, Math.PI * 0.88, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(left + blouseWidth * 0.09, top + blouseHeight * 0.28, blouseWidth * 0.14, Math.PI * 0.72, Math.PI * 1.45, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(right - blouseWidth * 0.09, top + blouseHeight * 0.28, blouseWidth * 0.14, Math.PI * -0.45, Math.PI * 0.28, false);
    ctx.stroke();

    ctx.restore();
  };

  const drawZoneHighlight = (ctx: CanvasRenderingContext2D, zoneId: ArcZone["id"] | null, zones: ArcZone[]) => {
    if (!zoneId) return;

    const zone = zones.find((z) => z.id === zoneId);
    if (!zone) return;

    ctx.save();
    ctx.strokeStyle = "rgba(196, 150, 61, 0.3)";
    ctx.lineWidth = 2.2;
    ctx.shadowColor = "rgba(196, 150, 61, 0.42)";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(zone.cx, zone.cy, zone.r, zone.start, zone.end, false);
    ctx.stroke();
    ctx.restore();
  };

  const drawPointerPreview = (ctx: CanvasRenderingContext2D) => {
    if (isDrawingRef.current || !isHoveringRef.current) return;

    const point = smoothPointerRef.current;
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = "rgba(196, 150, 61, 0.6)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(point.x - 18, point.y + 6);
    ctx.quadraticCurveTo(point.x, point.y - 8, point.x + 18, point.y + 6);
    ctx.stroke();

    ctx.fillStyle = "rgba(240, 230, 200, 0.7)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.8, 0, TAU);
    ctx.fill();
    ctx.restore();
  };

  const drawSparkles = (ctx: CanvasRenderingContext2D, now: number) => {
    const sparkles = sparklesRef.current;
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sparkle = sparkles[i];
      const age = now - sparkle.createdAt;
      if (age >= sparkle.life) {
        sparkles.splice(i, 1);
        continue;
      }

      const lifeProgress = age / sparkle.life;
      const alpha = (1 - lifeProgress) * 0.72;
      const radius = sparkle.size * (0.55 + Math.sin(lifeProgress * Math.PI) * 0.8);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgba(240, 230, 200, 0.92)";
      ctx.shadowColor = "rgba(196, 150, 61, 0.8)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, radius, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  };

  const guidedPointForBlouse = (point: Point): Point => {
    const zones = zonesRef.current;
    if (zones.length === 0) {
      activeZoneRef.current = null;
      return point;
    }

    let chosenZone: ArcZone | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    let closestOnZone: Point | null = null;

    for (const zone of zones) {
      const projected = closestPointOnArc(point, zone);
      const dist = distance(point, projected);

      if (dist < closestDistance) {
        closestDistance = dist;
        chosenZone = zone;
        closestOnZone = projected;
      }
    }

    if (!chosenZone || !closestOnZone || closestDistance > chosenZone.influence) {
      activeZoneRef.current = null;
      return point;
    }

    activeZoneRef.current = chosenZone.id;
    const t = chosenZone.pull * (1 - closestDistance / chosenZone.influence);
    return lerpPoint(point, closestOnZone, t);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    ctxRef.current = context;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      canvasSizeRef.current.width = rect.width;
      canvasSizeRef.current.height = rect.height;
      canvasSizeRef.current.dpr = dpr;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);

      zonesRef.current = createEmbroideryZones(rect.width, rect.height);

      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = Math.max(1, Math.floor(rect.width * 0.45));
      patternCanvas.height = Math.max(1, Math.floor(rect.height * 0.45));
      const patternCtx = patternCanvas.getContext("2d");
      if (patternCtx) {
        patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternCtx.strokeStyle = "rgba(255, 255, 255, 0.09)";
        patternCtx.lineWidth = 0.7;

        for (let y = 0; y < patternCanvas.height; y += 11) {
          patternCtx.beginPath();
          patternCtx.moveTo(0, y + 0.5);
          patternCtx.lineTo(patternCanvas.width, y + 0.5);
          patternCtx.stroke();
        }

        patternCtx.strokeStyle = "rgba(212, 196, 176, 0.06)";
        for (let x = 0; x < patternCanvas.width; x += 13) {
          patternCtx.beginPath();
          patternCtx.moveTo(x + 0.5, 0);
          patternCtx.lineTo(x + 0.5, patternCanvas.height);
          patternCtx.stroke();
        }
      }
      bgPatternRef.current = patternCanvas;
    };

    const pointFromEvent = (event: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType !== "touch") return;

      const point = pointFromEvent(event);
      canvas.setPointerCapture(event.pointerId);

      pointerRef.current.x = point.x;
      pointerRef.current.y = point.y;
      smoothPointerRef.current.x = point.x;
      smoothPointerRef.current.y = point.y;
      velocityRef.current = 0;

      const guided = guidedPointForBlouse(point);

      currentStrokeRef.current = {
        points: [guided],
        createdAt: performance.now(),
        baseWidth: 2.9,
        color: "#c4963d"
      };

      isDrawingRef.current = true;
      setIsDrawingUi(true);
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = pointFromEvent(event);

      pointerRef.current.x = point.x;
      pointerRef.current.y = point.y;

      smoothPointerRef.current.x = exponentialSmooth(smoothPointerRef.current.x, point.x, 0.22);
      smoothPointerRef.current.y = exponentialSmooth(smoothPointerRef.current.y, point.y, 0.22);

      const guided = guidedPointForBlouse({
        x: smoothPointerRef.current.x,
        y: smoothPointerRef.current.y
      });

      if (!isDrawingRef.current || !currentStrokeRef.current) {
        return;
      }

      const points = currentStrokeRef.current.points;
      const last = points[points.length - 1];
      const dist = distance(last, guided);
      if (dist < MIN_POINT_DISTANCE) return;

      velocityRef.current = exponentialSmooth(velocityRef.current, dist, 0.18);

      if (points.length < MAX_POINTS_PER_STROKE) {
        points.push(guided);
      }

      const speedFactor = Math.min(velocityRef.current / 14, 1);
      const zoneBoost = activeZoneRef.current === "neckline" ? 0.25 : activeZoneRef.current ? 0.16 : 0;
      currentStrokeRef.current.baseWidth = 2 + (1 - speedFactor) * 1.1 + zoneBoost;

      shimmerTickRef.current += 1;
      if (shimmerTickRef.current % 3 === 0 && sparklesRef.current.length < MAX_SPARKLES) {
        sparklesRef.current.push({
          x: guided.x + (Math.random() - 0.5) * 8,
          y: guided.y + (Math.random() - 0.5) * 8,
          createdAt: performance.now(),
          life: 480 + Math.random() * 520,
          size: 0.75 + Math.random() * 1.25
        });
      }
    };

    const finalizeStroke = () => {
      const activeStroke = currentStrokeRef.current;
      if (!activeStroke) {
        isDrawingRef.current = false;
        setIsDrawingUi(false);
        return;
      }

      if (activeStroke.points.length > 1) {
        strokesRef.current.push(activeStroke);

        if (strokesRef.current.length > MAX_STROKES) {
          const over = strokesRef.current.length - MAX_STROKES;
          strokesRef.current.splice(0, over);
        }
      }

      currentStrokeRef.current = null;
      isDrawingRef.current = false;
      setIsDrawingUi(false);
      setStrokeCount(strokesRef.current.length);
    };

    const onPointerUp = () => {
      finalizeStroke();
    };

    const onPointerCancel = () => {
      finalizeStroke();
    };

    const onPointerEnter = () => {
      isHoveringRef.current = true;
    };

    const onPointerLeave = () => {
      isHoveringRef.current = false;
      activeZoneRef.current = null;
      finalizeStroke();
    };

    const render = () => {
      const ctx = ctxRef.current;
      if (!ctx) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const width = canvasSizeRef.current.width;
      const height = canvasSizeRef.current.height;

      ctx.clearRect(0, 0, width, height);
      drawFabricBackground(ctx, width, height);
      drawBlouseOutline(ctx, width, height);
      drawZoneHighlight(ctx, activeZoneRef.current, zonesRef.current);

      const now = performance.now();
      const strokes = strokesRef.current;

      for (let i = strokes.length - 1; i >= 0; i--) {
        const stroke = strokes[i];
        const age = now - stroke.createdAt;

        if (age > STROKE_FADE_START + STROKE_FADE_DURATION) {
          strokes.splice(i, 1);
          continue;
        }

        let opacity = 1;
        if (age > STROKE_FADE_START) {
          const progress = (age - STROKE_FADE_START) / STROKE_FADE_DURATION;
          opacity = 1 - progress;
        }

        const shimmerWave = 0.95 + Math.sin((now - stroke.createdAt) * 0.011) * 0.05;
        opacity *= shimmerWave;

        drawThreadStroke(ctx, stroke.points, stroke.baseWidth, stroke.color, opacity);
      }

      const active = currentStrokeRef.current;
      if (active && active.points.length > 1) {
        drawThreadStroke(ctx, active.points, active.baseWidth, active.color, 0.94);
      }

      drawSparkles(ctx, now);
      drawPointerPreview(ctx);

      rafRef.current = requestAnimationFrame(render);
    };

    canvas.style.touchAction = "none";

    updateCanvasSize();
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerup", onPointerUp, { passive: true });
    canvas.addEventListener("pointercancel", onPointerCancel, { passive: true });
    canvas.addEventListener("pointerenter", onPointerEnter, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", updateCanvasSize);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", updateCanvasSize);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    currentStrokeRef.current = null;
    strokesRef.current = [];
    sparklesRef.current = [];
    activeZoneRef.current = null;
    setStrokeCount(0);

    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSizeRef.current.width, canvasSizeRef.current.height);
  };

  return (
    <section className="relative z-30 -mt-[220px] w-full px-[12%] pb-[160px] pt-[280px] bg-[linear-gradient(180deg,rgba(74,26,31,0)_0%,rgba(245,237,224,0.82)_30%,rgba(245,237,224,1)_54%)]">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-display text-charcoal">Your Thread</h2>
          <p className="text-lg text-charcoal/70">
            Preview blouse embroidery in real time. Guided stitches follow neckline and sleeve flow.
          </p>
        </div>

        <div
          className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-cream/35 shadow-[0_30px_80px_rgba(42,36,32,0.35)]"
          data-cursor="thread"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            data-cursor="thread"
          />

          {strokeCount === 0 && !isDrawingUi && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.36 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <p className="text-cream/40 text-lg font-light text-center">
                Draw to preview your blouse embroidery
              </p>
            </motion.div>
          )}
        </div>

        <div className="flex gap-4">
          <motion.button
            onClick={handleClear}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="interactive"
          >
            Clear Canvas
          </motion.button>

          <p className="text-sm text-charcoal/50 flex items-center">
            {strokeCount} stroke{strokeCount !== 1 ? "s" : ""} created
          </p>
        </div>

        <motion.div
          className="rounded-xl border border-brass/20 bg-brass/5 px-6 py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-charcoal/70">
            <span className="font-semibold text-brass">Tip:</span> Move to feel the embroidery shimmer.
            Draw near neckline or sleeves to get guided stitch flow.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
