import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import * as BottomSheet from "./BottomSheet";
import * as Drawer from "./Drawer";
import type { NavigationContentSurface } from "./types";

type NavigationContentLink = ElementType<
  ComponentPropsWithoutRef<typeof Link>
>;

export const navigationContentLinkBySurface = {
  "bottom-sheet": BottomSheet.Link,
  "mega-menu": Link,
  "push-nav": Drawer.Link,
} satisfies Record<
  NavigationContentSurface,
  NavigationContentLink
>;
