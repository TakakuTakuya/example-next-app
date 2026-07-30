import { BookOpen, Layers3, Lightbulb } from "lucide-react";
import * as PushNav from "./PushNav";

const iconClassName = "size-5 shrink-0 text-green-2";

const triggerClassName =
  "grid min-h-20 w-full grid-cols-[auto_1fr] items-center gap-3 rounded-xl p-4 text-left text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

/** モバイル用メインナビゲーションの初期画面。 */
export function RootPushNavContent() {
  return (
    <>
      <div className="sticky top-0 z-30 flex items-center border-b border-line bg-white px-5 py-4">
        <h2 className="text-lg font-[760]">メニュー</h2>
      </div>

      <div className="px-5 pt-4">
        <ul className="divide-y divide-line">
          <li>
            <PushNav.Trigger className={triggerClassName} to="products">
              <Layers3 className={iconClassName} aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <span className="text-base font-[750]">製品</span>
                <span className="text-sm/6 text-muted">
                  キーワードやカテゴリから探す
                </span>
              </span>
            </PushNav.Trigger>
          </li>

          <li>
            <PushNav.Trigger className={triggerClassName} to="solutions">
              <Lightbulb className={iconClassName} aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <span className="text-base font-[750]">
                  ソリューション
                </span>
                <span className="text-sm/6 text-muted">
                  チームに合った解決策を探す
                </span>
              </span>
            </PushNav.Trigger>
          </li>

          <li>
            <PushNav.Trigger className={triggerClassName} to="resources">
              <BookOpen className={iconClassName} aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <span className="text-base font-[750]">リソース</span>
                <span className="text-sm/6 text-muted">
                  学習資料やサポート情報を探す
                </span>
              </span>
            </PushNav.Trigger>
          </li>
        </ul>
      </div>
    </>
  );
}
