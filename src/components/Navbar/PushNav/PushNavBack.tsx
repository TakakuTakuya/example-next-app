import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";
import { usePushNavRoot } from "./PushNavRootContext";

type PushNavBackProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "type"
>;

export function PushNavBack({
  disabled: disabledProp,
  onClick: onClickProp,
  ...props
}: PushNavBackProps) {
  const { back, canGoBack } = usePushNavRoot();
  const disabled = disabledProp || !canGoBack;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClickProp?.(event);

    if (!event.defaultPrevented && !disabled) {
      back();
    }
  };

  return (
    <button
      {...props}
      type="button"
      disabled={disabled}
      data-push-nav-focus=""
      onClick={handleClick}
    />
  );
}
