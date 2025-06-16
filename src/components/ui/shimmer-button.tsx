"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/25",
          "before:absolute before:inset-0 before:overflow-hidden before:rounded-[inherit] before:border before:border-white/20 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:[background-size:var(--cut)_100%] before:[mask:linear-gradient(var(--spread),transparent_calc(50%-var(--cut)),white_50%,transparent_calc(50%+var(--cut)))] group-hover:before:animate-[shimmer_var(--speed)_infinite] group-hover:before:opacity-100",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton }; 