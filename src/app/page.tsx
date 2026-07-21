import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative grid min-h-[690px] grid-cols-[1.1fr_0.9fr] items-center gap-16 overflow-hidden bg-paper bg-[linear-gradient(90deg,#f6f8f5_0_58%,#eef3ec80_100%)] px-[max(40px,calc((100vw-1240px)/2))] py-28">
        <div
          className="pointer-events-none absolute right-[-190px] z-0 size-[760px] rounded-full border border-[#1d4d3b]/12"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[-20px] z-0 size-[420px] rounded-full border border-[#1d4d3b]/12"
          aria-hidden="true"
        />
        <div className="relative z-2 max-w-[700px]">
          <p className="m-0 text-[11px] font-extrabold tracking-[0.13em] text-green-2 uppercase">
            A calmer way to work
          </p>
          <h1 className="mt-[18px] mb-[25px] text-[clamp(54px,6vw,88px)] leading-[1.11] font-[760] tracking-[-0.065em]">
            仕事の流れを、
            <br />
            ひとつの軌道へ。
          </h1>
          <p className="m-0 max-w-[610px] text-[17px] leading-[1.9] text-[#58645f]">
            Orbit は、散らばったプロセスと情報をつなぎ、チームが本当に大切な仕事へ集中できる環境をつくります。
          </p>
          <div className="mt-[35px] flex gap-3">
            <Link
              className="inline-flex h-[50px] items-center justify-center rounded-full bg-green px-[25px] text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
              href="/products"
            >
              製品を見る
            </Link>
            <Link
              className="inline-flex h-[50px] items-center justify-center rounded-full border border-[#ccd4cf] bg-white/70 px-[25px] text-sm font-[750] transition-colors duration-150 hover:bg-white focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
              href="#architecture"
            >
              実装の構成
            </Link>
          </div>
        </div>
        <div
          className="relative z-2 w-[min(100%,430px)] rotate-[1.8deg] justify-self-end rounded-[22px] border border-[#1b4838]/13 bg-white/86 p-7 shadow-[0_35px_80px_rgb(31_75_59/13%)] backdrop-blur-md"
          aria-label="プロジェクトの状況"
        >
          <div className="mb-[38px] flex items-center justify-between text-[13px] font-[720]">
            <span>Project overview</span>
            <span className="rounded-full bg-[#e6f6df] px-[9px] py-[5px] text-[10px] text-[#307046] uppercase">
              Live
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e5eae6]">
            <span className="block h-full w-[72%] rounded-[inherit] bg-green" />
          </div>
          <div className="flex items-center justify-between px-0 pt-3.5 pb-[26px] text-[11px] text-[#65716c]">
            <span>
              <i className="mr-1.5 inline-block size-[7px] rounded-full bg-[#60b36e]" />{" "}
              On track
            </span>
            <strong className="text-sm text-ink">72%</strong>
          </div>
          <div className="grid grid-cols-4 gap-2" aria-hidden="true">
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
            <span className="h-[66px] rounded-lg bg-[#e4eedf]" />
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
            <span className="h-[66px] rounded-lg bg-[#e4eedf]" />
            <span className="h-[66px] rounded-lg bg-[#f0f3f0]" />
          </div>
        </div>
      </section>

      <section
        className="grid grid-cols-[0.75fr_1.6fr] gap-20 bg-white px-[max(40px,calc((100vw-1240px)/2))] py-[110px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]"
        id="architecture"
      >
        <div>
          <p className="m-0 text-[11px] font-extrabold tracking-[0.13em] text-green-2 uppercase">
            Implementation notes
          </p>
          <h2 className="mt-4 max-w-[420px] text-[38px] leading-[1.35] tracking-[-0.04em]">
            論理構造は近く、表示場所は自由に。
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-px bg-line">
          <article className="bg-white p-8">
            <span className="font-mono text-[11px] text-[#98a39f]">01</span>
            <h3 className="mt-[50px] mb-3 text-lg">Server first</h3>
            <p className="m-0 text-[13px] leading-[1.75] text-muted">
              Navbar と各メニュー固有コンテンツは Server Component。開閉に必要な部分だけを Client island にしています。
            </p>
          </article>
          <article className="bg-white p-8">
            <span className="font-mono text-[11px] text-[#98a39f]">02</span>
            <h3 className="mt-[50px] mb-3 text-lg">Adjacent ownership</h3>
            <p className="m-0 text-[13px] leading-[1.75] text-muted">
              Trigger のリンクと Content は同じ Item 内に記述し、React 上の所有関係を保っています。
            </p>
          </article>
          <article className="bg-white p-8">
            <span className="font-mono text-[11px] text-[#98a39f]">03</span>
            <h3 className="mt-[50px] mb-3 text-lg">Body portal</h3>
            <p className="m-0 text-[13px] leading-[1.75] text-muted">
              パネルだけを body 配下の共有 Layer へ描画。Header の overflow や stacking context から切り離します。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
