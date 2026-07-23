import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { useDrawerRoot } from "./DrawerRootContext";

type DrawerTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "aria-expanded" | "aria-haspopup" | "type"
>;

export function DrawerTrigger({
  onClick: onClickProp,
  ...props
}: DrawerTriggerProps) {
  const { contentId, open, openDrawer } = useDrawerRoot();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented) {
      openDrawer(event.currentTarget);
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
