import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type PushNavViewportProps = ComponentPropsWithoutRef<"div">;

export function PushNavViewport({
  className,
  ...props
}: PushNavViewportProps) {
  return (
    <div
      {...props}
      className={cn("relative h-full min-h-0 overflow-hidden", className)}
    />
  );
}
