import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const productLinks = [
  {
    mark: "A",
    href: "/products/analytics",
    title: "Orbit Analytics",
    description: "チームの動きを、ひとつのビューで可視化します。",
  },
  {
    mark: "A",
    href: "/products/automations",
    title: "Orbit Automations",
    description: "繰り返し作業を、ルールに沿って自動化します。",
  },
  {
    mark: "C",
    href: "/products/connect",
    title: "Orbit Connect",
    description: "既存の業務ツールと安全につなぎます。",
  },
  {
    mark: "M",
    href: "/products/mobile",
    title: "Mobile App",
    description: "外出先でも、重要な仕事を止めません。",
  },
];

/** 固有のレイアウトを持つ Server Component。 */
export function ProductsMegaMenuContent() {
  return (
    <div className="grid min-h-[360px] grid-cols-[0.8fr_1.7fr] max-[1050px]:grid-cols-[1fr_1.5fr]">
      <Link
        className="group relative flex flex-col justify-end gap-3.5 overflow-hidden rounded-l-[17px] bg-green p-[38px] text-white focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[-3px]"
        href="/products"
      >
        <span
          className="pointer-events-none absolute top-[24%] left-[75%] size-9 -translate-1/2 rounded-full bg-lime/70"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[25%] left-[76%] size-[130px] -translate-1/2 rounded-full border border-white/20"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[25%] left-[76%] size-[230px] -translate-1/2 rounded-full border border-white/10"
          aria-hidden="true"
        />
        <span className="relative z-10 m-0 text-[11px] font-extrabold tracking-[0.13em] text-lime uppercase">
          Products
        </span>
        <strong className="relative z-10 max-w-[300px] text-[27px] leading-[1.35]">
          仕事の流れを、もっとシンプルに。
        </strong>
        <span className="relative z-10 max-w-[320px] text-[13px] leading-[1.75] text-white/72">
          データ、チーム、ツールをひとつにつなぐ Orbit の製品群をご覧ください。
        </span>
        <span className="relative z-10 mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-[750] text-white [&_svg]:transition-transform [&_svg]:duration-150 group-hover:[&_svg]:translate-x-0.5 group-hover:[&_svg]:-translate-y-0.5 motion-reduce:[&_svg]:transition-none">
          製品一覧を見る <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>

      <div className="px-[38px] py-[34px]">
        <p className="mb-4 text-[11px] font-extrabold tracking-[0.13em] text-muted uppercase">
          プロダクト
        </p>
        <div className="grid grid-cols-2 gap-2">
          {productLinks.map((link) => (
            <Link
              className="flex min-h-28 items-start gap-3.5 rounded-[13px] border border-transparent p-[18px] transition-[border-color,background-color] duration-150 hover:border-[#dce5df] hover:bg-[#f5f8f4] focus-visible:border-[#dce5df] focus-visible:bg-[#f5f8f4] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
              href={link.href}
              key={link.href}
            >
              <span
                className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-[#e4eedf] text-[13px] font-[850] text-green"
                aria-hidden="true"
              >
                {link.mark}
              </span>
              <span>
                <strong className="mb-[7px] block text-sm">
                  {link.title}
                </strong>
                <span className="block text-xs leading-[1.55] text-muted">
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
