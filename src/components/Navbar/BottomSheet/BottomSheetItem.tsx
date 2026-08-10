import { useId, useMemo, type ReactNode } from "react";
import {
  BottomSheetItemContext,
  type BottomSheetItemContextValue,
} from "./BottomSheetItemContext";

interface BottomSheetItemProps {
  children: ReactNode;
  value: string;
}

export function BottomSheetItem({
  children,
  value,
}: BottomSheetItemProps) {
  const contentId = useId();
  const contextValue = useMemo<BottomSheetItemContextValue>(
    () => ({ value, contentId }),
    [contentId, value],
  );

  return (
    <BottomSheetItemContext.Provider value={contextValue}>
      {children}
    </BottomSheetItemContext.Provider>
  );
}
