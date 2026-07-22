import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      className="mr-5 inline-flex min-w-max items-center gap-2.5 text-lg font-[820] tracking-[0.11em] text-ink focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] max-[1050px]:mr-[7px] max-md:mr-0"
      href="/"
      aria-label="Orbit ホーム"
    >
      <span
        className="relative grid size-[31px] rotate-[-28deg] place-items-center rounded-full border-2 border-ink"
        aria-hidden="true"
      >
        <span className="absolute h-[13px] w-[39px] rounded-full border-[1.5px] border-ink" />
        <span className="absolute h-[39px] w-[13px] rounded-full border-[1.5px] border-ink" />
        <span className="size-[7px] rounded-full bg-green" />
      </span>
      <span>ORBIT</span>
    </Link>
  );
}
