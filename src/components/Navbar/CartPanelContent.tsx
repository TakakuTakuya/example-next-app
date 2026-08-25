import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as BottomSheet from "./BottomSheet";
import type { CartItem } from "./types";

interface CartPanelContentProps {
  items: readonly CartItem[];
  surface: "bottom-sheet" | "mega-menu";
}

/** デスクトップのCartパネルとモバイルのBottom Sheetで共有する内容。 */
export function CartPanelContent({
  items,
  surface,
}: CartPanelContentProps) {
  const ContentLink = surface === "bottom-sheet" ? BottomSheet.Link : Link;

  return (
    <div
      className={surface === "bottom-sheet" ? "px-5 pt-5" : "p-5"}
    >
      <ul className="mb-5 grid gap-2.5">
        {items.map(({ discountLabel, id, imageSrc, name, price }) => (
          <li
            key={id}
            className="flex items-center gap-3 rounded-2xl bg-paper p-3"
          >
            <Image
              className="size-16 shrink-0 rounded-xl border border-line bg-white object-contain p-3"
              src={imageSrc}
              alt=""
              width={64}
              height={64}
              sizes="64px"
            />
            <div className="min-w-0">
              <p className="text-sm/6 font-bold wrap-break-word">
                {name}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <data
                  className="text-sm font-[750] text-green"
                  value={String(price)}
                >
                  {price.toLocaleString("ja-JP")}円
                </data>
                {discountLabel ? (
                  <span className="rounded-full bg-green/10 px-2 py-1 text-[11px] leading-none font-bold text-green">
                    {discountLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ContentLink
        className="flex min-h-14 items-center justify-between rounded-xl bg-green px-5 text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        href="/cart"
      >
        カートの内容を確認
        <ArrowRight className="size-[18px]" aria-hidden="true" />
      </ContentLink>
    </div>
  );
}
