import Link from "next/link";
import { BookOpen, Layers3, Lightbulb } from "lucide-react";
import { NavbarMenuItem } from "./NavbarMenuItem";
import { SiteLogo } from "./SiteLogo";
import * as MegaMenu from "./MegaMenu";
import { ProductsMegaMenuContent } from "./MegaMenu/ProductsMegaMenuContent";
import { ResourcesMegaMenuContent } from "./MegaMenu/ResourcesMegaMenuContent";
import { SolutionsMegaMenuContent } from "./MegaMenu/SolutionsMegaMenuContent";

const menuIconClassName =
  "size-[18px] text-[#70807b] transition-colors duration-150 group-hover:text-green-2 group-data-[state=open]:text-green-2 motion-reduce:transition-none";

/**
 * Navbar は Server Component のまま。
 * MegaMenu の Client shell に、Server Component の各 Content を children として渡す。
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-20 overflow-hidden border-b border-ink/10 bg-white/92 shadow-[0_8px_28px_rgb(30_50_43/5%)] backdrop-blur-lg">
      <div className="mx-auto flex h-[76px] w-[min(calc(100%-40px),1440px)] items-center gap-3.5 max-[1050px]:w-[calc(100%-24px)] max-[1050px]:gap-1">
        <SiteLogo />

        <MegaMenu.Root className="h-full" aria-label="メイン">
          <MegaMenu.List>
            <MegaMenu.Item value="products">
              <MegaMenu.Link href="/products">
                <Layers3 className={menuIconClassName} aria-hidden="true" />
                <span>製品</span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <ProductsMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>

            <MegaMenu.Item value="solutions">
              <MegaMenu.Link href="/solutions">
                <Lightbulb className={menuIconClassName} aria-hidden="true" />
                <span>ソリューション</span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <SolutionsMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>

            <MegaMenu.Item value="resources">
              <MegaMenu.Link href="/resources">
                <BookOpen className={menuIconClassName} aria-hidden="true" />
                <span>リソース</span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <ResourcesMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>
          </MegaMenu.List>

          <MegaMenu.Layer />
        </MegaMenu.Root>

        <nav
          className="ml-auto flex h-full items-center gap-0.5"
          aria-label="お客様専用ページとカート"
        >
          <Link
            className="mr-1.5 inline-flex h-[42px] items-center justify-center rounded-full bg-ink px-[19px] text-sm font-[720] text-white transition-[background-color,transform] duration-150 hover:bg-green active:translate-y-px focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] motion-reduce:transition-none"
            href="/login"
          >
            ログイン
          </Link>
          <NavbarMenuItem href="/account">お客様専用ページ</NavbarMenuItem>
          <NavbarMenuItem href="/cart">カート</NavbarMenuItem>
        </nav>
      </div>
    </header>
  );
}
