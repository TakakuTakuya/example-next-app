import { Search } from "lucide-react";

export function ProductSearchBottomSheetContent() {
  return (
    <form action="/products" role="search">
      <p className="mb-5 text-sm/7 text-muted">
        キーワードから製品を検索できます。
      </p>
      <label className="mb-2 block text-sm font-bold" htmlFor="product-search">
        キーワード
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          className="h-12 w-full rounded-xl border border-line bg-paper pr-4 pl-12 text-base outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-green-2 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
          id="product-search"
          name="q"
          placeholder="製品名・カテゴリを入力"
          type="search"
        />
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-green px-5 text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
      >
        検索する
      </button>
    </form>
  );
}
