"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInUp, staggerContainer, staggerItem, smooth, scrollRevealConfig } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealConfig}
      transition={{ ...smooth, delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealConfig}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
