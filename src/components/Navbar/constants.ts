export const DESKTOP_NAVIGATION_MEDIA_QUERY = "(min-width: 48rem)";
export const NAVIGATION_FOCUSABLE_SELECTOR =
  'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])';

export const PUSH_NAV_SCREEN_VALUES = [
  "root",
  "account",
  "products",
  "solutions",
  "resources",
] as const;

export type PushNavScreenValue =
  (typeof PUSH_NAV_SCREEN_VALUES)[number];
