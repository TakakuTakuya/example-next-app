# Next.js Portal Mega Menu

Navbar 全体を Client Component にせず、開閉・位置計算・Portal だけを Client island にした実装例です。スタイルにはTailwind CSS v4、アイコンにはLucideを使用し、Radix UI / shadcn/ui は使用していません。

設計判断、責務分担、操作仕様、レビュー項目は [`docs/navbar-mega-menu-design-review.md`](docs/navbar-mega-menu-design-review.md) にまとめています。

## Run

```bash
pnpm install
pnpm dev
```

`http://localhost:3000` を開き、Navbar の「製品」「ソリューション」「リソース」へマウスを移すと、それぞれ異なるメガメニューが開きます。各項目のクリック／タップは開閉操作に使わず、通常のリンク遷移として動作します。

キーボードでは現在、Triggerへのフォーカスでパネルを表示し、`ArrowDown` / `ArrowUp`でパネル内へ移動できます。ただし、これはデモの暫定動作であり、キーボードからContentへ入る最終的な操作仕様は今回の検討範囲外です。

TriggerとContentの上下辺は隙間なく接触させています。透明なpointer bridgeやsafe polygonは使用していません。

## Component boundary

```text
Navbar.tsx                         Server Component
├─ SiteLogo                       Server Component
├─ MegaMenu.Root                  Client Component
│  ├─ MegaMenu.Item               Client shell
│  │  ├─ MegaMenu.Link            Client (hover + provisional keyboard behavior)
│  │  └─ MegaMenu.Content
│  │     └─ *MegaMenuContent      Server Component as children
│  └─ MegaMenu.Layer              Client (Portal to document.body)
└─ Login / My page / Help         Server-rendered links
```

`MegaMenu.Link` と `MegaMenu.Content` は同じ `MegaMenu.Item` 内に記述します。React 上の所有関係は隣接したまま、active な Content だけが `createPortal` によって共有 Layer へ移動します。

Header にはデモとして `overflow: hidden` を設定しています。Layer は `document.body` 直下の `position: fixed` 要素なので、Header の clipping と stacking context の影響を受けません。

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Tailwind classのcanonical表記、重複、競合、未知のclassもESLintで検査します。自動修正可能な指摘は`pnpm lint --fix`で修正できます。
