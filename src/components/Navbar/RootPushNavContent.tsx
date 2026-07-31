import { BookOpen, Layers3, Lightbulb } from "lucide-react";
import { cn } from "@/lib/cn";
import * as Drawer from "./Drawer";
import { navbarLoginLinkClassName } from "./NavbarLoginLink";
import * as PushNav from "./PushNav";
import type { NavbarAuthState } from "./types";

const iconClassName = "size-5 shrink-0 text-green-2";

const createIdLinkClassName =
  "inline-flex h-[42px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-ink/20 bg-white px-3 text-sm font-[720] text-ink transition-[background-color,border-color,transform] duration-150 hover:border-ink/35 hover:bg-paper active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none";

const accountLinkClassName =
  "mt-2 flex min-h-11 w-full items-center justify-center rounded-lg px-3 text-sm font-[650] text-ink underline-offset-4 transition-colors duration-150 hover:bg-paper hover:text-green hover:underline focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

const triggerClassName =
  "grid min-h-20 w-full grid-cols-[auto_1fr] items-center gap-3 rounded-xl p-4 text-left text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none";

interface RootPushNavContentProps {
  auth: NavbarAuthState;
}

/** モバイル用メインナビゲーションの初期画面。 */
export function RootPushNavContent({
  auth,
}: RootPushNavContentProps) {
  return (
    <>
      <div className="sticky top-0 z-30 border-b border-line bg-white p-4">
        {auth.status === "authenticated" ? (
          <p className="flex min-h-[42px] min-w-0 items-center truncate text-lg font-[760]">
            <span className="sr-only">ログイン中のユーザー：</span>
            {auth.userName}
          </p>
        ) : (
          <>
            <div className="flex gap-2">
              <Drawer.Link
                className={cn(
                  navbarLoginLinkClassName,
                  "min-w-0 flex-1 px-3",
                )}
                href="/login"
              >
                ログイン
              </Drawer.Link>
              <Drawer.Link
                className={createIdLinkClassName}
                href="/register"
              >
                新規ID作成
              </Drawer.Link>
            </div>
            <Drawer.Link
              className={accountLinkClassName}
              href="/account"
            >
              お客様専用ページ
            </Drawer.Link>
          </>
        )}
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
