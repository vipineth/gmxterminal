import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';

export const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Account', href: '/account', icon: UsersIcon },
  { name: 'Address Book', href: '/address-book', icon: FolderIcon },
  //   { name: 'Staking', href: '/staking', icon: CalendarIcon },
  //   { name: 'Earn', href: '#', icon: InboxIcon },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const COLORS = [
  '#ef4544', // red
  '#f99615', // yelllow
  '#875ef4', // purple
  '#059669', // green
  '#1f2938', // black
];

export const chartLabels = {
  mint: 'Mint GLP',
  burn: 'Burn GLP',
  margin: 'Margin Trade',
  swap: 'Token Swap',
  cumulative: 'Cumulative Volume',
};

export const volumeFilterLabels = {
  daily: 'Daily',
  weekly: 'Weekly',
};

export const GA_TRACKING_ID = 'G-FSJ0S4YFFB';
