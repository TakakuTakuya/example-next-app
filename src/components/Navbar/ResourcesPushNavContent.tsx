import { ArrowRight } from "lucide-react";
import * as Drawer from "./Drawer";

const resourceLinks = [
  {
    title: "ドキュメント",
    description: "導入から運用までのガイド",
    href: "/resources/docs",
  },
  {
    title: "ヘルプセンター",
    description: "よくある質問とサポート情報",
    href: "/help",
  },
  {
    title: "ウェビナー",
    description: "プロダクト活用のライブセッション",
    href: "/resources/webinars",
  },
  {
    title: "リリースノート",
    description: "最新機能と改善内容",
    href: "/resources/releases",
  },
] as const;

export function ResourcesPushNavContent() {
  return (
    <div className="space-y-6">
      <Drawer.Link
        className="group flex items-center justify-between gap-4 rounded-2xl bg-[#f0f5ed] p-5 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px]"
        href="/resources"
      >
        <span>
          <strong className="block text-base">リソース一覧を見る</strong>
          <span className="mt-1 block text-sm/6 text-muted">
            学習資料やサポート情報を確認する
          </span>
        </span>
        <ArrowRight
          className="size-5 shrink-0 text-green-2 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Drawer.Link>

      <Drawer.Link
        className="group flex items-center justify-between gap-4 rounded-2xl border border-line p-5 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px]"
        href="/resources/getting-started"
      >
        <span>
          <span className="mb-1 block text-xs font-extrabold tracking-[0.12em] text-green-2 uppercase">
            Featured guide
          </span>
          <strong className="block text-sm">チームで始める業務設計</strong>
          <span className="mt-1 block text-xs/5 text-muted">
            最初の30日で押さえる、5つのステップ
          </span>
        </span>
        <ArrowRight
          className="size-5 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Drawer.Link>

      <div>
        <p className="mb-3 text-xs font-extrabold tracking-[0.12em] text-muted uppercase">
          学ぶ・サポート
        </p>
        <ul className="space-y-2">
          {resourceLinks.map(({ description, href, title }) => (
            <li key={href}>
              <Drawer.Link
                className="group flex items-start justify-between gap-4 rounded-xl border border-line p-4 transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
                href={href}
              >
                <span>
                  <strong className="block text-sm">{title}</strong>
                  <span className="mt-1 block text-xs/5 text-muted">
                    {description}
                  </span>
                </span>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Drawer.Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
