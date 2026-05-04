"use client";

import React, { useState } from "react";
import { useAppContext } from "@/src/context/AppContext";

const ARABIC_FONTS = [
  { id: "KFGQPC", name: "KFGQPC", label: "KFGQPC Hafs" },
  { id: "Amiri", name: "Amiri", label: "Amiri" },
  { id: "Scheherazade", name: "Scheherazade New", label: "Scheherazade" },
];

const SettingsSidebar = () => {
  const {
    fontSettings,
    setArabicFontSize,
    setTranslationFontSize,
    setArabicFontFace,
    isSettingsOpen,
    closeSettings,
  } = useAppContext();

  const [isFontOpen, setIsFontOpen] = useState(true);
  const [showFontSelector, setShowFontSelector] = useState(false);

  const currentFont = ARABIC_FONTS.find((f) => f.id === fontSettings.arabicFontFace) || ARABIC_FONTS[0];

  return (
    <div
      className={`
        h-full w-full md:max-w-[320px] bg-white dark:bg-[#1a1a1a] border-l border-[#F0F0F0] dark:border-[#2a2a2a]
        flex flex-col font-[var(--font-inter)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200
        fixed md:relative right-0 top-0 z-40 md:z-auto
        transition-transform duration-300 ease-in-out
        ${isSettingsOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}
    >
      {/* Mobile Header (Title and Close) */}
      <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-[#F0F0F0] dark:border-[#2a2a2a]">
        <h2 className="text-[17px] font-bold text-[#4A4B4A] dark:text-[#e0e0e0] leading-tight">
          Settings
        </h2>
        <button
          onClick={closeSettings}
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

      {/* Tabs Section */}
      <div className="px-6 py-6 md:py-6">
        <div className="flex items-center bg-[#F4F5F4] dark:bg-[#252525] rounded-full p-1.5">
          <button className="flex-1 py-2 bg-white dark:bg-[#333] rounded-full text-[14px] font-semibold text-[#4A4B4A] dark:text-[#e0e0e0] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            Translation
          </button>
          <button className="flex-1 py-2 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0] transition-colors">
            Reading
          </button>
        </div>
      </div>

      {/* Settings Options */}
      <div className="flex-1 px-6 flex flex-col gap-8">
        {/* Reading Settings Toggle */}
        <div className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A9691"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[20px] h-[20px]"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h2 className="text-[15px] font-medium text-[#4A4B4A] dark:text-[#e0e0e0]">
              Reading Settings
            </h2>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A4B4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 opacity-80 dark:stroke-[#e0e0e0]"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Font Settings Group */}
        <div className="flex flex-col gap-7">
          {/* Header - Collapsible */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsFontOpen(!isFontOpen)}
          >
            <div className="flex items-center gap-4">
              <div className="w-[18px] h-[18px] bg-[#428038] text-white rounded-[4px] flex items-center justify-center text-[12px] font-bold">
                T
              </div>
              <h2 className="text-[15px] font-bold text-[#428038]">
                Font Settings
              </h2>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#428038"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-4 h-4 transition-transform duration-200 ${isFontOpen ? "" : "rotate-180"}`}
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>

          {/* Settings Items - Collapsible */}
          {isFontOpen && (
            <div className="flex flex-col gap-8">
              {/* Arabic Font Size Slider */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-[#4A4B4A] dark:text-[#e0e0e0] font-medium">
                    Arabic Font Size
                  </span>
                  <span className="text-[#428038] font-bold">
                    {fontSettings.arabicFontSize}
                  </span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="50"
                  value={fontSettings.arabicFontSize}
                  onChange={(e) => setArabicFontSize(Number(e.target.value))}
                  className="w-full accent-[#428038] h-[4px] bg-[#EAEAEA] dark:bg-[#333] rounded-lg appearance-none cursor-pointer outline-none"
                />
              </div>

              {/* Translation Font Size Slider */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-[#4A4B4A] dark:text-[#e0e0e0] font-medium">
                    Translation Font Size
                  </span>
                  <span className="text-[#428038] font-bold">
                    {fontSettings.translationFontSize}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={fontSettings.translationFontSize}
                  onChange={(e) =>
                    setTranslationFontSize(Number(e.target.value))
                  }
                  className="w-full accent-[#428038] h-[4px] bg-[#EAEAEA] dark:bg-[#333] rounded-lg appearance-none cursor-pointer outline-none"
                />
              </div>

              {/* Arabic Font Face Selector */}
              <div className="flex flex-col gap-3">
                <span className="text-[15px] text-[#4A4B4A] dark:text-[#e0e0e0] font-medium">
                  Arabic Font Face
                </span>
                <div
                  className="flex items-center justify-between bg-[#F4F5F4] dark:bg-[#252525] px-4 py-3.5 rounded-[8px] cursor-pointer hover:bg-[#ebeceb] dark:hover:bg-[#333] transition-colors"
                  onClick={() => setShowFontSelector(!showFontSelector)}
                >
                  <span className="text-[14px] text-[#4A4B4A] dark:text-[#e0e0e0] font-medium">
                    {currentFont.label}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A0A8A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-4 h-4 transition-transform duration-200 ${showFontSelector ? "rotate-90" : ""}`}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>

                {/* Font Options Dropdown */}
                {showFontSelector && (
                  <div className="flex flex-col gap-1 mt-1">
                    {ARABIC_FONTS.map((font) => (
                      <div
                        key={font.id}
                        onClick={() => {
                          setArabicFontFace(font.id);
                          setShowFontSelector(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-[8px] cursor-pointer transition-colors ${
                          fontSettings.arabicFontFace === font.id
                            ? "bg-[#EDF3EE] dark:bg-[#1e2e1c] text-[#428038]"
                            : "bg-[#FAFAFA] dark:bg-[#222] text-[#4A4B4A] dark:text-[#e0e0e0] hover:bg-[#F0F0F0] dark:hover:bg-[#333]"
                        }`}
                      >
                        <span className="text-[14px] font-medium">
                          {font.label}
                        </span>
                        {fontSettings.arabicFontFace === font.id && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#428038"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Support Us Bottom Card */}
      <div className="px-6 pb-6 pt-4 mt-4">
        <div className="bg-[#EDF3EE] dark:bg-[#1e2e1c] border border-[#DDE8DE] dark:border-[#3a5a35] rounded-[12px] p-5 flex flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#3A3B3A] dark:text-[#e0e0e0] leading-snug">
            Help spread the knowledge of Islam
          </h3>
          <p className="text-[13px] text-[#7A827E] leading-relaxed">
            Your regular support helps us reach our religious brothers and
            sisters with the message of Islam. Join our mission and be part of
            the big change.
          </p>
          <button className="w-full mt-2 bg-[#428038] text-white py-3 rounded-[8px] text-[14px] font-semibold hover:bg-green-800 transition-colors shadow-sm">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;