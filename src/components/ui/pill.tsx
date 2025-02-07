import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-neutral-800",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-900 text-neutral-50 shadow dark:bg-neutral-50 dark:text-neutral-900",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
        destructive:
          "border-transparent bg-red-500 text-neutral-50 shadow dark:bg-red-900 dark:text-neutral-50",
        outline: "text-neutral-950 dark:text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Pill({ className, variant, ...props }: PillProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Pill, badgeVariants };
