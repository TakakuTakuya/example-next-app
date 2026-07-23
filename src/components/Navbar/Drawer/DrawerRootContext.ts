import { createContext, useContext } from "react";

export type CloseDrawerOptions = {
  restoreFocus?: boolean;
};

export type DrawerRootContextValue = {
  contentId: string;
  titleId: string;
  open: boolean;
  setDialogElement: (element: HTMLDialogElement | null) => void;
  showDialog: () => void;
  openDrawer: (trigger: HTMLButtonElement) => void;
  closeDrawer: (options?: CloseDrawerOptions) => void;
  handleDialogClose: () => void;
};

export const DrawerRootContext =
  createContext<DrawerRootContextValue | null>(null);

export function useDrawerRoot() {
  const context = useContext(DrawerRootContext);

  if (!context) {
    throw new Error(
      "Drawer.Trigger and Drawer.Content must be used inside Drawer.Root",
    );
  }

  return context;
}
