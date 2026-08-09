"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------
 * FadeIn — entrada suave (sobe + aparece) quando entra no ecrã.
 * Respeita "prefers-reduced-motion".
 * ----------------------------------------------------------- */
type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function FadeIn({ delay = 0, y = 18, children, ...rest }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------
 * Stagger — container que escalona a entrada dos filhos.
 * Use com <StaggerItem> em cada filho.
 * ----------------------------------------------------------- */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

type StaggerProps = HTMLMotionProps<"div"> & { amount?: number };

export function Stagger({ children, amount = 0.15, ...rest }: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={containerVariants}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={reduce ? undefined : itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}
