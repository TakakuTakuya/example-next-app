import { createContext, useContext } from "react";

export type CloseBottomSheetOptions = {
  restoreFocus?: boolean;
};

export type BottomSheetRootContextValue = {
  activeValue: string | null;
  setDialogElement: (
    value: string,
    element: HTMLDialogElement | null,
  ) => void;
  showDialog: (value: string) => void;
  openSheet: (value: string, trigger: HTMLButtonElement) => void;
  closeSheet: (options?: CloseBottomSheetOptions) => void;
  handleDialogClose: (value: string) => void;
};

export const BottomSheetRootContext =
  createContext<BottomSheetRootContextValue | null>(null);

export function useBottomSheetRoot() {
  const context = useContext(BottomSheetRootContext);

  if (!context) {
    throw new Error(
      "BottomSheet.Item must be used inside BottomSheet.Root",
    );
  }

  return context;
}
