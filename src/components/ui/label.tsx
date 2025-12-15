import * as React from "react";
import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "mb-1 block text-sm font-medium text-slate-800",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

