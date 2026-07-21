import Link from "next/link";

type RoutePageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const title = slug
    .at(-1)
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="flex min-h-[calc(100vh-76px)] flex-col items-start bg-paper bg-[radial-gradient(circle_at_85%_20%,#e4eedf_0,transparent_30%)] px-[max(40px,calc((100vw-900px)/2))] py-[120px]">
      <p className="m-0 text-[11px] font-extrabold tracking-[0.13em] text-green-2 uppercase">
        Navigation destination
      </p>
      <h1 className="my-[18px] text-7xl tracking-tighter">{title}</h1>
      <p className="mb-8 max-w-[650px] leading-[1.8] text-muted">
        <code className="rounded-md border border-line bg-white px-[7px] py-[3px] text-green">
          {path}
        </code>{" "}
        へ遷移しました。メガメニューの項目は button ではなく通常のリンクとして動作しています。
      </p>
      <Link
        className="inline-flex h-[50px] items-center justify-center rounded-full bg-green px-[25px] text-sm font-[750] text-white transition-colors duration-150 hover:bg-[#0d3b2f] focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        href="/"
      >
        ホームへ戻る
      </Link>
    </main>
  );
}
