import { createContext, useContext } from "react";

export type BottomSheetItemContextValue = {
  value: string;
  contentId: string;
  titleId: string;
};

export const BottomSheetItemContext =
  createContext<BottomSheetItemContextValue | null>(null);

export function useBottomSheetItem() {
  const context = useContext(BottomSheetItemContext);

  if (!context) {
    throw new Error(
      "BottomSheet.Trigger and Content must be used inside BottomSheet.Item",
    );
  }

  return context;
}
