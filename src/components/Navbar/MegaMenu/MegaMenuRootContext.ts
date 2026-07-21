import { createContext, useContext } from "react";

export type MegaMenuRootContextValue = {
  activeValue: string | null;
  layerSlot: HTMLDivElement | null;
  layerTop: number;
  openMenu: (value: string, anchor: HTMLAnchorElement) => void;
  closeMenu: (restoreFocus?: boolean) => void;
  scheduleClose: (delay?: number) => void;
  cancelScheduledClose: () => void;
  consumeFocusOpenSuppression: (anchor: HTMLAnchorElement) => boolean;
  setLayerSlot: (node: HTMLDivElement | null) => void;
};

export const MegaMenuRootContext =
  createContext<MegaMenuRootContextValue | null>(null);

export function useMegaMenuRoot() {
  const context = useContext(MegaMenuRootContext);

  if (!context) {
    throw new Error("MegaMenu components must be used inside MegaMenu.Root");
  }

  return context;
}
