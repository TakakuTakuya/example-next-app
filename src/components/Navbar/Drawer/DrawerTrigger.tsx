import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { NavbarIconItem } from "../NavbarIconItem";
import { useDrawerRoot } from "./DrawerRootContext";

type DrawerTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "aria-expanded" | "aria-haspopup" | "type"
> & {
  "aria-label": string;
};

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
    <NavbarIconItem
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
