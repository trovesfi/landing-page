"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { FadeInProps } from "@/types";

const ease = [0.25, 0.1, 0.25, 1] as const;

const motionMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  header: motion.header,
  footer: motion.footer,
  li: motion.li,
} as const;

export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 24,
  as = "div",
  once = true,
}: FadeInProps) => {
  const Component = motionMap[as] ?? motion.div;

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Component>
  );
};
