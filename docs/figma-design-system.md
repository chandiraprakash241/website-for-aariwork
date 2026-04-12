# Figma Design System Handoff

## Brand Direction

Project codename: Signal Atelier

Tone:
- Editorial precision
- Warmly technical
- Tactile and atmospheric

## Core Tokens

### Color

- Canvas: #F3EFE5
- Ink: #0F1720
- Accent: #C56B32
- Signal: #0E6F6A
- Fog: #DBD2C4

### Typography

- Display: Syne (Headings, large labels)
- Body: Sora (Body text, UI labels)

### Radius

- Card radius: 2rem to 2.2rem
- Pill radius: 9999px

### Elevation

- Aura shadow: 0 24px 60px -24px rgba(12, 25, 38, 0.45)

## Component Map

- Hero panel
  - Intro badge
  - Headline
  - Supporting copy
  - Primary and secondary CTA

- Orb stage
  - Distorted icosahedron core
  - Orbiting torus rings
  - Dual directional highlights

- Signature field
  - Pointer-drawn SVG path
  - Ink progress meter
  - Reset control

## Motion Rules

- Framer Motion:
  - Fade-up entrance for major sections
  - Delicate easing curve for cinematic feel

- GSAP:
  - Hero stagger reveal sequence
  - Slight scale and y-translation for depth

- Three.js:
  - Constant low-frequency float on orb
  - Slow orbital ring drift

## Figma Frame Suggestions

- Desktop keyframe: 1440 x 2200
- Tablet keyframe: 834 x 2100
- Mobile keyframe: 390 x 1900

## Naming Conventions

- Colors: color/canvas, color/ink, color/accent, color/signal, color/fog
- Text styles: display/hero, display/section, body/lg, body/md, body/sm
- Effects: shadow/aura, bg/mesh
