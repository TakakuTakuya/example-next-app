import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DESKTOP_NAVIGATION_MEDIA_QUERY } from "../constants";
import {
  BottomSheetRootContext,
  type BottomSheetRootContextValue,
  type CloseBottomSheetOptions,
} from "./BottomSheetRootContext";

type BottomSheetRootProps = {
  children: ReactNode;
};

export function BottomSheetRoot({ children }: BottomSheetRootProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeDialogValueRef = useRef<string | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeValueRef = useRef<string | null>(null);
  const restoreFocusRef = useRef(true);
  const previousPathnameRef = useRef(pathname);
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const openSheet = useCallback(
    (value: string, trigger: HTMLButtonElement) => {
      if (activeValueRef.current !== null) return;

      activeValueRef.current = value;
      activeTriggerRef.current = trigger;
      restoreFocusRef.current = true;
      setActiveValue(value);
    },
    [],
  );

  const finishClose = useCallback((value: string | null) => {
    if (value && activeValueRef.current !== value) return;

    const trigger = activeTriggerRef.current;
    activeValueRef.current = null;
    activeDialogValueRef.current = null;
    activeTriggerRef.current = null;
    dialogRef.current = null;
    setActiveValue(null);

    if (restoreFocusRef.current && trigger?.isConnected) {
      window.requestAnimationFrame(() => {
        trigger.focus({ preventScroll: true });
      });
    }
  }, []);

  const setDialogElement = useCallback(
    (value: string, element: HTMLDialogElement | null) => {
      if (element) {
        activeDialogValueRef.current = value;
        dialogRef.current = element;
      } else if (activeDialogValueRef.current === value) {
        activeDialogValueRef.current = null;
        dialogRef.current = null;
      }
    },
    [],
  );

  const showDialog = useCallback((value: string) => {
    if (
      activeValueRef.current !== value ||
      activeDialogValueRef.current !== value
    ) {
      return;
    }

    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const closeSheet = useCallback(
    ({ restoreFocus = true }: CloseBottomSheetOptions = {}) => {
      restoreFocusRef.current = restoreFocus;

      if (dialogRef.current?.open) {
        dialogRef.current.close();
      } else {
        finishClose(activeValueRef.current);
      }
    },
    [finishClose],
  );

  useEffect(() => {
    if (!activeValue) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeValue]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    closeSheet({ restoreFocus: false });
  }, [closeSheet, pathname]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia(
      DESKTOP_NAVIGATION_MEDIA_QUERY,
    );
    const handleChange = () => {
      if (desktopNavigation.matches) {
        closeSheet({ restoreFocus: false });
      }
    };

    handleChange();
    desktopNavigation.addEventListener("change", handleChange);

    return () => desktopNavigation.removeEventListener("change", handleChange);
  }, [closeSheet]);

  const contextValue = useMemo<BottomSheetRootContextValue>(
    () => ({
      activeValue,
      setDialogElement,
      showDialog,
      openSheet,
      closeSheet,
      handleDialogClose: finishClose,
    }),
    [
      activeValue,
      closeSheet,
      finishClose,
      openSheet,
      setDialogElement,
      showDialog,
    ],
  );

  return (
    <BottomSheetRootContext.Provider value={contextValue}>
      {children}
    </BottomSheetRootContext.Provider>
  );
}
