import * as Drawer from "./Drawer";

const mobileNavigationItems = [
  {
    href: "/products",
    label: "製品",
    description: "キーワードやカテゴリから探す",
  },
  {
    href: "/solutions",
    label: "ソリューション",
    description: "チームに合った解決策を探す",
  },
  {
    href: "/resources",
    label: "リソース",
    description: "学習資料やサポート情報を探す",
  },
] as const;

/**
 * モバイル用メインナビゲーションの意味構造を担当するServer Component。
 * 階層移動は、後続のPushNav導入時にこの内側へ合成する。
 */
export function MobileNavigation() {
  return (
    <nav aria-label="モバイルメインナビゲーション">
      <ul className="divide-y divide-line">
        {mobileNavigationItems.map(({ description, href, label }) => (
          <li key={href}>
            <Drawer.Link
              className="flex min-h-20 flex-col justify-center gap-1 rounded-xl p-3 text-ink transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
              href={href}
            >
              <span className="text-base font-[750]">{label}</span>
              <span className="text-sm/6 text-muted">
                {description}
              </span>
            </Drawer.Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
