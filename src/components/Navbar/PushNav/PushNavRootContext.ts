import { createContext, useContext } from "react";

export type PushNavRootContextValue = {
  activeValue: string;
  canGoBack: boolean;
  history: readonly string[];
  back: () => void;
  getScreenId: (value: string) => string;
  push: (value: string, trigger: HTMLButtonElement) => void;
  setScreenElement: (
    value: string,
    element: HTMLDivElement | null,
  ) => void;
};

export const PushNavRootContext =
  createContext<PushNavRootContextValue | null>(null);

export function usePushNavRoot() {
  const context = useContext(PushNavRootContext);

  if (!context) {
    throw new Error(
      "PushNav components must be used inside PushNav.Root",
    );
  }

  return context;
}
