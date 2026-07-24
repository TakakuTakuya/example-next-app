import {
  useCallback,
  type ComponentPropsWithoutRef,
} from "react";
import { usePushNavRoot } from "./PushNavRootContext";

type PushNavScreenProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "aria-hidden" | "id" | "inert"
> & {
  value: string;
};

export function PushNavScreen({
  className,
  value,
  ...props
}: PushNavScreenProps) {
  const {
    activeValue,
    getScreenId,
    history,
    setScreenElement,
  } = usePushNavRoot();
  const active = activeValue === value;
  const visited = history.includes(value);
  const state = active ? "active" : visited ? "previous" : "next";
  const positionClassName =
    state === "active"
      ? "pointer-events-auto z-10 translate-x-0"
      : state === "previous"
        ? "pointer-events-none z-0 -translate-x-full"
        : "pointer-events-none z-20 translate-x-full";

  const setElement = useCallback(
    (element: HTMLDivElement | null) => {
      setScreenElement(value, element);
    },
    [setScreenElement, value],
  );

  return (
    <div
      {...props}
      ref={setElement}
      id={getScreenId(value)}
      className={`absolute inset-0 min-h-0 overflow-y-auto overscroll-contain bg-white transition-transform duration-280 ease-[cubic-bezier(0.2,0.75,0.3,1)] motion-reduce:transition-none ${positionClassName} ${className ?? ""}`}
      aria-hidden={active ? undefined : true}
      inert={active ? undefined : true}
    />
  );
}
