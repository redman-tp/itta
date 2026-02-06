export interface NavItem {
  label: string;
  icon: string;
  to: string;
}

export const publicNavItems: NavItem[] = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Designs', icon: 'dashboard', to: '/marketplace' },
  { label: 'Fabrics', icon: 'store', to: '/fabrics' },
  { label: 'Requests', icon: 'list_alt', to: '/customer/requests' },
  { label: 'Profile', icon: 'person', to: '/customer/profile' },
];

export const customerNavItems: NavItem[] = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Sew', icon: 'checkroom', to: '/customer/sew-request' },
  { label: 'Requests', icon: 'list_alt', to: '/customer/requests' },
  { label: 'Jobs', icon: 'work', to: '/customer/jobs' },
  { label: 'Profile', icon: 'person', to: '/customer/profile' },
];

export const fashioneerNavItems: NavItem[] = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Requests', icon: 'inbox', to: '/fashioneer/requests' },
  { label: 'Jobs', icon: 'construction', to: '/fashioneer/jobs' },
  { label: 'Listings', icon: 'storefront', to: '/fashioneer/listings' },
  { label: 'Profile', icon: 'person', to: '/fashioneer/profile' },
];
