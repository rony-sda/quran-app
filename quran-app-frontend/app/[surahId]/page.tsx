"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import makkahImage from "@/public/makkah.webp";
import madinahImage from "@/public/madinah.webp";
import Header from "@/src/components/Header";
import TopHeader from "@/src/components/Top-Header";
import QuranSidebarComponent from "@/src/components/Sidebar";
import SettingsSidebar from "@/src/components/Settings";
import AudioPlayer from "@/src/components/AudioPlayer";
import { useAppContext } from "@/src/context/AppContext";
import { fetchSurahClient } from "@/src/lib/api";
import type { SurahDetail, Ayah } from "@/src/lib/api";

// --- Ayah Block Component ---
interface AyahBlockProps {
  surahNumber: number;
  ayah: Ayah;
  isActive: boolean;
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFace: string;
}

const AyahBlock = ({
  surahNumber,
  ayah,
  isActive: isInitiallyActive,
  arabicFontSize,
  translationFontSize,
  arabicFontFace,
}: AyahBlockProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Font family mapping
  const fontFamilyMap: Record<string, string> = {
    KFGQPC: "'Noto Naskh Arabic', 'Amiri', serif",
    Amiri: "'Amiri', serif",
    Scheherazade: "'Scheherazade New', serif",
  };

  const isActive = isInitiallyActive || isPlaying;

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`flex flex-row gap-4 md:gap-6 py-6 md:py-8 px-2 md:px-6 border-b border-[#F0F0F0] dark:border-[#2a2a2a] group relative transition-colors ${isPlaying ? "bg-[#FAFAFA] dark:bg-[#222]" : "bg-white dark:bg-[#1a1a1a] hover:bg-[#FAFAFA] dark:hover:bg-[#222]"
        }`}
    >
      {/* Active/Hover Left Border Indicator */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md transition-opacity ${isActive
            ? "bg-[#DDE8DE] opacity-100"
            : "bg-[#DDE8DE] opacity-0 group-hover:opacity-100"
          }`}
      ></div>

      {/* Left Actions Sidebar */}
      <div className="flex flex-col items-center gap-4 md:gap-6 w-12 md:w-16 shrink-0 mt-2 z-10">
        <span className="text-[13px] md:text-[15px] font-bold text-[#428038]">
          {surahNumber}:{ayah.numberInSurah}
        </span>

        <div className="flex flex-col gap-4 md:gap-6 items-center text-[#A0A8A5]">
          {/* Play Icon */}
          <AudioPlayer audioUrl={ayah.audioUrl} onPlayStateChange={setIsPlaying} />

          {/* Book/Read Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:text-[#428038] transition-colors"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>

          {/* Bookmark Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:text-[#428038] transition-colors"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>

          {/* More Dots Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:text-[#428038] transition-colors"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col gap-8 z-10">
        {/* Arabic Text */}
        <div className="flex items-center justify-end gap-4 w-full">
          <h2
            className="font-normal text-[#3A3B3A] dark:text-[#e0e0e0] text-right leading-[2.2]"
            dir="rtl"
            style={{
              fontSize: `${arabicFontSize}px`,
              fontFamily: fontFamilyMap[arabicFontFace] || fontFamilyMap.KFGQPC,
            }}
          >
            {ayah.text}
          </h2>
        </div>

        {/* English Translation */}
        <div className="flex flex-col gap-1.5 text-left">
          <p className="text-[11px] font-semibold text-[#8A9691] dark:text-[#6a7670] uppercase tracking-wide">
            SAHEEH INTERNATIONAL
          </p>
          <p
            className="text-[#4A4B4A] dark:text-[#c0c0c0] leading-relaxed"
            style={{ fontSize: `${translationFontSize}px` }}
          >
            {ayah.translation}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Loading Skeleton ---
const AyahSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-6 py-8 px-6 border-b border-[#F0F0F0] dark:border-[#2a2a2a] animate-pulse">
    <div className="flex md:flex-col items-center gap-6 w-16 shrink-0">
      <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="flex md:flex-col gap-4">
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ml-auto"></div>
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

// --- Main Surah Page ---
export default function SurahPage() {
  const params = useParams();
  const surahId = Number(params.surahId);
  const { fontSettings, isSidebarOpen, closeSidebar, isSettingsOpen, closeSettings } = useAppContext();

  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahId || surahId < 1 || surahId > 114) {
      setError("Invalid surah number");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchSurahClient(surahId)
      .then((data) => {
        setSurah(data);
        setLoading(false);
        // Handle hash navigation after content loads
        setTimeout(() => {
          const hash = window.location.hash;
          if (hash) {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 100);
      })
      .catch((err) => {
        console.error("Failed to fetch surah:", err);
        setError("Failed to load surah. Please try again.");
        setLoading(false);
      });
  }, [surahId]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* Left Icon Sidebar */}
      <TopHeader />

      {/* Right side */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
              onClick={closeSidebar}
            ></div>
          )}

          {/* Mobile settings overlay */}
          {isSettingsOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
              onClick={closeSettings}
            ></div>
          )}

          {/* Surah Sidebar */}
          <QuranSidebarComponent activeSurahId={surahId} />

          {/* Main Scrollable Area */}
          <div className="flex-1 overflow-y-auto bg-[#FAFAFA] dark:bg-[#111] font-[var(--font-inter)]">
            <div className="max-w-[1184px] mx-auto bg-white dark:bg-[#1a1a1a] border-l border-r border-[#F0F0F0] dark:border-[#2a2a2a] min-h-screen">
              {/* Surah Header */}
              {surah && (
                <div className="flex flex-col md:grid md:grid-cols-3 items-center justify-center gap-4 px-6 py-8 border-b border-[#F0F0F0] dark:border-[#2a2a2a]">
                  <div className="flex justify-center md:justify-start opacity-70 order-2 md:order-1">
                    {
                      surah.revelationType === "Meccan" ?
                        <Image
                          src={makkahImage}
                          alt="Makkah"
                          className="w-[100px] md:w-[150px] h-auto object-contain" /> :
                        <Image
                          src={madinahImage}
                          alt="Madinah"
                          className="w-[100px] md:w-[150px] h-auto object-contain" />
                    }

                  </div>
                  <div className="text-center flex flex-col items-center order-1 md:order-2">
                    <h1 className="text-[22px] md:text-[20px] font-bold text-[#4A4B4A] dark:text-[#e0e0e0]">
                      {surah.englishName}
                    </h1>
                    <p className="text-[13px] text-[#8A9691] mt-1">
                      Ayah-{surah.numberOfAyahs},{" "}
                      {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
                    </p>
                  </div>
                  <div className="hidden md:block order-3"></div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-6 py-2 bg-[#428038] text-white rounded-lg hover:bg-[#356b2b] transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col pb-20">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <AyahSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Ayahs */}
              {surah && !loading && (
                <div className="flex flex-col pb-20">
                  {surah.ayahs.map((ayah, index) => (
                    <AyahBlock
                      key={ayah.number}
                      surahNumber={surah.number}
                      ayah={ayah}
                      isActive={index === 0}
                      arabicFontSize={fontSettings.arabicFontSize}
                      translationFontSize={fontSettings.translationFontSize}
                      arabicFontFace={fontSettings.arabicFontFace}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <SettingsSidebar />
        </div>
      </div>
    </div>
  );
}
