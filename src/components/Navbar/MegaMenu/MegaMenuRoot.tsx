import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEventHandler,
} from "react";
import { DESKTOP_NAVIGATION_MEDIA_QUERY } from "../constants";
import {
  CONTENT_TOP_OFFSET_PX,
  POINTER_CLOSE_DELAY_MS,
} from "./constants";
import {
  MegaMenuRootContext,
  type MegaMenuRootContextValue,
} from "./MegaMenuRootContext";
import {
  activateMegaMenuRoot,
  deactivateMegaMenuRoot,
} from "./MegaMenuRootCoordinator";

type MegaMenuRootProps = ComponentPropsWithoutRef<"nav">;

export function MegaMenuRoot({
  children,
  className,
  onKeyDown,
  ...props
}: MegaMenuRootProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);
  const rootKeyRef = useRef<object>({});
  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const suppressedFocusTriggerRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathnameRef = useRef(pathname);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [layerSlot, setLayerSlotState] = useState<HTMLDivElement | null>(null);
  const [layerTop, setLayerTop] = useState(0);
  const [triggerInlineEndOffset, setTriggerInlineEndOffset] = useState(0);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(
    (restoreFocus = false) => {
      cancelScheduledClose();
      deactivateMegaMenuRoot(rootKeyRef.current);
      setActiveValue(null);

      const trigger = activeTriggerRef.current;
      activeTriggerRef.current = null;

      if (restoreFocus && trigger && document.activeElement !== trigger) {
        suppressedFocusTriggerRef.current = trigger;
        trigger.focus({ preventScroll: true });

        // focus events are synchronous. Clear a stale suppression when focus failed.
        if (suppressedFocusTriggerRef.current === trigger) {
          suppressedFocusTriggerRef.current = null;
        }

        // Moving focus out of Content fires its blur handler during focus().
        cancelScheduledClose();
      }
    },
    [cancelScheduledClose],
  );

  const openMenu = useCallback(
    (value: string, trigger: HTMLElement) => {
      cancelScheduledClose();
      activateMegaMenuRoot(rootKeyRef.current, closeMenu);
      activeTriggerRef.current = trigger;
      setActiveValue(value);
    },
    [cancelScheduledClose, closeMenu],
  );

  const scheduleClose = useCallback(
    (delay = POINTER_CLOSE_DELAY_MS) => {
      cancelScheduledClose();
      closeTimerRef.current = setTimeout(() => {
        closeMenu();
      }, delay);
    },
    [cancelScheduledClose, closeMenu],
  );

  const consumeFocusOpenSuppression = useCallback(
    (trigger: HTMLElement) => {
      if (suppressedFocusTriggerRef.current !== trigger) return false;

      suppressedFocusTriggerRef.current = null;
      return true;
    },
    [],
  );

  const setLayerSlot = useCallback((node: HTMLDivElement | null) => {
    setLayerSlotState(node);
  }, []);

  useLayoutEffect(() => {
    if (!activeValue) return;

    const updatePosition = () => {
      const trigger = activeTriggerRef.current;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const navigationRowRect =
        rootRef.current?.parentElement?.getBoundingClientRect();
      const itemRect = trigger.parentElement?.getBoundingClientRect();
      const slotRect = layerSlot?.getBoundingClientRect();
      const isRightToLeft = getComputedStyle(trigger).direction === "rtl";
      const navigationTop =
        navigationRowRect?.top ?? itemRect?.top ?? triggerRect.top;
      const contentTop = navigationTop + CONTENT_TOP_OFFSET_PX;

      setLayerTop(contentTop);
      setTriggerInlineEndOffset(
        slotRect
          ? isRightToLeft
            ? triggerRect.left - slotRect.left
            : slotRect.right - triggerRect.right
          : 0,
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [activeValue, layerSlot]);

  useEffect(() => {
    if (!activeValue) return;

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      if (layerSlot?.contains(target)) return;

      closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [activeValue, closeMenu, layerSlot]);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      closeMenu();
    }
  }, [closeMenu, pathname]);

  useEffect(() => {
    const rootKey = rootKeyRef.current;

    return () => {
      cancelScheduledClose();
      deactivateMegaMenuRoot(rootKey);
    };
  }, [cancelScheduledClose]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia(
      DESKTOP_NAVIGATION_MEDIA_QUERY,
    );
    const handleChange = () => {
      if (!desktopNavigation.matches) {
        closeMenu();
      }
    };

    handleChange();
    desktopNavigation.addEventListener("change", handleChange);

    return () => desktopNavigation.removeEventListener("change", handleChange);
  }, [closeMenu]);

  const contextValue = useMemo<MegaMenuRootContextValue>(
    () => ({
      activeValue,
      layerSlot,
      layerTop,
      triggerInlineEndOffset,
      openMenu,
      closeMenu,
      scheduleClose,
      cancelScheduledClose,
      consumeFocusOpenSuppression,
      setLayerSlot,
    }),
    [
      activeValue,
      cancelScheduledClose,
      closeMenu,
      consumeFocusOpenSuppression,
      layerSlot,
      layerTop,
      triggerInlineEndOffset,
      openMenu,
      scheduleClose,
      setLayerSlot,
    ],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && activeValue) {
      event.preventDefault();
      closeMenu(true);
    }
  };

  return (
    <MegaMenuRootContext.Provider value={contextValue}>
      <nav
        {...props}
        ref={rootRef}
        className={className}
        onKeyDown={handleKeyDown}
      >
        {children}
      </nav>
    </MegaMenuRootContext.Provider>
  );
}
