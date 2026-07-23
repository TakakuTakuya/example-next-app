import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

export function CartBottomSheetContent() {
  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-2xl bg-paper p-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-green shadow-sm">
          <ShoppingCart className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold">カートに商品があります</p>
          <p className="mt-1 text-sm/6 text-muted">
            商品の内容を確認して、購入手続きへ進めます。
          </p>
        </div>
      </div>

      <Link
        className="flex min-h-14 items-center justify-between rounded-xl bg-green px-5 text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        href="/cart"
      >
        カートの内容を確認
        <ArrowRight className="size-[18px]" aria-hidden="true" />
      </Link>
    </div>
  );
}
