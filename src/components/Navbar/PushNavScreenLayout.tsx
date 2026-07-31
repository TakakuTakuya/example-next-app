import { ArrowLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import * as Drawer from "./Drawer";
import * as PushNav from "./PushNav";

const backClassName =
  "flex w-full items-center gap-2 border-b border-line p-4 text-left text-sm font-[720] text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

const titleLinkClassName =
  "rounded-md text-base font-[760] text-ink transition-colors duration-150 hover:text-green-2 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none";

const topLinkClassName =
  "-mr-3 inline-flex min-h-11 items-center justify-center gap-1 rounded-lg px-3 text-sm font-[720] text-green-2 transition-colors duration-150 hover:bg-paper hover:text-green focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none";

interface PushNavScreenLayoutProps {
  children?: ReactNode;
  title: string;
  titleHref: string;
}

/** PushNavの下層画面に共通する2段ヘッダー。 */
export function PushNavScreenLayout({
  children,
  title,
  titleHref,
}: PushNavScreenLayoutProps) {
  return (
    <>
      <PushNav.Back
        className={backClassName}
        aria-label="メニューへ戻る"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
        <span>戻る</span>
      </PushNav.Back>

      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-line px-5 py-1.5">
        <h3>
          <Drawer.Link
            className={titleLinkClassName}
            href={titleHref}
          >
            {title}
          </Drawer.Link>
        </h3>

        <Drawer.Link
          className={topLinkClassName}
          href={titleHref}
          aria-label={`${title}トップ`}
        >
          <span>トップ</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </Drawer.Link>
      </div>

      {children}
    </>
  );
}
