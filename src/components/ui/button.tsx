import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-about_me_blue hover:bg-about_me_blue/90 text-white",
  destructive: "bg-red-500 text-white hover:bg-red-500/90",
  outline:
    "border border-dark_border bg-transparent hover:bg-gray-300 text-white",
  secondary: "bg-gray-300 text-white hover:bg-gray-300/80",
  ghost: "hover:bg-gray-300 hover:text-white",
  link: "text-about_me_blue underline-offset-4 hover:underline",
  resume:
    "bg-gradient-to-r from-about_me_blue via-blue-600 to-indigo-600 hover:from-about_me_blue/90 hover:via-blue-600/90 hover:to-indigo-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-400/20",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    if (asChild) {
      return (
        <span
          className={cn(
            baseClasses,
            buttonVariants[variant],
            buttonSizes[size],
            className,
          )}
          ref={ref as React.Ref<HTMLSpanElement>}
          {...props}
        />
      );
    }
    return (
      <button
        className={cn(
          baseClasses,
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
