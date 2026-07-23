import { ArrowRight } from "lucide-react";
import * as Drawer from "./Drawer";

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

export function ProductsPushNavContent() {
  return (
    <div className="space-y-6">
      <Drawer.Link
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
      </Drawer.Link>

      <div>
        <p className="mb-3 text-xs font-extrabold tracking-[0.12em] text-muted uppercase">
          プロダクト
        </p>
        <ul className="space-y-2">
          {productLinks.map(({ description, href, title }) => (
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
