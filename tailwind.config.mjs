/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      /* Aari Threads Design System */
      oxblood: "#4a1a1f",
      brass: "#c4963d",
      charcoal: "#2a2420",
      cream: "#f5ede0",
      taupe: "#d4c4b0",
      rust: "#8b3a3a",
      gold: "#f0e6c8",
      /* Utility colors */
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent"
    },
    fontFamily: {
      display: ["'Playfair Display'", "serif"],
      body: ["'Sora'", "'Inter'", "system-ui", "sans-serif"]
    },
    spacing: {
      xs: "8px",
      sm: "16px",
      md: "24px",
      lg: "40px",
      xl: "64px",
      "2xl": "120px",
      "3xl": "160px",
      "4xl": "240px",
      /* Standard Tailwind multiples for flexibility */
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      6: "1.5rem",
      8: "2rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
      48: "12rem",
      64: "16rem"
    },
    fontSize: {
      xs: ["11px", { lineHeight: "1.8", letterSpacing: "2px" }],
      sm: ["12px", { lineHeight: "1.4", letterSpacing: "1.2px" }],
      base: ["16px", { lineHeight: "1.7", letterSpacing: "0.3px" }],
      lg: ["20px", { lineHeight: "1.6", letterSpacing: "0.5px" }],
      xl: ["24px", { lineHeight: "1.5", letterSpacing: "-0.5px" }],
      "2xl": ["32px", { lineHeight: "1.4", letterSpacing: "-1px" }],
      "3xl": ["42px", { lineHeight: "1.3", letterSpacing: "-1px" }],
      "4xl": ["64px", { lineHeight: "1.2", letterSpacing: "-2px" }],
      "5xl": ["92px", { lineHeight: "1.1", letterSpacing: "-3px" }]
    },
    fontWeight: {
      "400": "400",
      "600": "600",
      "700": "700"
    },
    letterSpacing: {
      tight: "-3px",
      normal: "0px",
      wide: "0.5px",
      wider: "1.2px",
      widest: "2px"
    },
    lineHeight: {
      tight: "1.1",
      snug: "1.3",
      normal: "1.5",
      relaxed: "1.6",
      loose: "1.8"
    },
    boxShadow: {
      "premium": "0 16px 48px rgba(42, 36, 32, 0.12)",
      "subtle": "0 4px 12px rgba(42, 36, 32, 0.08)",
      "none": "none"
    },
    backgroundImage: {
      "fabric-weave": "linear-gradient(36deg, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
      "grain-light": "linear-gradient(36deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
      "grain-dark": "linear-gradient(36deg, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)"
    },
    borderRadius: {
      "minimal": "2px",
      "sm": "4px",
      "md": "6px",
      "lg": "8px",
      "xl": "12px",
      "2xl": "16px",
      "4xl": "24px"
    },
    keyframes: {
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" }
      },
      "slide-up": {
        "0%": { opacity: "0", transform: "translateY(24px)" },
        "100%": { opacity: "1", transform: "translateY(0)" }
      },
      "scale-in": {
        "0%": { opacity: "0", transform: "scale(0.92)" },
        "100%": { opacity: "1", transform: "scale(1)" }
      },
      "shimmer": {
        "0%": { backgroundPosition: "0% 0%" },
        "100%": { backgroundPosition: "100% 0%" }
      },
      "subtle-float": {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-8px)" }
      },
      "thread-draw": {
        "0%": { strokeDashoffset: "1000" },
        "100%": { strokeDashoffset: "0" }
      }
    },
    animation: {
      "fade": "fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      "slide": "slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      "scale": "scale-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      "shimmer": "shimmer 2s linear infinite",
      "float": "subtle-float 4s ease-in-out infinite",
      "draw": "thread-draw 1.2s ease-out forwards"
    }
  },
  plugins: [
    plugin(function({ addComponents, addUtilities, matchUtilities, theme }) {
      /* Asymmetrical Layout Utilities */
      addUtilities({
        ".offset-left": {
          marginLeft: "12%"
        },
        ".offset-right": {
          marginRight: "12%"
        },
        ".float-up": {
          transform: "translateY(-40px)"
        },
        ".rotate-subtle": {
          transform: "rotate(-1.2deg)"
        },
        ".rotate-subtle-cw": {
          transform: "rotate(1.8deg)"
        },
        /* Premium transition */
        ".transition-premium": {
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
        },
        ".duration-editorial": {
          transitionDuration: "0.6s"
        },
        /* Text animation ready */
        ".text-mask": {
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        },
        /* Premium grain overlay */
        ".fabric-texture": {
          backgroundImage: "linear-gradient(36deg, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0"
        }
      });

      /* Button variants */
      addComponents({
        ".btn-primary": {
          backgroundColor: theme("colors.brass"),
          color: theme("colors.cream"),
          padding: "18px 48px",
          borderRadius: theme("borderRadius.minimal"),
          fontFamily: theme("fontFamily.display")[0],
          fontWeight: "700",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 10px 24px rgba(196, 150, 61, 0.22)",
          transform: "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          "&:hover": {
            backgroundColor: "#d4a751",
            transform: "translateY(-4px)",
            boxShadow: "0 18px 36px rgba(196, 150, 61, 0.35)"
          },
          "&:active": {
            transform: "translateY(-1px) scale(0.98)",
            boxShadow: "0 8px 18px rgba(196, 150, 61, 0.2)"
          }
        },
        ".btn-secondary": {
          backgroundColor: "transparent",
          border: `1.5px solid ${theme("colors.brass")}`,
          color: theme("colors.charcoal"),
          padding: "16px 40px",
          borderRadius: theme("borderRadius.minimal"),
          fontWeight: "600",
          fontSize: "16px",
          cursor: "pointer",
          transform: "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          "&:hover": {
            backgroundColor: "rgba(240, 230, 200, 0.1)",
            borderColor: theme("colors.charcoal"),
            transform: "translateY(-3px)",
            boxShadow: "0 14px 26px rgba(42, 36, 32, 0.16)"
          },
          "&:active": {
            transform: "translateY(-1px) scale(0.98)",
            boxShadow: "0 8px 16px rgba(42, 36, 32, 0.12)"
          }
        }
      });

      /* Section containers */
      addComponents({
        ".section-container": {
          width: "100%",
          paddingLeft: "12%",
          paddingRight: "12%"
        },
        ".bleed-left": {
          marginLeft: "-12%",
          paddingLeft: "12%"
        },
        ".bleed-right": {
          marginRight: "-12%",
          paddingRight: "12%"
        },
        ".break-grid": {
          display: "grid",
          gridAutoFlow: "dense",
          gap: "24px"
        }
      });
    })
  ]
};

export default config;
