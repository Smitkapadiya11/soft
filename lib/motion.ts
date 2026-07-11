import type { Variants, Transition } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const smooth: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const quick: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

export const scrollRevealConfig = {
  once: true,
  margin: "-80px",
} as const;
