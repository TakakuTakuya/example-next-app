import { BookOpen, Layers3, Lightbulb } from "lucide-react";
import * as Drawer from "./Drawer";

const iconClassName = "size-5 shrink-0 text-green-2";

const linkClassName =
  "grid min-h-20 grid-cols-[auto_1fr] items-center gap-3 rounded-xl p-3 text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

/**
 * モバイル用メインナビゲーションの意味構造を担当するServer Component。
 * 階層移動は、後続のPushNav導入時にこの内側へ合成する。
 */
export function MobileNavigation() {
  return (
    <nav aria-label="モバイルメインナビゲーション">
      <ul className="divide-y divide-line">
        <li>
          <Drawer.Link className={linkClassName} href="/products">
            <Layers3 className={iconClassName} aria-hidden="true" />
            <span className="flex flex-col gap-1">
              <span className="text-base font-[750]">製品</span>
              <span className="text-sm/6 text-muted">
                キーワードやカテゴリから探す
              </span>
            </span>
          </Drawer.Link>
        </li>

        <li>
          <Drawer.Link className={linkClassName} href="/solutions">
            <Lightbulb className={iconClassName} aria-hidden="true" />
            <span className="flex flex-col gap-1">
              <span className="text-base font-[750]">ソリューション</span>
              <span className="text-sm/6 text-muted">
                チームに合った解決策を探す
              </span>
            </span>
          </Drawer.Link>
        </li>

        <li>
          <Drawer.Link className={linkClassName} href="/resources">
            <BookOpen className={iconClassName} aria-hidden="true" />
            <span className="flex flex-col gap-1">
              <span className="text-base font-[750]">リソース</span>
              <span className="text-sm/6 text-muted">
                学習資料やサポート情報を探す
              </span>
            </span>
          </Drawer.Link>
        </li>
      </ul>
    </nav>
  );
}
