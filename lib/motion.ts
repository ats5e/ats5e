// Shared framer-motion variants
// Bezier must be typed as a 4-tuple to satisfy framer-motion v12 Easing types
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay:    i * 0.08,
      duration: 0.7,
      ease:     EASE,
    },
  }),
};
