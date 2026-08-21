import type { PointerEventHandler } from "react";
import { useMegaMenuRoot } from "./MegaMenuRootContext";

export function MegaMenuPointerBridge() {
  const menu = useMegaMenuRoot();

  const handlePointerEnter: PointerEventHandler<HTMLSpanElement> = (event) => {
    if (event.pointerType === "mouse") {
      menu.cancelScheduledClose();
    }
  };

  const handlePointerLeave: PointerEventHandler<HTMLSpanElement> = (event) => {
    if (event.pointerType === "mouse") {
      menu.scheduleClose();
    }
  };

  return (
    <span
      className="pointer-events-auto absolute inset-x-0 top-1/2 bottom-0 z-0 block"
      aria-hidden="true"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    />
  );
}
