"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { forwardRef, useRef } from "react";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#ffaa40",
      gradientStopColor = "#9c40ff",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref
  ) => {
    const id = React.useId();
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    React.useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        updatePath();
      });

      const updatePath = () => {
        if (
          containerRef.current &&
          fromRef.current &&
          toRef.current &&
          pathRef.current
        ) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const fromRect = fromRef.current.getBoundingClientRect();
          const toRect = toRef.current.getBoundingClientRect();

          const relativeFromX =
            fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
          const relativeFromY =
            fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
          const relativeToX =
            toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
          const relativeToY =
            toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

          const midX = (relativeFromX + relativeToX) / 2;
          const midY = (relativeFromY + relativeToY) / 2;

          const controlX = midX + curvature;
          const controlY = midY - curvature;

          const d = `M ${relativeFromX},${relativeFromY} Q ${controlX},${controlY} ${relativeToX},${relativeToY}`;
          pathRef.current.setAttribute("d", d);
        }
      };

      updatePath();

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => resizeObserver.disconnect();
    }, [
      containerRef,
      fromRef,
      toRef,
      curvature,
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    ]);

    return (
      <svg
        ref={svgRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className
        )}
        width="100%"
        height="100%"
        viewBox="0 0 100% 100%"
        style={{
          transform: "translateZ(0)",
        }}
      >
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={id}
            gradientUnits="userSpaceOnUse"
            gradientTransform={reverse ? "rotate(180)" : ""}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%" />
            <stop stopColor={gradientStartColor} offset="32.5%" />
            <stop stopColor={gradientStopColor} offset="67.5%" />
            <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d=""
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
        />
        <motion.path
          d=""
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          strokeOpacity="1"
          fill="none"
          pathLength="0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay,
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      </svg>
    );
  }
);

AnimatedBeam.displayName = "AnimatedBeam"; 