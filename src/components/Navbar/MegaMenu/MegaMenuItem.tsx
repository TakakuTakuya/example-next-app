import { useId, useMemo, type HTMLAttributes } from "react";
import {
  MegaMenuItemContext,
  type MegaMenuItemContextValue,
} from "./MegaMenuItemContext";

type MegaMenuItemProps = HTMLAttributes<HTMLLIElement> & {
  value: string;
};

export function MegaMenuItem({
  value,
  className,
  ...props
}: MegaMenuItemProps) {
  const id = useId();
  const contextValue = useMemo<MegaMenuItemContextValue>(
    () => ({
      value,
      linkId: `mega-menu-link-${id}`,
      contentId: `mega-menu-content-${id}`,
    }),
    [id, value],
  );

  return (
    <MegaMenuItemContext.Provider value={contextValue}>
      <li
        className={`flex h-full items-center ${className ?? ""}`}
        {...props}
      />
    </MegaMenuItemContext.Provider>
  );
}
