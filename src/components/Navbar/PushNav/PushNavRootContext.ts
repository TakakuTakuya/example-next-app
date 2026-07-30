import { createContext, useContext } from "react";
import type { PushNavScreenValue } from "../constants";

export interface PushNavRootContextValue {
  activeValue: PushNavScreenValue;
  canGoBack: boolean;
  history: readonly PushNavScreenValue[];
  back: () => void;
  getScreenId: (value: PushNavScreenValue) => string;
  push: (
    value: PushNavScreenValue,
    trigger: HTMLButtonElement,
  ) => void;
  setScreenElement: (
    value: PushNavScreenValue,
    element: HTMLDivElement | null,
  ) => void;
}

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
