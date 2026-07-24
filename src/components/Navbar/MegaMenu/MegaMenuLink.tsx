import {
  useRef,
  type ComponentProps,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type PointerEventHandler,
} from "react";
import { NAVIGATION_FOCUSABLE_SELECTOR } from "../constants";
import { NavbarMenuItem } from "../NavbarMenuItem";
import { FOCUS_CLOSE_DELAY_MS } from "./constants";
import { useMegaMenuItem } from "./MegaMenuItemContext";
import { useMegaMenuRoot } from "./MegaMenuRootContext";

type MegaMenuLinkProps = Omit<
  ComponentProps<typeof NavbarMenuItem>,
  "aria-controls" | "aria-expanded" | "id"
>;

export function MegaMenuLink({
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
  const menu = useMegaMenuRoot();
  const item = useMegaMenuItem();
  const lastPointerTypeRef = useRef<string | null>(null);
  const isOpen = menu.activeValue === item.value;

  const focusContentLink = (fromEnd: boolean) => {
    window.requestAnimationFrame(() => {
      const content = document.getElementById(item.contentId);
      const links = content?.querySelectorAll<HTMLElement>(
        NAVIGATION_FOCUSABLE_SELECTOR,
      );

      if (!links?.length) return;
      links[fromEnd ? links.length - 1 : 0]?.focus();
    });
  };

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented) {
      menu.closeMenu();
    }
  };

  const handlePointerCancel: PointerEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    onPointerCancelProp?.(event);
    lastPointerTypeRef.current = null;
  };

  const handlePointerDown: PointerEventHandler<HTMLAnchorElement> = (event) => {
    onPointerDownProp?.(event);
    lastPointerTypeRef.current = event.pointerType;
  };

  const handlePointerEnter: PointerEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    onPointerEnterProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.openMenu(item.value, event.currentTarget);
    }
  };

  const handlePointerLeave: PointerEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    onPointerLeaveProp?.(event);

    if (event.pointerType === "mouse" && !event.defaultPrevented) {
      menu.scheduleClose();
    }
  };

  const handlePointerUp: PointerEventHandler<HTMLAnchorElement> = (event) => {
    onPointerUpProp?.(event);
    lastPointerTypeRef.current = null;
  };

  const handleFocus: FocusEventHandler<HTMLAnchorElement> = (event) => {
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

  const handleBlur: FocusEventHandler<HTMLAnchorElement> = (event) => {
    onBlurProp?.(event);

    if (!event.defaultPrevented) {
      menu.scheduleClose(FOCUS_CLOSE_DELAY_MS);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = (event) => {
    onKeyDownProp?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      menu.openMenu(item.value, event.currentTarget);
      focusContentLink(event.key === "ArrowUp");
    }
  };

  return (
    <NavbarMenuItem
      {...props}
      id={item.linkId}
      aria-expanded={isOpen}
      aria-controls={isOpen ? item.contentId : undefined}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}
