import { useId, useMemo, type ReactNode } from "react";
import {
  BottomSheetItemContext,
  type BottomSheetItemContextValue,
} from "./BottomSheetItemContext";

type BottomSheetItemProps = {
  children: ReactNode;
  value: string;
};

export function BottomSheetItem({
  children,
  value,
}: BottomSheetItemProps) {
  const contentId = useId();
  const titleId = useId();
  const contextValue = useMemo<BottomSheetItemContextValue>(
    () => ({ value, contentId, titleId }),
    [contentId, titleId, value],
  );

  return (
    <BottomSheetItemContext.Provider value={contextValue}>
      {children}
    </BottomSheetItemContext.Provider>
  );
}
