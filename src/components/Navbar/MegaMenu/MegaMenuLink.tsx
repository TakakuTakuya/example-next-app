import {
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { cn } from "@/lib/cn";
import { NavbarMenuItem } from "../NavbarMenuItem";
import { MegaMenuPointerBridge } from "./MegaMenuPointerBridge";
import { useMegaMenuTrigger } from "./useMegaMenuTrigger";

type MegaMenuLinkProps = Omit<
  ComponentProps<typeof NavbarMenuItem>,
  "aria-controls" | "aria-expanded" | "id"
>;

export function MegaMenuLink({
  children,
  className,
  onClick: onClickProp,
  onPointerCancel: onPointerCancelProp,
  onPointerDown: onPointerDownProp,
  onPointerEnter: onPointerEnterProp,
  onPointerLeave: onPointerLeaveProp,
  onPointerUp: onPointerUpProp,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onKeyDown: onKeyDownProp,
  ...props
}: MegaMenuLinkProps) {
  const { isOpen, menu, triggerProps } =
    useMegaMenuTrigger<HTMLAnchorElement>({
      onPointerCancel: onPointerCancelProp,
      onPointerDown: onPointerDownProp,
      onPointerEnter: onPointerEnterProp,
      onPointerLeave: onPointerLeaveProp,
      onPointerUp: onPointerUpProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onKeyDown: onKeyDownProp,
    });

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented) {
      menu.closeMenu();
    }
  };

  return (
    <>
      <NavbarMenuItem
        {...props}
        {...triggerProps}
        className={cn("z-10", className)}
        onClick={handleClick}
      >
        {children}
      </NavbarMenuItem>
      {isOpen && <MegaMenuPointerBridge />}
    </>
  );
}
