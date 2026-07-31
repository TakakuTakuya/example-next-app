import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import * as PushNav from "./PushNav";

const backClassName =
  "flex w-full items-center gap-2 border-b border-line p-4 text-left text-sm font-[720] text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

interface PushNavScreenLayoutProps {
  children?: ReactNode;
}

/** PushNavの下層画面に共通する戻る導線。 */
export function PushNavScreenLayout({
  children,
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

      {children}
    </>
  );
}
