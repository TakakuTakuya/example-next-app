import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import * as Drawer from "./Drawer";
import { primaryNavigationItems } from "./navigationItems";
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
      <div className="sticky top-0 z-30 border-b border-line bg-white">
        {auth.status === "authenticated" ? (
          <PushNav.Trigger
            className="flex w-full items-center gap-3 p-4 text-left transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
            to="account"
          >
            <span className="min-w-0 flex-1">
              <span className="flex min-h-[42px] w-fit max-w-full min-w-0 items-center text-lg font-[760]">
                <span className="sr-only">ログイン中のユーザー：</span>
                <span className="min-w-0 truncate">{auth.userName}</span>
                <span className="ml-1 shrink-0">様</span>
              </span>
              <span className="flex items-baseline gap-2 text-sm text-muted">
                <span>ポイント</span>
                <span>9999</span>
              </span>
            </span>
            <ChevronRight
              className="size-5 shrink-0 text-muted"
              aria-hidden="true"
            />
          </PushNav.Trigger>
        ) : (
          <div className="p-4">
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
          </div>
        )}
      </div>

      <div className="px-5 pt-4">
        <ul className="divide-y divide-line">
          {primaryNavigationItems.map(
            ({ description, icon: Icon, label, value }) => (
              <li key={value}>
                <PushNav.Trigger
                  className={triggerClassName}
                  to={value}
                >
                  <Icon className={iconClassName} aria-hidden="true" />
                  <span className="flex flex-col gap-1">
                    <span className="text-base font-[750]">
                      {label}
                    </span>
                    <span className="text-sm/6 text-muted">
                      {description}
                    </span>
                  </span>
                </PushNav.Trigger>
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
}
