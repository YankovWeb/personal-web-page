"use client";

import { motion } from "framer-motion";
import { motionEase } from "@/components/motion/reveal";

export function PageHeader({
  title,
  description,
  gradientTitle = false,
}: {
  title: string;
  description: string;
  gradientTitle?: boolean;
}) {
  return (
    <header>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: motionEase }}
        className="text-3xl font-bold"
      >
        {gradientTitle ? <span className="text-gradient">{title}</span> : title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: motionEase }}
        className="mt-2 text-muted"
      >
        {description}
      </motion.p>
    </header>
  );
}
