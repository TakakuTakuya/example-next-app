import {
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
  type PointerEventHandler,
} from "react";
import { cn } from "@/lib/cn";
import { useMegaMenuTrigger } from "./useMegaMenuTrigger";

type MegaMenuTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "aria-expanded" | "id"
>;

export function MegaMenuTrigger({
  className,
  onBlur: onBlurProp,
  onClick: onClickProp,
  onFocus: onFocusProp,
  onKeyDown: onKeyDownProp,
  onPointerCancel: onPointerCancelProp,
  onPointerDown: onPointerDownProp,
  onPointerEnter: onPointerEnterProp,
  onPointerLeave: onPointerLeaveProp,
  onPointerUp: onPointerUpProp,
  type = "button",
  ...props
}: MegaMenuTriggerProps) {
  const activationPointerTypeRef = useRef<string | null>(null);

  const handlePointerCancelProp: PointerEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    onPointerCancelProp?.(event);
    activationPointerTypeRef.current = null;
  };

  const handlePointerDownProp: PointerEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    onPointerDownProp?.(event);
    activationPointerTypeRef.current = event.pointerType;
  };

  const handlePointerUpProp: PointerEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    onPointerUpProp?.(event);

    window.setTimeout(() => {
      activationPointerTypeRef.current = null;
    }, 0);
  };

  const { isOpen, item, menu, triggerProps } =
    useMegaMenuTrigger<HTMLButtonElement>({
      onPointerCancel: handlePointerCancelProp,
      onPointerDown: handlePointerDownProp,
      onPointerEnter: onPointerEnterProp,
      onPointerLeave: onPointerLeaveProp,
      onPointerUp: handlePointerUpProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onKeyDown: onKeyDownProp,
    });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClickProp?.(event);
    if (event.defaultPrevented) return;

    const pointerType = activationPointerTypeRef.current;
    activationPointerTypeRef.current = null;

    // Mouse hover has already opened the panel. Keep it open on click.
    if (pointerType === "mouse" && isOpen) return;

    if (isOpen) {
      menu.closeMenu();
    } else {
      menu.openMenu(item.value, event.currentTarget);
    }
  };

  return (
    <button
      {...props}
      {...triggerProps}
      type={type}
      className={cn("cursor-pointer", className)}
      onClick={handleClick}
    />
  );
}
