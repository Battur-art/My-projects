"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const Stagger: React.FC<StaggerProps> = ({ children, delay = 0, stagger = 0.08, className }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0% 0% 0% 0%" }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div variants={item} key={i}>{child as React.ReactNode}</motion.div>
      ))}
    </motion.div>
  );
};

export default Stagger;
