"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/src/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Reset state
      setQuery("");
      setResults([]);
      setSearched(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/search?q=${encodeURIComponent(query.trim())}&limit=20`
        );
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      router.push(`/${result.surahNumber}#ayah-${result.numberInSurah}`);
      onClose();
    },
    [router, onClose]
  );

  // Highlight matching text
  const highlightMatch = (text: string, q: string) => {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-[#d4edda] dark:bg-[#2a5a2a] text-inherit rounded px-0.5">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-[95%] max-w-[680px] bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden max-h-[75vh] flex flex-col animate-in">
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[#F0F0F0] dark:border-[#2a2a2a]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#428038"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ayahs by Arabic or English text..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#3A3B3A] dark:text-[#e0e0e0] placeholder-[#A0A8A5] font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#A0A8A5] hover:text-[#4A4B4A] dark:hover:text-[#e0e0e0] transition-colors"
            >
              <svg
                width="18"
                height="18"
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
          <kbd className="hidden md:inline-block text-[11px] text-[#A0A8A5] bg-[#F4F5F4] dark:bg-[#333] px-2 py-1 rounded border border-[#E0E0E0] dark:border-[#444] font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-[#8A9691]">
                <svg
                  className="animate-spin h-5 w-5 text-[#428038]"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span className="text-[14px]">Searching...</span>
              </div>
            </div>
          )}

          {/* No query yet */}
          {!loading && !searched && !query && (
            <div className="flex flex-col items-center justify-center py-16 text-[#A0A8A5]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="mb-4 opacity-40"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p className="text-[14px]">
                Type to search across all surahs
              </p>
              <p className="text-[12px] mt-1 opacity-60">
                Search by Arabic text or English translation
              </p>
            </div>
          )}

          {/* No results */}
          {!loading && searched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-[#A0A8A5]">
              <p className="text-[14px]">No results found</p>
              <p className="text-[12px] mt-1 opacity-60">
                Try a different search term
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="flex flex-col">
              <div className="px-6 py-3 text-[12px] text-[#8A9691] font-medium uppercase tracking-wider bg-[#FAFAFA] dark:bg-[#161616]">
                {results.length} result{results.length > 1 ? "s" : ""} found
              </div>
              {results.map((result, idx) => (
                <div
                  key={`${result.surahNumber}-${result.numberInSurah}-${idx}`}
                  onClick={() => handleResultClick(result)}
                  className="flex flex-col gap-3 px-6 py-5 border-b border-[#F0F0F0] dark:border-[#2a2a2a] cursor-pointer hover:bg-[#F8FBF8] dark:hover:bg-[#222] transition-colors"
                >
                  {/* Surah badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[#428038] bg-[#EDF3EE] dark:bg-[#1e2e1c] px-2.5 py-1 rounded-full">
                      {result.surahEnglishName} {result.surahNumber}:
                      {result.numberInSurah}
                    </span>
                  </div>

                  {/* Arabic text */}
                  <p
                    className="text-[20px] text-[#3A3B3A] dark:text-[#d0d0d0] text-right leading-[2]"
                    dir="rtl"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {result.arabicText}
                  </p>

                  {/* English translation */}
                  <p className="text-[14px] text-[#5A5B5A] dark:text-[#a0a0a0] leading-relaxed">
                    {highlightMatch(result.translation, query)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          animation: slideIn 0.2s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchModal;
