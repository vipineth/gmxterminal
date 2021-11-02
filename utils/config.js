import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";

export const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Account", href: "#", icon: UsersIcon, current: false },
  { name: "Address Book", href: "#", icon: FolderIcon, current: false },
  { name: "Staking", href: "#", icon: CalendarIcon, current: false },
  { name: "Earn", href: "#", icon: InboxIcon, current: false },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const COLORS = [
  "#ef4544", // red
  "#f99615", // yelllow
  "#875ef4", // purple
  "#059669", // green
  "#1f2938", // black
];

export const chartLabels = {
  mint: "Mint GLP",
  burn: "Burn GLP",
  margin: "Margin Trade",
  swap: "Token Swap",
  cumulative: "Cumulative Volume",
};
