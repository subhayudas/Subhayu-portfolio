"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp" | "scaleDown" | "blurIn" | "blurInUp" | "rotateX" | "rotateY";
  by?: "character" | "word" | "line";
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  rotateX: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  rotateY: {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  },
};

export default function TextAnimate({
  children,
  className,
  animation = "fadeIn",
  by = "word",
  duration = 0.5,
  delay = 0,
  staggerChildren = 0.1,
  repeat = 0,
  repeatType = "loop",
  repeatDelay = 0,
}: TextAnimateProps) {
  const variants = animationVariants[animation];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        repeat,
        repeatType,
        repeatDelay,
      },
    },
  };

  const splitText = (text: string, splitBy: "character" | "word" | "line") => {
    switch (splitBy) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      default:
        return text.split(" ");
    }
  };

  const textArray = splitText(children, by);

  return (
    <motion.div
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={childVariants}
          style={{ marginRight: by === "word" ? "0.25em" : "0" }}
        >
          {item}
          {by === "line" && index < textArray.length - 1 && <br />}
        </motion.span>
      ))}
    </motion.div>
  );
} 