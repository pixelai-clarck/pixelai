"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: keyof typeof paddings;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-zinc-800 bg-zinc-900",
          paddings[padding],
          hover &&
            "transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/80 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps };
