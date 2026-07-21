import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

/** Products とは異なる構造を持つ Server Component。 */
export function SolutionsMegaMenuContent() {
  return (
    <div className="grid min-h-[390px] grid-cols-[1.65fr_0.75fr] max-[1050px]:grid-cols-[1fr_1.5fr]">
      <div className="px-[38px] py-[34px]">
        <p className="mb-4 text-[11px] font-extrabold tracking-[0.13em] text-muted uppercase">
          チーム別のソリューション
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line">
          {solutionLinks.map(({ title, description, href }, index) => (
            <Link
              className="grid min-h-[126px] grid-cols-[auto_1fr_auto] items-start gap-3.5 bg-white p-5 transition-colors duration-150 hover:bg-[#f4f8f3] focus-visible:bg-[#f4f8f3] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
              href={href}
              key={href}
            >
              <span
                className="font-mono text-[10px] font-bold text-[#9daa9f]"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <span>
                <strong className="mb-[7px] block text-sm">{title}</strong>
                <span className="block text-xs leading-[1.55] text-muted">
                  {description}
                </span>
              </span>
              <ArrowUpRight
                className="w-[15px] text-[#98a39f]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>

      <Link
        className="group flex flex-col justify-end gap-[15px] rounded-r-[17px] bg-[#eff1ff] px-8 py-[38px] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px]"
        href="/solutions/case-study"
      >
        <span className="m-0 text-[11px] font-extrabold tracking-[0.13em] text-[#6758b3] uppercase">
          Customer story
        </span>
        <span
          className="mb-auto grid size-[58px] place-items-center rounded-[17px] bg-[#28224d] font-serif text-[27px] text-white"
          aria-hidden="true"
        >
          N
        </span>
        <strong className="text-xl leading-[1.45]">
          Northstar は意思決定の時間を 32% 短縮
        </strong>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-[750] [&_svg]:transition-transform [&_svg]:duration-150 group-hover:[&_svg]:translate-x-0.5 group-hover:[&_svg]:-translate-y-0.5 motion-reduce:[&_svg]:transition-none">
          導入事例を読む <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
