import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, open = false, children }, ref) => {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "fixed bottom-4 right-4 z-50 max-w-xs rounded-lg border border-green-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-xl flex items-start gap-2",
              className
            )}
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{children}</span>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Toast.displayName = "Toast";

