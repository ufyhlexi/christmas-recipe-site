// Type for navigation items
export type NavItem = {
  href: string;
  label: string;
};

// Navigation items array
// To add new pages, simply add a new object to this array
export const navItems: NavItem[] = [
  { href: "/", label: "Hem" },
  { href: "/category/jul", label: "Julrecept" },
  { href: "/contact", label: "Kontakt" },
];

