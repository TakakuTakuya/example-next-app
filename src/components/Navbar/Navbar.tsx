import type { ComponentType } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { AccountPushNavContent } from "./AccountPushNavContent";
import * as BottomSheet from "./BottomSheet";
import { CartBottomSheetContent } from "./CartBottomSheetContent";
import * as Drawer from "./Drawer";
import { LoginBottomSheetContent } from "./LoginBottomSheetContent";
import {
  primaryNavigationItems,
  type PrimaryNavigationValue,
} from "./navigationItems";
import { NavbarIconItem } from "./NavbarIconItem";
import { NavbarLoginLink } from "./NavbarLoginLink";
import { NavbarMenuItem } from "./NavbarMenuItem";
import { ProductSearchBottomSheetContent } from "./ProductSearchBottomSheetContent";
import { ProductsNavigationContent } from "./ProductsNavigationContent";
import * as PushNav from "./PushNav";
import { PushNavScreenLayout } from "./PushNavScreenLayout";
import { ResourcesNavigationContent } from "./ResourcesNavigationContent";
import { RootPushNavContent } from "./RootPushNavContent";
import { SiteLogo } from "./SiteLogo";
import { SolutionsNavigationContent } from "./SolutionsNavigationContent";
import type {
  NavbarAuthState,
  NavigationContentProps,
} from "./types";
import * as MegaMenu from "./MegaMenu";

const menuIconClassName =
  "size-[18px] text-[#70807b] transition-colors duration-150 group-hover:text-green-2 group-data-[state=open]:text-green-2 motion-reduce:transition-none";

const navigationContentByValue = {
  products: ProductsNavigationContent,
  solutions: SolutionsNavigationContent,
  resources: ResourcesNavigationContent,
} satisfies Record<
  PrimaryNavigationValue,
  ComponentType<NavigationContentProps>
>;

interface NavbarProps {
  auth?: NavbarAuthState;
  hasCartItems?: boolean;
}

/**
 * Navbar は Server Component のまま。
 * MegaMenu、Drawer / PushNav、BottomSheet の Client shell に、
 * Server Component の各 Content を children として渡す。
 */
export function Navbar({
  auth = { status: "anonymous" },
  hasCartItems = false,
}: NavbarProps) {
  const isLoggedIn = auth.status === "authenticated";
  const showCartBottomSheet = isLoggedIn && hasCartItems;
  const accountSheetTitle = isLoggedIn ? "アカウント" : "ログイン";

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
          <Drawer.Content title="メインメニュー">
            <PushNav.Root aria-label="メイン">
              <PushNav.Screen value="root">
                <RootPushNavContent auth={auth} />
              </PushNav.Screen>

              {isLoggedIn ? (
                <PushNav.Screen value="account">
                  <AccountPushNavContent />
                </PushNav.Screen>
              ) : null}

              {primaryNavigationItems.map(({ value }) => {
                const NavigationContent =
                  navigationContentByValue[value];

                return (
                  <PushNav.Screen key={value} value={value}>
                    <PushNavScreenLayout>
                      <NavigationContent surface="push-nav" />
                    </PushNavScreenLayout>
                  </PushNav.Screen>
                );
              })}
            </PushNav.Root>
          </Drawer.Content>
        </Drawer.Root>

        <SiteLogo />

        <MegaMenu.Root className="h-full max-md:hidden" aria-label="メイン">
          <MegaMenu.List>
            {primaryNavigationItems.map(
              ({ description, href, icon: Icon, label, value }) => {
                const NavigationContent =
                  navigationContentByValue[value];

                return (
                  <MegaMenu.Item key={value} value={value}>
                    <MegaMenu.Link href={href}>
                      <Icon
                        className={menuIconClassName}
                        aria-hidden="true"
                      />
                      <span className="flex flex-col items-start">
                        <span>{label}</span>
                        <span className="sr-only">{description}</span>
                      </span>
                    </MegaMenu.Link>
                    <MegaMenu.Content>
                      <NavigationContent surface="mega-menu" />
                    </MegaMenu.Content>
                  </MegaMenu.Item>
                );
              },
            )}
          </MegaMenu.List>

          <MegaMenu.Layer className="max-md:hidden" />
        </MegaMenu.Root>

        <nav
          className="ml-auto flex h-full items-center gap-0.5 max-md:hidden"
          aria-label="お客様専用ページとカート"
        >
          <NavbarLoginLink className="mr-1.5" href="/login">
            ログイン
          </NavbarLoginLink>
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
            <BottomSheet.Trigger aria-label={accountSheetTitle}>
              <UserRound className="size-5" aria-hidden="true" />
            </BottomSheet.Trigger>
            <BottomSheet.Content title={accountSheetTitle}>
              <LoginBottomSheetContent auth={auth} />
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
