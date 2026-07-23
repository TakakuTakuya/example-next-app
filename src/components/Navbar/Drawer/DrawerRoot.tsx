import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DESKTOP_NAVIGATION_MEDIA_QUERY } from "../constants";
import {
  DrawerRootContext,
  type CloseDrawerOptions,
  type DrawerRootContextValue,
} from "./DrawerRootContext";

type DrawerRootProps = {
  children: ReactNode;
};

export function DrawerRoot({ children }: DrawerRootProps) {
  const pathname = usePathname();
  const contentId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  const restoreFocusRef = useRef(true);
  const previousPathnameRef = useRef(pathname);
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback((trigger: HTMLButtonElement) => {
    if (openRef.current) return;

    openRef.current = true;
    triggerRef.current = trigger;
    restoreFocusRef.current = true;
    setOpen(true);
  }, []);

  const finishClose = useCallback(() => {
    const trigger = triggerRef.current;
    openRef.current = false;
    triggerRef.current = null;
    dialogRef.current = null;
    setOpen(false);

    if (restoreFocusRef.current && trigger?.isConnected) {
      window.requestAnimationFrame(() => {
        trigger.focus({ preventScroll: true });
      });
    }
  }, []);

  const setDialogElement = useCallback(
    (element: HTMLDialogElement | null) => {
      dialogRef.current = element;
    },
    [],
  );

  const showDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (openRef.current && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const closeDrawer = useCallback(
    ({ restoreFocus = true }: CloseDrawerOptions = {}) => {
      restoreFocusRef.current = restoreFocus;

      if (dialogRef.current?.open) {
        dialogRef.current.close();
      } else {
        finishClose();
      }
    },
    [finishClose],
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    closeDrawer({ restoreFocus: false });
  }, [closeDrawer, pathname]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia(
      DESKTOP_NAVIGATION_MEDIA_QUERY,
    );
    const handleChange = () => {
      if (desktopNavigation.matches) {
        closeDrawer({ restoreFocus: false });
      }
    };

    handleChange();
    desktopNavigation.addEventListener("change", handleChange);

    return () => desktopNavigation.removeEventListener("change", handleChange);
  }, [closeDrawer]);

  const contextValue = useMemo<DrawerRootContextValue>(
    () => ({
      contentId,
      titleId,
      open,
      setDialogElement,
      showDialog,
      openDrawer,
      closeDrawer,
      handleDialogClose: finishClose,
    }),
    [
      closeDrawer,
      contentId,
      finishClose,
      open,
      openDrawer,
      setDialogElement,
      showDialog,
      titleId,
    ],
  );

  return (
    <DrawerRootContext.Provider value={contextValue}>
      {children}
    </DrawerRootContext.Provider>
  );
}
