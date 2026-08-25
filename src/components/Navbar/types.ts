export interface AccountSummary {
  userName: string;
  pointBalance: number;
  availableCouponCount: number;
}

export interface CartItem {
  id: string;
  imageSrc: string;
  name: string;
  price: number;
}

export interface AuthenticatedNavbarState {
  status: "authenticated";
  account: AccountSummary;
}

export interface AnonymousNavbarState {
  status: "anonymous";
}

export type NavbarAuthState =
  | AuthenticatedNavbarState
  | AnonymousNavbarState;

export const NAVIGATION_CONTENT_SURFACES = [
  "bottom-sheet",
  "mega-menu",
  "push-nav",
] as const;

export type NavigationContentSurface =
  (typeof NAVIGATION_CONTENT_SURFACES)[number];

export interface NavigationContentProps {
  surface: NavigationContentSurface;
}
