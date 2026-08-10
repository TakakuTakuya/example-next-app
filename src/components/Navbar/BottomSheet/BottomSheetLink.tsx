import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { useBottomSheetRoot } from "./BottomSheetRootContext";

type BottomSheetLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function BottomSheetLink({
  onClick: onClickProp,
  ...props
}: BottomSheetLinkProps) {
  const { closeSheet } = useBottomSheetRoot();

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
      closeSheet({ restoreFocus: false });
    }
  };

  return <Link {...props} onClick={handleClick} />;
}
