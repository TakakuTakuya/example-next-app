import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEventHandler,
} from "react";
import { POINTER_CLOSE_DELAY_MS } from "./constants";
import {
  MegaMenuRootContext,
  type MegaMenuRootContextValue,
} from "./MegaMenuRootContext";

type MegaMenuRootProps = HTMLAttributes<HTMLDivElement>;

export function MegaMenuRoot({
  children,
  className,
  onKeyDown,
  ...props
}: MegaMenuRootProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const activeAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const suppressedFocusAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathnameRef = useRef(pathname);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [layerSlot, setLayerSlotState] = useState<HTMLDivElement | null>(null);
  const [layerTop, setLayerTop] = useState(0);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (value: string, anchor: HTMLAnchorElement) => {
      cancelScheduledClose();
      activeAnchorRef.current = anchor;
      setActiveValue(value);
    },
    [cancelScheduledClose],
  );

  const closeMenu = useCallback(
    (restoreFocus = false) => {
      cancelScheduledClose();
      setActiveValue(null);

      const anchor = activeAnchorRef.current;
      activeAnchorRef.current = null;

      if (restoreFocus && anchor && document.activeElement !== anchor) {
        suppressedFocusAnchorRef.current = anchor;
        anchor.focus({ preventScroll: true });

        // focus events are synchronous. Clear a stale suppression when focus failed.
        if (suppressedFocusAnchorRef.current === anchor) {
          suppressedFocusAnchorRef.current = null;
        }

        // Moving focus out of Content fires its blur handler during focus().
        cancelScheduledClose();
      }
    },
    [cancelScheduledClose],
  );

  const scheduleClose = useCallback(
    (delay = POINTER_CLOSE_DELAY_MS) => {
      cancelScheduledClose();
      closeTimerRef.current = setTimeout(() => {
        activeAnchorRef.current = null;
        setActiveValue(null);
        closeTimerRef.current = null;
      }, delay);
    },
    [cancelScheduledClose],
  );

  const consumeFocusOpenSuppression = useCallback(
    (anchor: HTMLAnchorElement) => {
      if (suppressedFocusAnchorRef.current !== anchor) return false;

      suppressedFocusAnchorRef.current = null;
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
      const anchor = activeAnchorRef.current;
      if (!anchor) return;

      setLayerTop(anchor.getBoundingClientRect().bottom);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [activeValue]);

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
    return () => cancelScheduledClose();
  }, [cancelScheduledClose]);

  const contextValue = useMemo<MegaMenuRootContextValue>(
    () => ({
      activeValue,
      layerSlot,
      layerTop,
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
      openMenu,
      scheduleClose,
      setLayerSlot,
    ],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && activeValue) {
      event.preventDefault();
      closeMenu(true);
    }
  };

  return (
    <MegaMenuRootContext.Provider value={contextValue}>
      <div
        {...props}
        ref={rootRef}
        className={className}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </MegaMenuRootContext.Provider>
  );
}
