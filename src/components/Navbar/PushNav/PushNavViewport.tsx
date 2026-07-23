import { type ComponentPropsWithoutRef } from "react";

type PushNavViewportProps = ComponentPropsWithoutRef<"div">;

export function PushNavViewport({
  className,
  ...props
}: PushNavViewportProps) {
  return (
    <div
      {...props}
      className={`relative h-full min-h-0 overflow-hidden ${className ?? ""}`}
      data-push-nav-viewport=""
    />
  );
}
