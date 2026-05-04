"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchSurahsClient } from "@/src/lib/api";
import type { SurahInfo } from "@/src/lib/api";
import { useAppContext } from "@/src/context/AppContext";
import logo from "@/public/Image (1).png";

// --- Surah Card ---
interface SurahCardProps {
  number: number;
  name: string;
  englishName: string;
  translation: string;
  isActive: boolean;
  onClick: () => void;
}

const SurahCard = ({
  number,
  name,
  englishName,
  translation,
  isActive,
  onClick,
}: SurahCardProps) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 mb-3 rounded-xl cursor-pointer transition-all ${isActive
      ? "bg-[#F2F6F0] dark:bg-[#1e2e1c] border border-[#BFD4BC] dark:border-[#3a5a35]"
      : "bg-white dark:bg-[#1a1a1a] border border-[#F0F0F0] dark:border-[#2a2a2a] hover:bg-[#FAFAFA] dark:hover:bg-[#222]"
      }`}
  >
    {/* Left Part: Number & Name */}
    <div className="flex items-center gap-4">
      {/* Diamond Number Shape */}
      <div className="relative w-[38px] h-[38px] flex items-center justify-center shrink-0">
        <div
          className={`absolute w-[28px] h-[28px] rounded-[6px] rotate-45 transition-colors ${isActive ? "bg-[#428038]" : "bg-[#F4F5F4] dark:bg-[#2a2a2a]"
            }`}
        ></div>
        <span
          className={`relative z-10 text-[13px] font-semibold mt-0.5 ${isActive ? "text-white" : "text-[#8A9691]"
            }`}
        >
          {number}
        </span>
      </div>

      {/* Name Info */}
      <div className="flex flex-col text-left">
        <h3 className="text-[15px] font-medium text-[#4A4B4A] dark:text-[#e0e0e0]">
          {englishName}
        </h3>
        <p className="text-[12px] text-[#8D9994]">{translation}</p>
      </div>
    </div>

    {/* Right Part: Arabic Name */}
    <div className="flex items-center pl-4">
      <h3
        className={`text-[20px] text-right font-medium leading-normal ${isActive ? "text-[#428038]" : "text-[#8D9994]"
          }`}
        dir="rtl"
      >
        {name}
      </h3>
    </div>
  </div>
);

// --- Main Sidebar Component ---
interface QuranSidebarProps {
  activeSurahId: number;
}

const QuranSidebarComponent = ({ activeSurahId }: QuranSidebarProps) => {
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useAppContext();
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all surahs on mount
  useEffect(() => {
    fetchSurahsClient()
      .then((data) => {
        setSurahs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch surahs:", err);
        setLoading(false);
      });
  }, []);

  // Filter surahs by search query
  const filteredSurahs = surahs.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.englishName.toLowerCase().includes(q) ||
      s.englishNameTranslation.toLowerCase().includes(q) ||
      s.name.includes(searchQuery) ||
      String(s.number).includes(q)
    );
  });

  const handleSurahClick = (surahNumber: number) => {
    router.push(`/${surahNumber}`);
    closeSidebar();
  };

  return (
    <div
      className={`
        h-full w-full md:max-w-[350px] bg-white dark:bg-[#1a1a1a] border-r border-[#F0F0F0] dark:border-[#2a2a2a] font-[var(--font-inter)]
        flex flex-col
        fixed md:relative z-40 md:z-auto top-0 left-0
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Mobile Header (Logo and Close) */}
      <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-[#F0F0F0] dark:border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Quran Mazid"
            width={36}
            height={36}
            className="object-contain dark:invert"
          />
          <div className="flex flex-col">
            <h2 className="text-[17px] font-bold text-[#4A4B4A] dark:text-[#e0e0e0] leading-tight">
              Quran Mazid
            </h2>
            <p className="text-[11px] text-[#8A9691] leading-tight mt-0.5">
              Read, Study, and Learn The Quran
            </p>
          </div>
        </div>
        <button
          onClick={closeSidebar}
          className="text-[#8A9691] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0] transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Tabs (Pill Design) */}
      <div className="px-6 pt-6 md:pt-4 pb-4">
        <div className="flex items-center bg-[#F4F5F4] dark:bg-[#252525] rounded-full p-1.5">
          <button className="flex-1 py-1.5 bg-white dark:bg-[#333] rounded-full text-[14px] font-semibold text-[#4A4B4A] dark:text-[#e0e0e0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            Surah
          </button>
          <button className="flex-1 py-1.5 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0] transition-colors">
            Juz
          </button>
          <button className="flex-1 py-1.5 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0] transition-colors">
            Page
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-3 bg-[#F4F5F4] dark:bg-[#252525] px-4 py-3 rounded-full border border-transparent focus-within:border-[#D0E0CD] transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A0A8A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search Surah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] text-gray-700 dark:text-gray-300 placeholder-[#A0A8A5] w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#A0A8A5] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Surah List (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="flex flex-col">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 mb-3 rounded-xl border border-[#F0F0F0] dark:border-[#2a2a2a] animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[38px] h-[38px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))
          ) : filteredSurahs.length === 0 ? (
            <p className="text-center text-[#8A9691] py-8 text-sm">
              No surahs found
            </p>
          ) : (
            filteredSurahs.map((surah) => (
              <SurahCard
                key={surah.number}
                number={surah.number}
                name={surah.name}
                englishName={surah.englishName}
                translation={surah.englishNameTranslation}
                isActive={surah.number === activeSurahId}
                onClick={() => handleSurahClick(surah.number)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranSidebarComponent;