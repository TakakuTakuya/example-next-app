import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type MegaMenuListProps = HTMLAttributes<HTMLUListElement>;

export function MegaMenuList({ className, ...props }: MegaMenuListProps) {
  return (
    <ul
      className={cn(
        "flex h-full list-none items-center gap-0.5 p-0",
        className,
      )}
      {...props}
    />
  );
}
