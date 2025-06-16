"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroAction {
  label: string;
  href: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  gradient?: boolean;
  blur?: boolean;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-dark_bg",
          className,
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
            {blur && (
              <div className="absolute top-0 z-50 h-24 sm:h-32 md:h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow */}
            <div className="absolute inset-auto z-50 h-16 sm:h-24 md:h-36 w-48 sm:w-64 md:w-[28rem] -translate-y-[-30%] rounded-full bg-about_me_blue/60 opacity-80 blur-xl sm:blur-2xl md:blur-3xl" />

            {/* Lamp effect */}
            <motion.div
              initial={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "8rem" }}
              className="absolute top-0 z-30 h-16 sm:h-24 md:h-36 -translate-y-[20%] rounded-full bg-about_me_blue/60 blur-lg sm:blur-xl md:blur-2xl"
            />

            {/* Top line */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-about_me_blue/60"
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "8rem" }}
              whileInView={{ opacity: 1, width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto right-1/2 h-32 sm:h-40 md:h-56 overflow-visible w-[16rem] sm:w-[20rem] md:w-[30rem] bg-gradient-conic from-about_me_blue/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 bg-dark_bg h-20 sm:h-28 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-20 sm:w-28 md:w-40 h-[100%] left-0 bg-dark_bg bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "8rem" }}
              whileInView={{ opacity: 1, width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto left-1/2 h-32 sm:h-40 md:h-56 w-[16rem] sm:w-[20rem] md:w-[30rem] bg-gradient-conic from-transparent via-transparent to-about_me_blue/60 [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-20 sm:w-28 md:w-40 h-[100%] right-0 bg-dark_bg bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-dark_bg h-20 sm:h-28 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ y: 100, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 container flex justify-center flex-1 flex-col px-3 sm:px-4 md:px-5 lg:px-10 gap-2 sm:gap-3 md:gap-4 -translate-y-8 sm:-translate-y-10 md:-translate-y-20"
        >
          <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
            <h1
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-white leading-tight",
                titleClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl px-2 sm:px-0",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6 w-full sm:w-auto",
                  actionsClassName,
                )}
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    asChild
                    className="w-full sm:w-auto min-h-[40px] sm:min-h-[44px] text-sm sm:text-base"
                  >
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
export type { HeroProps, HeroAction };
