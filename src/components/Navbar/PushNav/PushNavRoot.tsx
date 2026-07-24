import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { NAVIGATION_FOCUSABLE_SELECTOR } from "../constants";
import {
  PushNavRootContext,
  type PushNavRootContextValue,
} from "./PushNavRootContext";

type PushNavRootProps = ComponentPropsWithoutRef<"div"> & {
  initialValue: string;
};

export function PushNavRoot({
  children,
  className,
  initialValue,
  ...props
}: PushNavRootProps) {
  const id = useId();
  const historyRef = useRef<string[]>([initialValue]);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerHistoryRef = useRef<HTMLButtonElement[]>([]);
  const transitionLockedRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const screenElementsRef = useRef(new Map<string, HTMLDivElement>());
  const [history, setHistory] = useState<string[]>([initialValue]);
  const activeValue = history.at(-1) ?? initialValue;

  const getScreenId = useCallback(
    (value: string) => `${id}-${value}`,
    [id],
  );

  const setScreenElement = useCallback(
    (value: string, element: HTMLDivElement | null) => {
      if (element) {
        screenElementsRef.current.set(value, element);
      } else {
        screenElementsRef.current.delete(value);
      }
    },
    [],
  );

  const focusScreen = useCallback((value: string) => {
    window.requestAnimationFrame(() => {
      const screen = screenElementsRef.current.get(value);
      const focusTarget =
        screen?.querySelector<HTMLElement>("[data-push-nav-focus]") ??
        screen?.querySelector<HTMLElement>(
          NAVIGATION_FOCUSABLE_SELECTOR,
        );

      focusTarget?.focus({ preventScroll: true });
    });
  }, []);

  const startTransition = useCallback(() => {
    if (transitionLockedRef.current) return false;

    transitionLockedRef.current = true;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    transitionTimerRef.current = window.setTimeout(
      () => {
        transitionLockedRef.current = false;
        transitionTimerRef.current = null;
      },
      reduceMotion ? 0 : 300,
    );

    return true;
  }, []);

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    },
    [],
  );

  const push = useCallback(
    (value: string, trigger: HTMLButtonElement) => {
      const currentHistory = historyRef.current;

      if (
        currentHistory.at(-1) === value ||
        currentHistory.includes(value) ||
        !screenElementsRef.current.has(value) ||
        !startTransition()
      ) {
        return;
      }

      rootRef.current?.focus({ preventScroll: true });
      const nextHistory = [...currentHistory, value];
      historyRef.current = nextHistory;
      triggerHistoryRef.current.push(trigger);
      setHistory(nextHistory);
      focusScreen(value);
    },
    [focusScreen, startTransition],
  );

  const back = useCallback(() => {
    const currentHistory = historyRef.current;

    if (currentHistory.length <= 1 || !startTransition()) return;

    const trigger = triggerHistoryRef.current.pop();
    const nextHistory = currentHistory.slice(0, -1);
    rootRef.current?.focus({ preventScroll: true });
    historyRef.current = nextHistory;
    setHistory(nextHistory);

    if (trigger?.isConnected) {
      window.requestAnimationFrame(() => {
        trigger.focus({ preventScroll: true });
      });
    }
  }, [startTransition]);

  const contextValue = useMemo<PushNavRootContextValue>(
    () => ({
      activeValue,
      canGoBack: history.length > 1,
      history,
      back,
      getScreenId,
      push,
      setScreenElement,
    }),
    [
      activeValue,
      back,
      getScreenId,
      history,
      push,
      setScreenElement,
    ],
  );

  return (
    <PushNavRootContext.Provider value={contextValue}>
      <div
        {...props}
        ref={rootRef}
        className={`relative h-full min-h-0 outline-none ${className ?? ""}`}
        tabIndex={-1}
      >
        {children}
      </div>
    </PushNavRootContext.Provider>
  );
}
