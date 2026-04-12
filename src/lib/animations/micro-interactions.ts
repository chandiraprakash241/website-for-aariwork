export const microEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const hoverLift = {
  y: -6,
  scale: 1.02,
  transition: {
    duration: 0.35,
    ease: microEase
  }
};

export const tapPress = {
  scale: 0.97,
  transition: {
    duration: 0.18,
    ease: microEase
  }
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: microEase
    }
  }
};

export const cursorFollow = {
  dotLerp: 0.34,
  ringLerp: 0.18
};
