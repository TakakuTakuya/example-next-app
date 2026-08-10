import { ArrowRight } from "lucide-react";
import * as BottomSheet from "./BottomSheet";
import type { NavbarAuthState } from "./types";

interface LoginBottomSheetContentProps {
  auth: NavbarAuthState;
}

export function LoginBottomSheetContent({
  auth,
}: LoginBottomSheetContentProps) {
  const isLoggedIn = auth.status === "authenticated";

  return (
    <div>
      {isLoggedIn ? (
        <div className="mb-5">
          <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
            ログイン中
          </p>
          <p className="mt-1 text-base font-[750] text-ink">
            {auth.userName}
          </p>
        </div>
      ) : (
        <p className="mb-5 text-sm/7 text-muted">
          アカウントにログインするか、お客様専用ページへ移動します。
        </p>
      )}
      <div className="grid gap-2.5">
        {!isLoggedIn ? (
          <BottomSheet.Link
            className="flex min-h-14 items-center justify-between rounded-xl bg-green px-5 text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
            href="/login"
          >
            ログイン画面へ
            <ArrowRight className="size-[18px]" aria-hidden="true" />
          </BottomSheet.Link>
        ) : null}
        <BottomSheet.Link
          className="flex min-h-14 items-center justify-between rounded-xl border border-line px-5 text-sm font-bold transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
          href="/account"
        >
          お客様専用ページ
          <ArrowRight className="size-[18px]" aria-hidden="true" />
        </BottomSheet.Link>
      </div>
    </div>
  );
}
