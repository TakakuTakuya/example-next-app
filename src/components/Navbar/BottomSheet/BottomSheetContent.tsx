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
import { useBottomSheetItem } from "./BottomSheetItemContext";
import { useBottomSheetRoot } from "./BottomSheetRootContext";

const subscribeToHydration = () => () => {};

type BottomSheetContentProps = Omit<
  ComponentPropsWithoutRef<"dialog">,
  "aria-labelledby" | "id" | "open" | "title"
> & {
  title: string;
};

export function BottomSheetContent({
  children,
  className,
  title,
  onCancel: onCancelProp,
  onClose: onCloseProp,
  onKeyDown: onKeyDownProp,
  ...props
}: BottomSheetContentProps) {
  const {
    closeSheet,
    activeValue,
    handleDialogClose,
    setDialogElement,
    showDialog,
  } = useBottomSheetRoot();
  const { contentId, titleId, value } = useBottomSheetItem();
  const open = activeValue === value;
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const setContentDialogElement = useCallback(
    (element: HTMLDialogElement | null) => {
      setDialogElement(value, element);
    },
    [setDialogElement, value],
  );

  useLayoutEffect(() => {
    if (open && mounted) {
      showDialog(value);
    }
  }, [mounted, open, showDialog, value]);

  if (!open || !mounted) return null;

  const handleCancel: ReactEventHandler<HTMLDialogElement> = (event) => {
    onCancelProp?.(event);
  };

  const handleClose: ReactEventHandler<HTMLDialogElement> = (event) => {
    onCloseProp?.(event);
    handleDialogClose(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDialogElement> = (event) => {
    onKeyDownProp?.(event);

    if (!event.defaultPrevented && event.key === "Escape") {
      event.preventDefault();
      closeSheet();
    }
  };

  const handleCloseButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    closeSheet();
  };

  return createPortal(
    <dialog
      {...props}
      ref={setContentDialogElement}
      id={contentId}
      className={`fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none animate-bottom-sheet-in overflow-visible border-0 bg-transparent p-0 text-ink backdrop:bg-ink/45 backdrop:backdrop-blur-[2px] motion-reduce:animate-none ${className ?? ""}`}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className="relative">
        <button
          type="button"
          className="absolute right-4 bottom-full z-10 mb-2 inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-muted shadow-[0_8px_24px_rgb(21_47_38/18%)] transition-colors duration-150 hover:bg-[#eff3ee] hover:text-ink focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
          aria-label="閉じる"
          onClick={handleCloseButtonClick}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="flex max-h-[min(80dvh,720px)] min-h-0 flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_-24px_60px_rgb(21_47_38/18%)]">
          <div className="flex shrink-0 items-center border-b border-line px-5 py-4">
            <h2 id={titleId} className="text-lg font-[760]">
              {title}
            </h2>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pt-5 pb-[calc(24px+env(safe-area-inset-bottom))]">
            {children}
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
