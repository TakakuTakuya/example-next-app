import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import * as Drawer from "./Drawer";
import type { NavigationContentProps } from "./types";

const solutionLinks = [
  {
    title: "スタートアップ",
    description: "スピードを落とさず、業務の土台を整える",
    href: "/solutions/startups",
  },
  {
    title: "エンタープライズ",
    description: "複数部門のプロセスと権限を一元管理",
    href: "/solutions/enterprise",
  },
  {
    title: "プロフェッショナル",
    description: "顧客ごとの案件とナレッジをひとつに",
    href: "/solutions/professional",
  },
  {
    title: "リモートチーム",
    description: "場所を問わず、同じ文脈でコラボレーション",
    href: "/solutions/remote",
  },
] as const;

export function SolutionsNavigationContent({
  surface,
}: NavigationContentProps) {
  const ContentLink = surface === "push-nav" ? Drawer.Link : Link;
  return (
    <>
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-line px-5 py-1.5">
        <h3>
          <ContentLink
            className="rounded-md text-base font-[760] text-ink transition-colors duration-150 hover:text-green-2 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
            href="/solutions"
          >
            ソリューション
          </ContentLink>
        </h3>

        <ContentLink
          className="-mr-3 inline-flex min-h-11 items-center justify-center gap-1 rounded-lg px-3 text-sm font-[720] text-green-2 transition-colors duration-150 hover:bg-paper hover:text-green focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
          href="/solutions"
          aria-label="ソリューショントップ"
        >
          <span>トップ</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </ContentLink>
      </div>

      <div className="space-y-6 px-5 pt-5">
        <ContentLink
          className="group flex items-center justify-between gap-4 rounded-2xl bg-[#eff1ff] p-5 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px]"
          href="/solutions"
        >
          <span>
            <strong className="block text-base">
              ソリューション一覧を見る
            </strong>
            <span className="mt-1 block text-sm/6 text-muted">
              チームに合った活用方法を確認する
            </span>
          </span>
          <ArrowRight
            className="size-5 shrink-0 text-[#6758b3] transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </ContentLink>

        <div>
          <p className="mb-3 text-xs font-extrabold tracking-[0.12em] text-muted uppercase">
            チーム別のソリューション
          </p>
          <ul className="space-y-2">
            {solutionLinks.map(({ description, href, title }) => (
              <li key={href}>
                <ContentLink
                  className="group flex w-full items-start justify-between gap-4 rounded-xl border border-line p-4 transition-colors duration-150 hover:bg-paper focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
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
                </ContentLink>
              </li>
            ))}
          </ul>
        </div>

        <ContentLink
          className="group flex items-center justify-between gap-4 rounded-2xl bg-[#28224d] p-5 text-white focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px]"
          href="/solutions/case-study"
        >
          <span>
            <span className="mb-1 block text-xs font-extrabold tracking-[0.12em] text-[#c9c2ff] uppercase">
              Customer story
            </span>
            <strong className="block text-sm/6">
              Northstarは意思決定の時間を32%短縮
            </strong>
          </span>
          <ArrowRight
            className="size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </ContentLink>
      </div>
    </>
  );
}
