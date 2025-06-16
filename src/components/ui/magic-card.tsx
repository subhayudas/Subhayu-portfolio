"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export default function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty("--mouse-x", `${x}px`);
        divRef.current.style.setProperty("--mouse-y", `${y}px`);
      }
    },
    []
  );

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("mousemove", handleMouseMove);
      return () => div.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={divRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl transition-all duration-300 hover:shadow-xl",
        className
      )}
      style={{
        "--gradient-size": `${gradientSize}px`,
        "--gradient-color": gradientColor,
        "--gradient-opacity": gradientOpacity,
      } as React.CSSProperties}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--gradient-color), transparent 80%)`,
          opacity: "var(--gradient-opacity)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}