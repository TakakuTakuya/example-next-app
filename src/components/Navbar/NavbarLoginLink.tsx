import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const navbarLoginLinkClassName =
  "inline-flex h-[42px] items-center justify-center rounded-full bg-ink px-[19px] text-sm font-[720] text-white transition-[background-color,transform] duration-150 hover:bg-green active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none";

type NavbarLoginLinkProps = ComponentProps<typeof Link>;

/** Navbarのログイン導線に共通するbutton風リンク。 */
export function NavbarLoginLink({
  className,
  ...props
}: NavbarLoginLinkProps) {
  return (
    <Link
      className={cn(navbarLoginLinkClassName, className)}
      {...props}
    />
  );
}
