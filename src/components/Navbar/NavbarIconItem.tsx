import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type AccessibleName = {
  "aria-label": string;
};

type NavbarIconItemLinkProps = ComponentProps<typeof Link> & AccessibleName;
type NavbarIconItemButtonProps = ComponentPropsWithoutRef<"button"> &
  AccessibleName;
type NavbarIconItemProps =
  | NavbarIconItemLinkProps
  | NavbarIconItemButtonProps;

const baseClassName =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-ink transition-colors duration-150 hover:bg-[#eff3ee] active:bg-[#e5ebe7] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] data-[state=open]:bg-[#eff3ee] motion-reduce:transition-none";

/**
 * モバイルNavbarのアイコン項目に共通する見た目を提供する。
 * hrefがあればLink、それ以外はbuttonとして描画する。
 */
export function NavbarIconItem(props: NavbarIconItemProps) {
  if ("href" in props) {
    const { className, ...linkProps } = props;

    return (
      <Link
        {...linkProps}
        className={cn(baseClassName, className)}
      />
    );
  }

  const { className, type = "button", ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={cn(baseClassName, className)}
    />
  );
}
