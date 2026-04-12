# Aari Threads Design System - Implementation Guide

## Overview

The Aari Threads design system is a premium, experimental Tailwind CSS + React framework built for an award-worthy Aari embroidery website. Every element reflects custom design tokens, asymmetrical layouts, and expressive motion.

---

## Color System

**Core Palette (from Tailwind config):**

```
oxblood:  #4a1a1f   → Hero backgrounds, introspection
brass:    #c4963d   → Primary CTAs, accents, zari shimmer
charcoal: #2a2420   → Body text, grounding
cream:    #f5ede0   → Primary background, breathing space
taupe:    #d4c4b0   → Subtle dividers, muted elements
rust:     #8b3a3a   → Secondary sections, overlays
gold:     #f0e6c8   → Hover states, luminous touches
```

**Usage in Utility Classes:**

```css
/* Background colors */
.bg-oxblood { background-color: #4a1a1f; }
.bg-brass { background-color: #c4963d; }
.bg-cream { background-color: #f5ede0; }

/* Text colors */
.text-charcoal { color: #2a2420; }
.text-brass { color: #c4963d; }
.text-gold { color: #f0e6c8; }
```

**Transparency Usage:**

```jsx
// Cards use opacity for layered premium feel
<div className="bg-cream/80">   // 80% opacity cream
<div className="border-taupe/50"> // 50% opacity taupe borders
<div className="text-cream/95">   // 95% opacity light text
```

---

## Typography System

**Font Families:**

- **Display:** Playfair Display (serif, luxury, headings)
- **Body:** Sora (modern, clean, readable)

**Type Scale (from config):**

| Element | Size | Weight | Line Height | Letter Spacing | Use |
|---------|------|--------|-------------|---|---|
| H1 | 92px | 700 | 1.1 | -3px | Page hero |
| H2 | 64px | 600 | 1.2 | -2px | Section headers |
| H3 | 42px | 600 | 1.3 | -1px | Subsections |
| H4 | 28px | 600 | 1.4 | -0.5px | Card titles |
| Body Large | 20px | 400 | 1.6 | +0.5px | Prominent text |
| Body | 16px | 400 | 1.7 | +0.3px | Standard copy |
| Label | 12px | 600 | 1.4 | +1.2px | Tags, captions |
| Overline | 11px | 700 | 1.8 | +2px | Section labels |

**Usage:**

```jsx
// Automatically applied via tailwind fontSize utility
<h1 className="text-5xl">Page Hero</h1>        // 92px
<h2 className="text-4xl font-display">Section</h2> // 64px
<p className="text-base">Body text</p>         // 16px
<span className="text-xs uppercase">Label</span>   // 12px overline
```

---

## Spacing System

**Premium Spacing Scale:**

```
xs:   8px
sm:   16px
md:   24px
lg:   40px
xl:   64px
2xl:  120px
3xl:  160px
4xl:  240px
```

**Usage Pattern:**

```jsx
/* Sections use 3xl (160px) top margin, 4xl (240px) bottom */
<section className="py-[160px]">
  /* Card internal padding: 32px sides, 28px top, 36px bottom */
  <div className="px-sm py-md">
  
  /* Asymmetrical gaps */
  <div className="gap-lg">  // 40px gap
```

**Margin/Padding Utilities (standard Tailwind + custom):**

```jsx
/* Margin */
.m-xs, .mx-sm, .my-lg, .mt-2xl, etc.

/* Padding */
.p-md, .px-lg, .py-xl, etc.

/* Custom helpers */
.offset-left  { margin-left: 12%; }
.offset-right { margin-right: 12%; }
```

---

## Custom Utility Classes

### Asymmetrical Layout Utilities

```css
/* Offset left/right */
.offset-left {
  margin-left: 12%;
}

.offset-right {
  margin-right: 12%;
}

/* Floating effects */
.float-up {
  transform: translateY(-40px);
}

/* Natural rotation for cards */
.rotate-subtle {
  transform: rotate(-1.2deg);
}

.rotate-subtle-cw {
  transform: rotate(1.8deg);
}
```

**Example:**
```jsx
<div className="offset-left rotate-subtle">
  {/* Asymmetrical card shifts left 12% and rotates -1.2deg */}
</div>
```

### Motion & Transition Utilities

```css
/* Premium easing for all transitions */
.transition-premium {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.duration-editorial { 
  transition-duration: 0.6s;
}

/* Text animation helpers */
.text-mask {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

**Example:**
```jsx
<button className="transition-premium hover:scale-105">
  Premium hover effect
</button>
```

### Visual Effects Utilities

```css
/* Fabric texture overlay */
.fabric-texture {
  background-image: linear-gradient(36deg, rgba(255,255,255,0.18) 1px, transparent 1px),
                    linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Premium shadows */
.shadow-premium {
  box-shadow: 0 16px 48px rgba(42, 36, 32, 0.12);
}

.shadow-subtle {
  box-shadow: 0 4px 12px rgba(42, 36, 32, 0.08);
}
```

**Example:**
```jsx
<div className="shadow-premium hover:shadow-premium transition-premium">
  Card with premium shadow
</div>
```

### Component Variants

**Primary Button:**
```jsx
<button className="btn-primary">
  Begin Embroidery Journey
</button>

/* Styles: bg-brass, text-cream, 18px Playfair bold */
/* Hover: bg-#d4a751, translateY(-2px) */
```

**Secondary Button:**
```jsx
<button className="btn-secondary">
  Explore Collections
</button>

/* Styles: transparent bg, brass border, charcoal text */
/* Hover: semi-transparent gold bg, darker border */
```

---

## Component Architecture

**Folder Structure:**

```
src/
├── app/
│   ├── layout.tsx         // Root layout with font imports
│   ├── page.tsx           // Main page (assembles sections)
│   └── globals.css        // Base styles + custom utilities
├── components/
│   ├── HeroSection.tsx    // Full-bleed hero with animated threads
│   ├── StorySection.tsx   // Craft narrative + rotated cards
│   ├── FeaturedWorks.tsx  // Asymmetrical broken grid
│   ├── CraftSection.tsx   // Technique + artisan info (rust bg)
│   └── CTASection.tsx     // Final call-to-action
└── types/
    └── global.d.ts        // Global type declarations
```

**Design Principles per Component:**

1. **HeroSection**
   - Full viewport height, Deep Oxblood background
   - Staggered letter-by-letter headline reveal (Framer Motion)
   - Animated SVG thread trails in background
   - Asymmetrical layout: text left (60% width), visual right (floated -40px)
   - Scroll indicator at bottom

2. **StorySection**
   - Cream background with fabric texture overlay
   - Three cards in grid, each rotated slightly (-1 to +2deg)
   - Staggered entrance on scroll
   - Callout box for textile heritage detail

3. **FeaturedWorks**
   - Broken asymmetrical grid (not aligned)
   - Card 1: 48% width, top 0
   - Card 2: 40% width, top 240px (overlaps Card 1)
   - Card 3: 36% width, top 60px (right side)
   - Each card has unique rotation

4. **CraftSection**
   - Rust background with dark grain texture
   - Asymmetrical three-column layout (44%, 28%, 20% widths)
   - Cream text for contrast
   - Brass-colored accent bullets

5. **CTASection**
   - Centered container with max-width-3xl
   - Two-button group (primary + secondary)
   - Email contact link below
   - Subtle border divider

---

## Animation & Motion

**Stagger Reveals (used on scroll):**

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Reveals on scroll, eases with editorial curve */}
</motion.div>
```

**Letter-by-Letter Reveal:**

```jsx
const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6 }
  })
};

{heroText.split("").map((letter, i) => (
  <motion.span key={i} custom={i} variants={letterVariants}>
    {letter}
  </motion.span>
))}
```

**Available Animations (from Tailwind config):**

```css
.animate-fade    /* 0.8s fade-in */
.animate-slide   /* 0.8s slide-up */
.animate-scale   /* 0.8s scale-in (0.92 → 1) */
.animate-shimmer /* 2s shimmer loop */
.animate-float   /* 4s subtle vertical float */
.animate-draw    /* 1.2s SVG stroke animation */
```

---

## Layout Patterns

### Asymmetrical Grid

Instead of standard CSS Grid, use manual positioning:

```jsx
<div className="relative h-[800px]">
  {/* Element 1: 48% width, positioned at top-left */}
  <div className="absolute top-0 left-0 w-[48%] h-[350px]">Content</div>
  
  {/* Element 2: 40% width, offset 240px down, starts at 40% left */}
  <div className="absolute top-[240px] left-[40%] w-[40%] h-[320px] rotate-subtle">Content</div>
  
  {/* Element 3: 36% width, positioned top-right with subtle rotation */}
  <div className="absolute top-[60px] right-0 w-[36%] h-[280px] rotate-subtle-cw">Content</div>
</div>
```

### Section Breathing

Each section uses unequal vertical spacing for premium feel:

```jsx
<section className="py-[160px]">         {/* 160px top padding */}
  {/* Content */}
</section>
<section className="pt-[240px] pb-[160px]"> {/* 240px top, 160px bottom */}
  {/* Different spacing creates visual rhythm */}
</section>
```

### Horizontal Margins

All sections use 12% left/right margins (not sides):

```jsx
<section className="px-[12%]">
  {/* Safe content area, 12% margins on wide screens */}
  {/* Responsive—breaks to smaller % on mobile */}
</section>
```

---

## Best Practices

### 1. **Avoid Overusing Tailwind Classes**

❌ Bad:
```jsx
<div className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md">
```

✅ Good:
```jsx
<div className="card">
  {/* Defined in CSS, cleaner in JSX */}
</div>
```

### 2. **Group Related Utilities**

Use classed components for recurring patterns:

```css
/* In globals.css or via @layer */
.btn-primary {
  @apply bg-brass text-cream px-12 py-5 rounded-minimal font-display font-bold text-lg transition-premium;
}

.btn-primary:hover {
  @apply bg-[#d4a751] -translate-y-0.5;
}
```

Then use simply:
```jsx
<button className="btn-primary">CTA Text</button>
```

### 3. **Typography is Hero**

Use type scale to communicate hierarchy, not images:

```jsx
<h1 className="text-5xl font-display">Large, expressive</h1>
<h2 className="text-4xl font-display">Section emphasis</h2>
<p className="text-lg">Prominent supporting text</p>
<p className="text-base">Body copy</p>
```

### 4. **Respect the Spacing Scale**

Always use defined spacing tokens; never arbitrary values:

```jsx
❌ Bad:  <div className="mt-[37px]">  // arbitrary
✅ Good: <div className="mt-lg">      // mt-40 (custom lg scale)
```

### 5. **Animate with Purpose**

Motion should enhance storytelling, not distract:

```jsx
✅ Good: Letter-by-letter headline reveal (builds anticipation)
✅ Good: Scroll-triggered section fades (guides eye on journey)
❌ Bad:  Constantly rotating elements (distracting)
```

### 6. **Asymmetry is Intentional**

Every offset, rotation, and overlap has reason:

```jsx
/* This rotation is intentional—not randomly applied */
<div className="rotate-subtle">Artisan card with character</div>

/* Grid intentionally breaks at defined offsets */
<div className="absolute top-[240px] left-[40%]">Not aligned</div>
```

### 7. **Fabric Texture Everywhere**

Subtly layer grain/texture on dark backgrounds:

```jsx
<section className="bg-rust-section">
  {/* .bg-rust-section applies dark grain automatically via ::before */}
</section>
```

### 8. **Premium Shadows, Not Bright Borders**

Use depth, not lines:

```jsx
✅ Good: className="shadow-premium"
❌ Bad:  className="border-4 border-bright-color"
```

---

## Responsive Behavior

The design system is **desktop-first** (experimental, premium feel):

```jsx
/* Stack on small screens */
<div className="grid gap-8 md:grid-cols-3">
  {/* Single column mobile, 3-column on md+ */}
</div>

/* Adjust type sizes */
<h1 className="text-4xl md:text-5xl">
  {/* Smaller on mobile, full size on desktop */}
</h1>
```

---

## Common Patterns by Component

### Card Variant
```jsx
<article className="card-artisan">
  <h3 className="text-2xl font-display">Title</h3>
  <p className="text-base text-charcoal/85">Description</p>
</article>
```

### Section with Intro
```jsx
<section className="py-[160px] px-[12%]">
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}>
    <h2 className="text-5xl font-display">Heading</h2>
    <p className="text-lg text-charcoal/80 max-w-2xl">Intro copy</p>
  </motion.div>
</section>
```

### Asymmetrical Two-Column
```jsx
<div className="grid gap-8 md:grid-cols-[1fr_1.2fr] items-center">
  <div className="space-y-6">Left (narrower) content</div>
  <div className="offset-right">Right (wider) visual, offset</div>
</div>
```

---

## Extending the System

**To add a new color:**

```js
// In tailwind.config.mjs
colors: {
  // ... existing
  myCustomColor: "#abcdef"
}
```

**To add a new spacing value:**

```js
spacing: {
  // ... existing
  "5xl": "300px"
}
```

**To add a new utility:**

```css
/* In globals.css @layer utilities */
.my-new-utility {
  property: value;
}
```

---

## Production Checklist

- [ ] All fonts load correctly (Playfair Display + Sora from Google Fonts)
- [ ] Tailwind config includes all custom colors and spacing
- [ ] Animations respect prefers-reduced-motion
- [ ] Section spacing follows 160px/240px pattern
- [ ] All CTAs use btn-primary or btn-secondary classes
- [ ] Asymmetrical layouts verified on desktop + mobile
- [ ] Texture overlays visible on dark backgrounds
- [ ] No arbitrary Tailwind values in production code

---

This design system is meant to be **extended, not constrained**. Use it as a foundation for premium, experimental interfaces.
