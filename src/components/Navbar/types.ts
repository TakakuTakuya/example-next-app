export interface AuthenticatedNavbarState {
  status: "authenticated";
  userName: string;
}

export interface AnonymousNavbarState {
  status: "anonymous";
}

export type NavbarAuthState =
  | AuthenticatedNavbarState
  | AnonymousNavbarState;

export type NavigationContentSurface = "mega-menu" | "push-nav";

export type ProductsNavigationContentSurface =
  | "bottom-sheet"
  | NavigationContentSurface;

export interface NavigationContentProps {
  surface: NavigationContentSurface;
}

export interface ProductsNavigationContentProps {
  surface: ProductsNavigationContentSurface;
}
