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
