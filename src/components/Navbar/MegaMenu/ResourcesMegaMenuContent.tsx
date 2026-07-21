import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const resources = [
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

/** 記事導線を中心にした、3つ目の固有 Server Component。 */
export function ResourcesMegaMenuContent() {
  return (
    <div className="grid min-h-[390px] grid-cols-[0.65fr_1fr_1.15fr] grid-rows-[auto_1fr] gap-x-[30px] gap-y-[22px] p-9 max-[1050px]:grid-cols-[0.85fr_1fr_1fr]">
      <div className="col-span-full">
        <p className="mb-4 text-[11px] font-extrabold tracking-[0.13em] text-muted uppercase">
          学ぶ・サポート
        </p>
        <h2 className="mt-1 text-2xl">Orbit を最大限に活用する</h2>
      </div>

      <Link
        className="flex flex-col gap-[17px] rounded-[14px] bg-[#f0f5ed] p-[22px] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px]"
        href="/resources/getting-started"
      >
        <span
          className="flex h-[120px] items-end gap-2 rounded-[10px] bg-green p-[22px]"
          aria-hidden="true"
        >
          <i className="block h-[45%] w-[23%] rounded-t bg-lime" />
          <i className="block h-4/5 w-[23%] rounded-t bg-white" />
          <i className="block h-[62%] w-[23%] rounded-t bg-[#8dc8a6]" />
        </span>
        <span>
          <span className="m-0 text-[11px] font-extrabold tracking-[0.13em] text-green-2 uppercase">
            Featured guide
          </span>
          <strong className="mb-[7px] block text-sm">
            チームで始める業務設計
          </strong>
          <span className="block text-xs leading-[1.55] text-muted">
            最初の30日で押さえる、5つのステップ
          </span>
        </span>
      </Link>

      <div className="col-[2/-1] grid grid-cols-2 gap-2.5">
        {resources.map(({ title, description, href }) => (
          <Link
            className="flex min-h-[106px] items-start justify-between gap-4 rounded-[13px] border border-line p-5 transition-[border-color,box-shadow] duration-150 hover:border-[#acc2b5] hover:shadow-[0_8px_24px_rgb(26_66_51/7%)] focus-visible:border-[#acc2b5] focus-visible:shadow-[0_8px_24px_rgb(26_66_51/7%)] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-3px] motion-reduce:transition-none"
            href={href}
            key={href}
          >
            <span>
              <strong className="mb-[7px] block text-sm">{title}</strong>
              <span className="block text-xs leading-[1.55] text-muted">
                {description}
              </span>
            </span>
            <ArrowUpRight
              className="w-[15px] shrink-0 text-[#8b9994]"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
