import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { useBottomSheetItem } from "./BottomSheetItemContext";
import { useBottomSheetRoot } from "./BottomSheetRootContext";

type BottomSheetTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "aria-expanded" | "aria-haspopup" | "type"
> & {
  "aria-label": string;
};

export function BottomSheetTrigger({
  onClick: onClickProp,
  ...props
}: BottomSheetTriggerProps) {
  const { activeValue, openSheet } = useBottomSheetRoot();
  const { contentId, value } = useBottomSheetItem();
  const open = activeValue === value;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented) {
      openSheet(value, event.currentTarget);
    }
  };

  return (
    <button
      {...props}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onClick={handleClick}
    />
  );
}
