import Link from "next/link";
import type { ComponentProps } from "react";

type NavbarMenuItemProps = ComponentProps<typeof Link>;

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

/**
 * ナビゲーション項目の見た目と、リンクとしての意味だけを共有する。
 *
 * このファイル自体は Client Component ではない。通常リンクから使う場合は
 * Server Component のまま、MegaMenu.Link から使う場合だけ client graph に入る。
 */
export function NavbarMenuItem({
  className,
  children,
  ...props
}: NavbarMenuItemProps) {
  return (
    <Link
      className={joinClassNames(
        "group relative inline-flex h-[46px] min-w-max items-center justify-center gap-2 rounded-[10px] px-3.5 text-sm leading-none font-[650] text-[#36413e] transition-[color,background-color,transform] duration-150 ease-out after:pointer-events-none after:absolute after:right-3.5 after:bottom-[3px] after:left-3.5 after:hidden after:h-0.5 after:rounded-full after:bg-green-2 after:content-[''] hover:bg-[#eff3ee] hover:text-green active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[-2px] data-[state=open]:bg-[#eff3ee] data-[state=open]:text-green data-[state=open]:after:block motion-reduce:transition-none max-[1050px]:px-[9px] max-[1050px]:text-[13px]",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
