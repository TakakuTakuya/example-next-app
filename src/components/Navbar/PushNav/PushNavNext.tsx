import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { usePushNavRoot } from "./PushNavRootContext";

type PushNavNextProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-controls" | "type"
> & {
  to: string;
};

export function PushNavNext({
  onClick: onClickProp,
  to,
  ...props
}: PushNavNextProps) {
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
      data-push-nav-next=""
      onClick={handleClick}
    />
  );
}
