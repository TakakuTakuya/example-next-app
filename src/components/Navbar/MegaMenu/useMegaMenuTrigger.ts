import {
  useRef,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type PointerEventHandler,
} from "react";
import { NAVIGATION_FOCUSABLE_SELECTOR } from "../constants";
import { FOCUS_CLOSE_DELAY_MS } from "./constants";
import { useMegaMenuItem } from "./MegaMenuItemContext";
import { useMegaMenuRoot } from "./MegaMenuRootContext";

interface UseMegaMenuTriggerOptions<Element extends HTMLElement> {
  onBlur?: FocusEventHandler<Element>;
  onFocus?: FocusEventHandler<Element>;
  onKeyDown?: KeyboardEventHandler<Element>;
  onPointerCancel?: PointerEventHandler<Element>;
  onPointerDown?: PointerEventHandler<Element>;
  onPointerEnter?: PointerEventHandler<Element>;
  onPointerLeave?: PointerEventHandler<Element>;
  onPointerUp?: PointerEventHandler<Element>;
}

export function useMegaMenuTrigger<Element extends HTMLElement>({
  onBlur: onBlurProp,
  onFocus: onFocusProp,
  onKeyDown: onKeyDownProp,
  onPointerCancel: onPointerCancelProp,
  onPointerDown: onPointerDownProp,
  onPointerEnter: onPointerEnterProp,
  onPointerLeave: onPointerLeaveProp,
  onPointerUp: onPointerUpProp,
}: UseMegaMenuTriggerOptions<Element>) {
  const menu = useMegaMenuRoot();
  const item = useMegaMenuItem();
  const lastPointerTypeRef = useRef<string | null>(null);
  const isOpen = menu.activeValue === item.value;

  const focusContentItem = (fromEnd: boolean) => {
    window.requestAnimationFrame(() => {
      const content = document.getElementById(item.contentId);
      const focusableItems = content?.querySelectorAll<HTMLElement>(
        NAVIGATION_FOCUSABLE_SELECTOR,
      );

      if (!focusableItems?.length) return;
      focusableItems[fromEnd ? focusableItems.length - 1 : 0]?.focus();
    });
  };

  const handlePointerCancel: PointerEventHandler<Element> = (event) => {
    onPointerCancelProp?.(event);
    lastPointerTypeRef.current = null;
  };

  const handlePointerDown: PointerEventHandler<Element> = (event) => {
    onPointerDownProp?.(event);
    lastPointerTypeRef.current = event.pointerType;
  };

  const handlePointerEnter: PointerEventHandler<Element> = (event) => {
    onPointerEnterProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.openMenu(item.value, event.currentTarget);
    }
  };

  const handlePointerLeave: PointerEventHandler<Element> = (event) => {
    onPointerLeaveProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.scheduleClose();
    }
  };

  const handlePointerUp: PointerEventHandler<Element> = (event) => {
    onPointerUpProp?.(event);
    lastPointerTypeRef.current = null;
  };

  const handleFocus: FocusEventHandler<Element> = (event) => {
    onFocusProp?.(event);

    const pointerType = lastPointerTypeRef.current;
    lastPointerTypeRef.current = null;
    const isTouchFocus = pointerType === "touch" || pointerType === "pen";
    const suppressOpen = menu.consumeFocusOpenSuppression(
      event.currentTarget,
    );

    if (
      !event.defaultPrevented &&
      !isTouchFocus &&
      !suppressOpen &&
      !isOpen
    ) {
      menu.openMenu(item.value, event.currentTarget);
    }
  };

  const handleBlur: FocusEventHandler<Element> = (event) => {
    onBlurProp?.(event);

    if (!event.defaultPrevented) {
      menu.scheduleClose(FOCUS_CLOSE_DELAY_MS);
    }
  };

  const handleKeyDown: KeyboardEventHandler<Element> = (event) => {
    onKeyDownProp?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      menu.openMenu(item.value, event.currentTarget);
      focusContentItem(event.key === "ArrowUp");
    }
  };

  return {
    isOpen,
    item,
    menu,
    triggerProps: {
      id: item.triggerId,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? item.contentId : undefined,
      "data-state": isOpen ? "open" : "closed",
      onPointerCancel: handlePointerCancel,
      onPointerDown: handlePointerDown,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onPointerUp: handlePointerUp,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
  };
}
