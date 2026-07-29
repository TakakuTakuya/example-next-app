import Link from "next/link";
import {
  BookOpen,
  Layers3,
  Lightbulb,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import * as BottomSheet from "./BottomSheet";
import { CartBottomSheetContent } from "./CartBottomSheetContent";
import * as Drawer from "./Drawer";
import { LoginBottomSheetContent } from "./LoginBottomSheetContent";
import { MobileNavigation } from "./MobileNavigation";
import { NavbarIconItem } from "./NavbarIconItem";
import { NavbarMenuItem } from "./NavbarMenuItem";
import { ProductSearchBottomSheetContent } from "./ProductSearchBottomSheetContent";
import { ProductsMegaMenuContent } from "./ProductsMegaMenuContent";
import { ResourcesMegaMenuContent } from "./ResourcesMegaMenuContent";
import { SiteLogo } from "./SiteLogo";
import { SolutionsMegaMenuContent } from "./SolutionsMegaMenuContent";
import * as MegaMenu from "./MegaMenu";

const menuIconClassName =
  "size-[18px] text-[#70807b] transition-colors duration-150 group-hover:text-green-2 group-data-[state=open]:text-green-2 motion-reduce:transition-none";

interface NavbarProps {
  hasCartItems?: boolean;
  isLoggedIn?: boolean;
}

/**
 * Navbar は Server Component のまま。
 * MegaMenu、Drawer / PushNav、BottomSheet の Client shell に、
 * Server Component の各 Content を children として渡す。
 */
export function Navbar({
  hasCartItems = false,
  isLoggedIn = false,
}: NavbarProps) {
  const showCartBottomSheet = isLoggedIn && hasCartItems;

  return (
    <header className="sticky top-0 z-20 overflow-hidden border-b border-ink/10 bg-white/92 shadow-[0_8px_28px_rgb(30_50_43/5%)] backdrop-blur-lg max-md:w-dvw">
      <div className="mx-auto flex h-[76px] w-[min(calc(100%-40px),1440px)] items-center gap-3.5 max-[1050px]:w-[calc(100%-24px)] max-[1050px]:gap-1 max-md:gap-0.5">
        <Drawer.Root>
          <Drawer.Trigger
            className="hidden border border-ink/10 bg-white shadow-sm max-md:inline-flex"
            aria-label="メニューを開く"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Drawer.Trigger>
          <Drawer.Content title="メニュー">
            <MobileNavigation />
          </Drawer.Content>
        </Drawer.Root>

        <SiteLogo />

        <MegaMenu.Root className="h-full max-md:hidden" aria-label="メイン">
          <MegaMenu.List>
            <MegaMenu.Item value="products">
              <MegaMenu.Link href="/products">
                <Layers3 className={menuIconClassName} aria-hidden="true" />
                <span className="flex flex-col items-start">
                  <span>製品</span>
                  <span className="sr-only">
                    キーワードやカテゴリから探す
                  </span>
                </span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <ProductsMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>

            <MegaMenu.Item value="solutions">
              <MegaMenu.Link href="/solutions">
                <Lightbulb className={menuIconClassName} aria-hidden="true" />
                <span className="flex flex-col items-start">
                  <span>ソリューション</span>
                  <span className="sr-only">
                    チームに合った解決策を探す
                  </span>
                </span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <SolutionsMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>

            <MegaMenu.Item value="resources">
              <MegaMenu.Link href="/resources">
                <BookOpen className={menuIconClassName} aria-hidden="true" />
                <span className="flex flex-col items-start">
                  <span>リソース</span>
                  <span className="sr-only">
                    学習資料やサポート情報を探す
                  </span>
                </span>
              </MegaMenu.Link>
              <MegaMenu.Content>
                <ResourcesMegaMenuContent />
              </MegaMenu.Content>
            </MegaMenu.Item>
          </MegaMenu.List>

          <MegaMenu.Layer className="max-md:hidden" />
        </MegaMenu.Root>

        <nav
          className="ml-auto flex h-full items-center gap-0.5 max-md:hidden"
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

        <BottomSheet.Root>
          <BottomSheet.Item value="product-search">
            <BottomSheet.Trigger aria-label="製品を探す">
              <Search className="size-5" aria-hidden="true" />
            </BottomSheet.Trigger>
            <BottomSheet.Content title="製品を探す">
              <ProductSearchBottomSheetContent />
            </BottomSheet.Content>
          </BottomSheet.Item>

          <BottomSheet.Item value="login">
            <BottomSheet.Trigger aria-label="ログイン">
              <UserRound className="size-5" aria-hidden="true" />
            </BottomSheet.Trigger>
            <BottomSheet.Content title="ログイン">
              <LoginBottomSheetContent />
            </BottomSheet.Content>
          </BottomSheet.Item>

          {showCartBottomSheet ? (
            <BottomSheet.Item value="cart">
              <BottomSheet.Trigger aria-label="カート">
                <ShoppingCart className="size-5" aria-hidden="true" />
              </BottomSheet.Trigger>
              <BottomSheet.Content title="カート">
                <CartBottomSheetContent />
              </BottomSheet.Content>
            </BottomSheet.Item>
          ) : (
            <NavbarIconItem href="/cart" aria-label="カート">
              <ShoppingCart className="size-5" aria-hidden="true" />
            </NavbarIconItem>
          )}
        </BottomSheet.Root>
      </div>
    </header>
  );
}
