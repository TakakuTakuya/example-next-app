import {
  ArrowLeft,
  BookOpen,
  Layers3,
  Lightbulb,
} from "lucide-react";
import { ProductsPushNavContent } from "./ProductsPushNavContent";
import * as PushNav from "./PushNav";
import { ResourcesPushNavContent } from "./ResourcesPushNavContent";
import { SolutionsPushNavContent } from "./SolutionsPushNavContent";

const iconClassName = "size-5 shrink-0 text-green-2";

const triggerClassName =
  "grid min-h-20 w-full grid-cols-[auto_1fr] items-center gap-3 rounded-xl p-3 text-left text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

const backClassName =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-paper hover:text-ink focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

const screenBodyClassName =
  "p-5 pb-[calc(24px+env(safe-area-inset-bottom))]";

/**
 * モバイル用メインナビゲーションの意味構造を担当するServer Component。
 * PushNavのClient shellへ、各画面のServer Contentをchildrenとして渡す。
 */
export function MobileNavigation() {
  return (
    <nav className="h-full min-h-0" aria-label="メイン">
      <PushNav.Root initialValue="root">
        <PushNav.Viewport>
          <PushNav.Screen
            className="px-5 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]"
            value="root"
          >
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
          </PushNav.Screen>

          <PushNav.Screen value="products">
            <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-white px-4 py-2">
              <PushNav.Back
                className={backClassName}
                aria-label="メニューへ戻る"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </PushNav.Back>
              <h3 className="text-base font-[760]">製品</h3>
            </div>
            <div className={screenBodyClassName}>
              <ProductsPushNavContent />
            </div>
          </PushNav.Screen>

          <PushNav.Screen value="solutions">
            <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-white px-4 py-2">
              <PushNav.Back
                className={backClassName}
                aria-label="メニューへ戻る"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </PushNav.Back>
              <h3 className="text-base font-[760]">ソリューション</h3>
            </div>
            <div className={screenBodyClassName}>
              <SolutionsPushNavContent />
            </div>
          </PushNav.Screen>

          <PushNav.Screen value="resources">
            <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-white px-4 py-2">
              <PushNav.Back
                className={backClassName}
                aria-label="メニューへ戻る"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </PushNav.Back>
              <h3 className="text-base font-[760]">リソース</h3>
            </div>
            <div className={screenBodyClassName}>
              <ResourcesPushNavContent />
            </div>
          </PushNav.Screen>
        </PushNav.Viewport>
      </PushNav.Root>
    </nav>
  );
}
