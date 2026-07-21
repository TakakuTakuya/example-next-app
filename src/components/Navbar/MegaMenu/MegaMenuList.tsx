import type { HTMLAttributes } from "react";

type MegaMenuListProps = HTMLAttributes<HTMLUListElement>;

export function MegaMenuList({ className, ...props }: MegaMenuListProps) {
  return (
    <ul
      className={`flex h-full list-none items-center gap-0.5 p-0 ${className ?? ""}`}
      {...props}
    />
  );
}
