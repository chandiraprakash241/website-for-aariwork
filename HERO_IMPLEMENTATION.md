# HeroSection Implementation Guide

## What Was Built

### 1. **Enhanced HeroSection Component**
`src/components/HeroSection.tsx`

**Key Features:**
- ✅ Asymmetrical layout (text left 40%, visual right 60%)
- ✅ Letter-by-letter headline reveal (Framer Motion)
- ✅ SVG thread path animations (GSAP)
- ✅ Floating motion on visual element (GSAP continuous)
- ✅ Custom CTA buttons with hover lift
- ✅ Animated scroll indicator with pulse effect
- ✅ Oxblood background with subtle fabric texture

**Animation Integration:**
```typescript
// Uses imported presets instead of inline definitions
import {
  letterReveal,
  fadeInUp,
  fadeInScale,
  buttonHover,
  scrollPulse
} from "@/lib/animations/framer-presets";

import {
  animateThreadPath,
  floatingMotion
} from "@/lib/animations/gsap-sequences";
```

---

### 2. **Animation Presets** (Reusable across entire project)
`src/lib/animations/framer-presets.ts`

**Included Presets:**
- `letterReveal` - Letter-by-letter text reveal
- `lineReveal` - Line-by-line text reveal
- `fadeInUp` - Fade in + translate up
- `fadeInScale` - Fade in + scale up
- `buttonHover` - Button lift + shadow
- `scrollPulse` - Animated scroll indicator
- `floatingElement` - Continuous gentle float
- `staggerContainer` - Parent container for staggered children

---

### 3. **Easing Curves**
`src/lib/animations/easing.ts`

**Custom Curves:**
- `editorial` [0.22, 1, 0.36, 1] - Primary smooth easing
- `smooth` [0.4, 0, 0.2, 1] - Gentle, natural feel
- `snappy` [0.68, -0.55, 0.27, 1.55] - Bouncy, playful
- Plus elastic, ease-in, ease-out variants

---

### 4. **GSAP Sequences** (Complex animations)
`src/lib/animations/gsap-sequences.ts`

**Key Functions:**
- `animateThreadPath(element, delay)` - SVG stroke drawing
- `floatingMotion(element, startDelay)` - Continuous gentle sway
- `scrollParallax(element, intensity)` - Scroll-triggered parallax
- `shimmerEffect(container, x, y)` - Radial shimmer feedback
- `staggerReveal(elements, delay)` - Multi-element reveal
- `infiniteRotate(element, duration)` - Continuous rotation
- `textLetterReveal(element, delay, letterDelay)` - GSAP version of letter reveal

---

### 5. **Custom Hooks** (Reusable logic)

**useMotionTrack** - `src/lib/hooks/useMotionTrack.ts`
```typescript
const { x, y } = useMotionTrack();
// Returns mouse position, RAF-throttled
```

**useScrollTrigger** - `src/lib/hooks/useScrollTrigger.ts`
```typescript
const triggerRef = useScrollTrigger({
  trigger: element,
  start: "top center",
  onEnter: () => console.log("enter")
});
```

---

## Key Improvements Over Initial Build

| Aspect | Before | After |
|--------|--------|-------|
| **Animation presets** | Inline in components | Centralized, reusable |
| **Easing curves** | Hardcoded hex codes | Named, consistent system |
| **SVG animation** | Framer Motion only | GSAP for finer control |
| **Performance** | No RAF throttling | useMotionTrack with RAF |
| **Cleanup** | Manual in useEffect | Handled by GSAP/Framer |
| **Code reusability** | Low | High |
| **Maintenance** | Scattered | Organized in lib/ |

---

## Component Architecture

```
HeroSection.tsx
├── Left Text Block (Framer Motion)
│   ├── Overline (fadeInUp)
│   ├── Headline (letterReveal - staggered)
│   ├── Subtitle (fadeInUp with delay)
│   └── CTA Buttons (buttonHover, buttonSecondaryHover)
│
├── SVG Background Threads
│   ├── Path 1 (GSAP animateThreadPath)
│   ├── Path 2 (GSAP animateThreadPath)
│   └── Path 3 (GSAP animateThreadPath)
│
├── Right Visual Block (Framer Motion)
│   ├── Container (fadeInScale + GSAP floatingMotion)
│   ├── Embroidery pattern SVG
│   ├── Peacock motif SVG (Framer Motion paths)
│   └── Floating label (motion div)
│
└── Scroll Indicator (scrollPulse)
```

---

## Animation Timeline

```
0ms     → Page loads
200ms   → Thread path 1 draws (GSAP)
400ms   → Thread path 2 draws (GSAP)
600ms   → Thread path 3 draws (GSAP)
├─ 0ms   → Overline fades in (Framer)
├─ 80ms  → "T" in "Threads" appears
├─ 160ms → "h" appears
├─ ...   → Letter-by-letter reveal continues
├─ 650ms → Final letter appears
├─ 800ms → Subtitle fades in
├─ 1000ms→ Buttons fade in
├─ 400ms → Visual block fades in + scales
├─ 800ms → Visual block starts floating (GSAP)
└─ 1200ms→ Peacock motif parts appear

Continuous:
- Visual element floats gently (4s cycle)
- Scroll indicator pulses (2s cycle)
- Peacock motif floats subtly
```

---

## Usage Examples

### Example 1: Using PresetsinNewComponent
```typescript
import { fadeInUp, staggerContainer } from "@/lib/animations/framer-presets";

export function MySection() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2 variants={fadeInUp}>Title</motion.h2>
      <motion.p variants={fadeInUp}>Paragraph</motion.p>
    </motion.div>
  );
}
```

### Example 2: Using GSAP Sequences
```typescript
import { animateThreadPath } from "@/lib/animations/gsap-sequences";

export function MyComponent() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      animateThreadPath(pathRef.current, 0.5);
    }
  }, []);

  return <svg><path ref={pathRef} ... /></svg>;
}
```

### Example 3: Custom Animation Sequence
```typescript
import gsap from "gsap";
import { easing } from "@/lib/animations/easing";

useEffect(() => {
  const tl = gsap.timeline();
  
  tl.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: easing.editorial
  })
  .to(element, {
    y: -20,
    duration: 2,
    ease: easing.smooth,
    repeat: -1,
    yoyo: true
  }, 0);

  return () => tl.kill();
}, []);
```

---

## Performance Checklist

- ✅ Only animate `transform` and `opacity` (GPU accelerated)
- ✅ SVG paths use GSAP (efficient stroke drawing)
- ✅ Mouse tracking throttled with RAF
- ✅ No layout thrashing (no animating dimensions)
- ✅ Scroll indicator uses Framer (optimized for mobile)
- ✅ respects `prefers-reduced-motion` (add to globals.css if needed)

---

## Next Steps to Extend

1. **Add more section animations**: Use `fadeInUp`, `staggerContainer` presets
2. **Create scroll-triggered effects**: Use `gsap.timeline({ scrollTrigger: {...} })`
3. **Add mouse interaction**: Use `useMotionTrack` hook
4. **New easing feel**: Adjust or add eases in `easing.ts`
5. **Canvas interactions**: Reference `gsap-sequences.ts shimmerEffect` pattern

---

## Files Created/Modified

```
New Files:
✅ src/lib/animations/easing.ts
✅ src/lib/animations/framer-presets.ts
✅ src/lib/animations/gsap-sequences.ts
✅ src/lib/animations/ANIMATION_STRATEGY.ts (documentation)
✅ src/lib/hooks/useMotionTrack.ts
✅ src/lib/hooks/useScrollTrigger.ts

Modified Files:
✅ src/components/HeroSection.tsx (enhanced with GSAP + presets)
```

---

## Troubleshooting

**Animations not running?**
- Check that `gsap` and `gsap/ScrollTrigger` are installed
- Import `registerPlugin(ScrollTrigger)` if using scroll triggers
- Verify refs are connected to DOM elements

**Performance issues?**
- Use DevTools Performance tab to identify bottlenecks
- Reduce number of animated elements on mobile
- Add `will-change: transform;` only during animation (remove after)

**Animations look jerky?**
- Check easing curves (may need smoother ease)
- Verify transform is used instead of left/top/width/height
- Test on actual device (browser throttling is inaccurate)
