import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-md bg-cyan-400/20 px-2 py-1 text-xs font-semibold text-cyan-200", className)}>
      {children}
    </span>
  );
}
