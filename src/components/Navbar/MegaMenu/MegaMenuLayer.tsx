import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useMegaMenuRoot } from "./MegaMenuRootContext";

type MegaMenuLayerProps = {
  className?: string;
};

const subscribeToHydration = () => () => {};

export function MegaMenuLayer({ className }: MegaMenuLayerProps) {
  const { activeValue, layerTop, setLayerSlot } = useMegaMenuRoot();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <div
      className={`pointer-events-none fixed inset-x-0 z-100 flex justify-center px-5 ${className ?? ""}`}
      style={{ top: layerTop }}
      aria-hidden={activeValue ? undefined : true}
    >
      <div
        ref={setLayerSlot}
        className="flex w-[min(1120px,calc(100vw-40px))] justify-center"
      />
    </div>,
    document.body,
  );
}
