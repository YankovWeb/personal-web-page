"use client";

import { motion } from "framer-motion";
import { motionEase } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function MotionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.25, ease: motionEase },
      }}
      className={cn(
        "transition-shadow duration-300 hover:shadow-[0_16px_48px_-24px_var(--toggle-glow)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
