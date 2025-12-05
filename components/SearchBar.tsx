"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { useSearch } from "@/contexts/SearchContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Синхронизация URL с поисковым запросом при загрузке страницы (только на главной странице)
  useEffect(() => {
    const searchParam = searchParams?.get("search");
    // Применяем поиск только на главной странице
    if (searchParam && pathname === "/") {
      setSearchTerm(searchParam);
      setInputValue(searchParam);
      setIsSearchActive(true);
    } else if (!searchParam && pathname === "/") {
      // Если на главной странице нет параметра search, очищаем поиск
      setSearchTerm("");
      setInputValue("");
      setIsSearchActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname]);

  // Синхронизация inputValue с searchTerm из контекста (когда searchTerm очищается извне)
  useEffect(() => {
    const searchParam = searchParams?.get("search");
    // Если searchTerm очищен, а в URL нет параметра search, очищаем inputValue
    if (!searchTerm && !searchParam && inputValue) {
      setInputValue("");
      setIsSearchActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const updateURL = (searchValue: string) => {
    // На главной странице обновляем URL с параметром search
    if (pathname === "/") {
      const params = new URLSearchParams();
      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
        const newURL = `/?${params.toString()}`;
        router.push(newURL);
      } else {
        router.push("/");
      }
    }
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setSearchTerm(trimmedValue);
      setIsSearchActive(true);
      
      // Если мы не на главной странице, перенаправляем на главную с поисковым запросом
      // Поиск работает глобально на всех страницах
      if (pathname !== "/") {
        const params = new URLSearchParams();
        params.set("search", trimmedValue);
        router.push(`/?${params.toString()}`);
      } else {
        // На главной странице обновляем URL с поисковым запросом
        updateURL(trimmedValue);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // If user starts typing after search was active, reset search state
    if (isSearchActive && value !== searchTerm) {
      setIsSearchActive(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setIsSearchActive(false);
    // Удаляем поисковый запрос из URL
    updateURL("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Show clear button (cross) when search is active and input matches search term
  const showClearButton = isSearchActive && inputValue.trim() === searchTerm && searchTerm !== "";

  return (
    <div className="flex-1 flex justify-center max-w-md">
      <div className="w-full flex items-center bg-white rounded-lg shadow-md px-3 py-1.5">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Sök recept..."
          className="w-full outline-none text-gray-700 text-sm px-2 pr-8"
        />
        <div className="flex items-center">
          {showClearButton ? (
            <button
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <IoMdClose className="text-lg" />
            </button>
          ) : (
            <button 
              onClick={handleSearch}
              className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              aria-label="Search"
              disabled={!inputValue.trim()}
            >
              <IoMdSearch className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

