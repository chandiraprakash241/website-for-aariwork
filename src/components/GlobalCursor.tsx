"use client";

import { useEffect, useRef, useState } from "react";
import { cursorFollow } from "@/lib/animations/micro-interactions";

type CursorMode = "normal" | "interactive" | "thread";

const INTERACTIVE_SELECTOR = "button, a, [role='button'], [data-cursor='interactive']";
const THREAD_SELECTOR = "canvas, [data-cursor='thread']";

export function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const target = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<CursorMode>("normal");
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("cursor-enabled");

    const updateMode = (x: number, y: number) => {
      const hovered = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!hovered) {
        setMode("normal");
        return;
      }

      if (hovered.closest(THREAD_SELECTOR)) {
        setMode("thread");
        return;
      }

      if (hovered.closest(INTERACTIVE_SELECTOR)) {
        setMode("interactive");
        return;
      }

      setMode("normal");
    };

    const onMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (!isVisibleRef.current) {
        dotPos.current = { ...target.current };
        ringPos.current = { ...target.current };
        setVisible(true);
        isVisibleRef.current = true;
      }
      updateMode(event.clientX, event.clientY);
    };

    const onLeave = () => {
      setVisible(false);
      isVisibleRef.current = false;
    };
    const onEnter = () => {
      setVisible(true);
      isVisibleRef.current = true;
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const animate = () => {
      dotPos.current.x += (target.current.x - dotPos.current.x) * cursorFollow.dotLerp;
      dotPos.current.y += (target.current.y - dotPos.current.y) * cursorFollow.dotLerp;
      ringPos.current.x += (target.current.x - ringPos.current.x) * cursorFollow.ringLerp;
      ringPos.current.y += (target.current.y - ringPos.current.y) * cursorFollow.ringLerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.classList.remove("cursor-enabled");
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`global-cursor-ring mode-${mode} ${visible ? "is-visible" : ""} ${pressed ? "is-pressed" : ""}`}
      />
      <div
        ref={dotRef}
        className={`global-cursor-dot mode-${mode} ${visible ? "is-visible" : ""} ${pressed ? "is-pressed" : ""}`}
      />
    </>
  );
}
