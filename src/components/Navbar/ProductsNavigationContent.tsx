import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import * as BottomSheet from "./BottomSheet";
import * as Drawer from "./Drawer";
import type { ProductsNavigationContentProps } from "./types";

const productLinks = [
  {
    href: "/products/analytics",
    title: "Orbit Analytics",
    description: "チームの動きを、ひとつのビューで可視化します。",
  },
  {
    href: "/products/automations",
    title: "Orbit Automations",
    description: "繰り返し作業を、ルールに沿って自動化します。",
  },
  {
    href: "/products/connect",
    title: "Orbit Connect",
    description: "既存の業務ツールと安全につなぎます。",
  },
  {
    href: "/products/mobile",
    title: "Mobile App",
    description: "外出先でも、重要な仕事を止めません。",
  },
] as const;

export function ProductsNavigationContent({
  surface,
}: ProductsNavigationContentProps) {
  const ContentLink =
    surface === "push-nav"
      ? Drawer.Link
      : surface === "bottom-sheet"
        ? BottomSheet.Link
        : Link;
  return (
    <>
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-line px-5 py-1.5">
        <h3>
          <ContentLink
            className="rounded-md text-base font-[760] text-ink transition-colors duration-150 hover:text-green-2 focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
            href="/products"
          >
            製品
          </ContentLink>
        </h3>

        <ContentLink
          className="-mr-3 inline-flex min-h-11 items-center justify-center gap-1 rounded-lg px-3 text-sm font-[720] text-green-2 transition-colors duration-150 hover:bg-paper hover:text-green focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
          href="/products"
          aria-label="製品トップ"
        >
          <span>トップ</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </ContentLink>
      </div>

      <div className="space-y-6 px-5 pt-5">
        <ContentLink
          className="group flex items-center justify-between gap-4 rounded-2xl bg-green p-5 text-white focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px]"
          href="/products"
        >
          <span>
            <strong className="block text-base">製品一覧を見る</strong>
            <span className="mt-1 block text-sm/6 text-white/75">
              Orbitのすべての製品を確認する
            </span>
          </span>
          <ArrowRight
            className="size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </ContentLink>

        <div>
          <p className="mb-3 text-xs font-extrabold tracking-[0.12em] text-muted uppercase">
            プロダクト
          </p>
          <ul className="space-y-2">
            {productLinks.map(({ description, href, title }) => (
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
      </div>
    </>
  );
}
