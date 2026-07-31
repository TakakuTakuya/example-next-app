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
