"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/SearchContext";
import type { NavItem } from "@/lib/navigation";

interface NavigationProps {
  items: NavItem[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function Navigation({ items, isMobile = false, onLinkClick }: NavigationProps) {
  const { setSearchTerm } = useSearch();
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    setSearchTerm("");
    // Если ссылка ведет на главную страницу, очищаем URL от параметра search
    if (href === "/" || href.startsWith("/#")) {
      router.push("/");
    }
    if (onLinkClick) {
      onLinkClick();
    }
  };

  if (isMobile) {
    // Mobile navigation
    return (
      <nav className="flex flex-col flex-1 p-4 space-y-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => handleLinkClick(item.href)}
            className="text-lg font-semibold uppercase hover:bg-white/10 p-3 rounded transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  // Desktop navigation
  return (
    <nav className="hidden md:flex space-x-4 text-xs sm:text-sm font-semibold uppercase flex-shrink-0">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => handleLinkClick(item.href)}
          className="hover:underline whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

