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
