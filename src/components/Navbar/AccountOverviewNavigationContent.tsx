import { ArrowRight } from "lucide-react";
import { navigationContentLinkBySurface } from "./navigationContentLinks";
import type { NavigationContentProps } from "./types";

interface AccountOverviewNavigationContentProps
  extends NavigationContentProps {
  userName: string;
}

/** Accountパネル、account Screen、Bottom Sheetで共有する導線。 */
export function AccountOverviewNavigationContent({
  surface,
  userName,
}: AccountOverviewNavigationContentProps) {
  const ContentLink = navigationContentLinkBySurface[surface];

  return (
    <div className="p-5">
      <p className="mb-5 text-lg font-[760] wrap-break-word">
        <span className="sr-only">ログイン中のユーザー：</span>
        {userName}
        <span className="ml-1">様</span>
      </p>
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
