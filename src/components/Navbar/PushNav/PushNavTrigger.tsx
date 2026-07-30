import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import type { PushNavScreenValue } from "../constants";
import { usePushNavRoot } from "./PushNavRootContext";

type PushNavTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "type"
> & {
  to: PushNavScreenValue;
};

export function PushNavTrigger({
  onClick: onClickProp,
  to,
  ...props
}: PushNavTriggerProps) {
  const { getScreenId, push } = usePushNavRoot();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented) {
      push(to, event.currentTarget);
    }
  };

  return (
    <button
      {...props}
      type="button"
      aria-controls={getScreenId(to)}
      onClick={handleClick}
    />
  );
}
