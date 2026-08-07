import { createContext, useContext } from "react";

export interface MegaMenuItemContextValue {
  value: string;
  triggerId: string;
  contentId: string;
}

export const MegaMenuItemContext =
  createContext<MegaMenuItemContextValue | null>(null);

export function useMegaMenuItem() {
  const context = useContext(MegaMenuItemContext);

  if (!context) {
    throw new Error(
      "MegaMenu.Link, Trigger, and Content must be used inside MegaMenu.Item",
    );
  }

  return context;
}
