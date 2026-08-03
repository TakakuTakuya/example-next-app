import {
  BookOpen,
  Layers3,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import type { PushNavScreenValue } from "./constants";

type PrimaryNavigationScreenValue = Exclude<
  PushNavScreenValue,
  "account" | "root"
>;

interface PrimaryNavigationItem {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
  value: PrimaryNavigationScreenValue;
}

export const primaryNavigationItems = [
  {
    value: "products",
    href: "/products",
    label: "製品",
    description: "キーワードやカテゴリから探す",
    icon: Layers3,
  },
  {
    value: "solutions",
    href: "/solutions",
    label: "ソリューション",
    description: "チームに合った解決策を探す",
    icon: Lightbulb,
  },
  {
    value: "resources",
    href: "/resources",
    label: "リソース",
    description: "学習資料やサポート情報を探す",
    icon: BookOpen,
  },
] as const satisfies readonly PrimaryNavigationItem[];

export type PrimaryNavigationValue =
  (typeof primaryNavigationItems)[number]["value"];
