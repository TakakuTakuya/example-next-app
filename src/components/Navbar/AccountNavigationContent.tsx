import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Drawer from "./Drawer";
import type { NavigationContentProps } from "./types";

/** デスクトップのAccountパネルとモバイルのaccount Screenで共有する導線。 */
export function AccountNavigationContent({
  surface,
}: NavigationContentProps) {
  const ContentLink = surface === "push-nav" ? Drawer.Link : Link;

  return (
    <div className="p-5">
      <ContentLink
        className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border border-line px-5 text-sm font-bold transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
        href="/account"
      >
        <span>お客様専用ページ</span>
        <ArrowRight
          className="size-[18px] shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </ContentLink>
    </div>
  );
}
