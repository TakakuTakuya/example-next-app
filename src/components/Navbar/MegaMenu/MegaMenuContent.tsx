import {
  type FocusEventHandler,
  type HTMLAttributes,
  type PointerEventHandler,
} from "react";
import { createPortal } from "react-dom";
import { FOCUS_CLOSE_DELAY_MS } from "./constants";
import { useMegaMenuItem } from "./MegaMenuItemContext";
import { useMegaMenuRoot } from "./MegaMenuRootContext";

type MegaMenuContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-labelledby" | "id" | "role"
>;

export function MegaMenuContent({
  className,
  children,
  onPointerEnter: onPointerEnterProp,
  onPointerLeave: onPointerLeaveProp,
  onFocusCapture: onFocusCaptureProp,
  onBlurCapture: onBlurCaptureProp,
  ...props
}: MegaMenuContentProps) {
  const menu = useMegaMenuRoot();
  const item = useMegaMenuItem();

  if (menu.activeValue !== item.value || !menu.layerSlot) {
    return null;
  }

  const handlePointerEnter: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerEnterProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.cancelScheduledClose();
    }
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerLeaveProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.scheduleClose();
    }
  };

  const handleFocusCapture: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocusCaptureProp?.(event);

    if (!event.defaultPrevented) {
      menu.cancelScheduledClose();
    }
  };

  const handleBlurCapture: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlurCaptureProp?.(event);
    const nextTarget = event.relatedTarget;

    if (
      !event.defaultPrevented &&
      (!(nextTarget instanceof Node) ||
        !event.currentTarget.contains(nextTarget))
    ) {
      menu.scheduleClose(FOCUS_CLOSE_DELAY_MS);
    }
  };

  return createPortal(
    <div
      {...props}
      id={item.contentId}
      role="region"
      aria-labelledby={item.linkId}
      className={`pointer-events-auto max-h-[min(680px,calc(100vh-100px))] w-full origin-top overflow-auto rounded-[18px] border border-[#1c382f]/13 bg-white/98 shadow-[0_28px_70px_rgb(21_47_38/18%),0_4px_16px_rgb(21_47_38/8%)] animate-mega-menu-in motion-reduce:animate-none ${className ?? ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      {children}
    </div>,
    menu.layerSlot,
  );
}
