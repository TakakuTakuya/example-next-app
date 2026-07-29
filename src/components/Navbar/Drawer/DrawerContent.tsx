import { X } from "lucide-react";
import {
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactEventHandler,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useDrawerRoot } from "./DrawerRootContext";

const subscribeToHydration = () => () => {};

type DrawerContentProps = Omit<
  ComponentPropsWithoutRef<"dialog">,
  "aria-labelledby" | "id" | "open" | "title"
> & {
  title: string;
};

export function DrawerContent({
  children,
  className,
  title,
  onCancel: onCancelProp,
  onClick: onClickProp,
  onClose: onCloseProp,
  onKeyDown: onKeyDownProp,
  ...props
}: DrawerContentProps) {
  const {
    closeDrawer,
    contentId,
    handleDialogClose,
    open,
    setDialogElement,
    showDialog,
    titleId,
  } = useDrawerRoot();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  const setContentDialogElement = useCallback(
    (element: HTMLDialogElement | null) => {
      setDialogElement(element);
    },
    [setDialogElement],
  );

  useLayoutEffect(() => {
    if (open && mounted) {
      showDialog();
    }
  }, [mounted, open, showDialog]);

  if (!open || !mounted) return null;

  const handleCancel: ReactEventHandler<HTMLDialogElement> = (event) => {
    onCancelProp?.(event);

    if (!event.defaultPrevented) {
      event.preventDefault();
      closeDrawer();
    }
  };

  const handleClose: ReactEventHandler<HTMLDialogElement> = (event) => {
    onCloseProp?.(event);
    handleDialogClose();
  };

  const handleDialogClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented && event.target === event.currentTarget) {
      closeDrawer();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDialogElement> = (event) => {
    onKeyDownProp?.(event);

    if (!event.defaultPrevented && event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
    }
  };

  const handleCloseButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    closeDrawer();
  };

  return createPortal(
    <dialog
      {...props}
      ref={setContentDialogElement}
      id={contentId}
      className={cn(
        "fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-0 text-ink backdrop:bg-ink/45 backdrop:backdrop-blur-[2px]",
        className,
      )}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className="relative h-dvh w-[min(320px,calc(100dvw-52px))] animate-drawer-in motion-reduce:animate-none">
        <button
          type="button"
          className="absolute top-4 left-full z-10 inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-muted shadow-[0_8px_24px_rgb(21_47_38/18%)] transition-colors duration-150 hover:bg-[#eff3ee] hover:text-ink focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
          aria-label="メニューを閉じる"
          onClick={handleCloseButtonClick}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="size-full bg-white shadow-[24px_0_60px_rgb(21_47_38/18%)]">
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
