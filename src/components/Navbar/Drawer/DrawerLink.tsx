import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { useDrawerRoot } from "./DrawerRootContext";

type DrawerLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function DrawerLink({
  onClick: onClickProp,
  ...props
}: DrawerLinkProps) {
  const { closeDrawer } = useDrawerRoot();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClickProp?.(event);

    const opensSeparateBrowsingContext =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === "_blank" ||
      event.currentTarget.hasAttribute("download");

    if (!event.defaultPrevented && !opensSeparateBrowsingContext) {
      closeDrawer({ restoreFocus: false });
    }
  };

  return <Link {...props} onClick={handleClick} />;
}
