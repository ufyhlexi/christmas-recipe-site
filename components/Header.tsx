"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdMenu, IoMdClose as IoMdCloseMenu } from "react-icons/io";
import logo from "@/public/logo-cooker.png";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import { useSearch } from "@/contexts/SearchContext";
import { navItems } from "@/lib/navigation";

interface HeaderProps {
  hideSearch?: boolean;
}

export default function Header({ hideSearch = false }: HeaderProps) {
  const { setSearchTerm } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    setSearchTerm("");
    // Очищаем URL от параметра search, чтобы SearchBar синхронизировался
    router.push("/");
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  return (
    <>
      <header 
        className={`bg-[#d32f2f] text-white transition-all duration-300 ${
          isScrolled ? 'sticky top-0 z-50 shadow-lg' : 'relative'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center justify-center w-[40px] h-[40px] overflow-hidden flex-shrink-0"
          >
            <Image src={logo} alt="logo" width={35} height={35} className="object-contain"/>
          </Link>
          
          {/* Search - always in header */}
          {!hideSearch && <SearchBar />}
          
          {/* Desktop Navigation */}
          <Navigation items={navItems} />

          {/* Burger Menu Button - visible on screens < 768px */}
          <button
            onClick={toggleMenu}
            className="md:hidden menu-button flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoMdCloseMenu className="text-2xl" />
            ) : (
              <IoMdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <aside
        className={`mobile-menu fixed top-0 right-0 bg-[#d32f2f] text-white z-50 transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          h-[50vh] 
          w-[30vw] max-w-[30vw]
          max-[450px]:w-full max-[450px]:max-w-full
        `}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold uppercase">Menu</h2>
            <button
              onClick={closeMenu}
              className="flex items-center justify-center w-8 h-8 hover:bg-white/10 rounded transition-colors"
              aria-label="Close menu"
            >
              <IoMdCloseMenu className="text-2xl" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <Navigation items={navItems} isMobile={true} onLinkClick={closeMenu} />
        </div>
      </aside>
    </>
  );
}