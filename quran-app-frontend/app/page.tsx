import SettingsSidebar from "@/src/components/Settings";
import QuranSidebarComponent from "@/src/components/Sidebar";
import React from "react";
import homeImage from "@/public/makkah.webp"
import Image from "next/image";
import Header from "@/src/components/Header";
import TopHeader from "@/src/components/Top-Header";



const AyahBlock = ({ number, arabic, translation, translator, endIcon, isActive }) => (
  <div className="flex flex-col md:flex-row gap-6 py-8 px-2 md:px-6 border-b border-[#F0F0F0] bg-white group relative transition-colors hover:bg-[#FAFAFA]">
    
    {/* Active/Hover Left Border Indicator */}
    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md transition-opacity ${isActive ? 'bg-[#DDE8DE] opacity-100' : 'bg-[#DDE8DE] opacity-0 group-hover:opacity-100'}`}></div>

    {/* Left Actions Sidebar (Ayah Number & SVG Icons) */}
    <div className="flex md:flex-col items-center gap-6 w-full md:w-16 shrink-0 mt-2 z-10">
      <span className="text-[15px] font-bold text-[#428038]">{number}</span>
      
      {/* SVG Icons Instead of Images */}
      <div className="flex md:flex-col gap-6 items-center text-[#A0A8A5]">
        {/* Play Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#428038] transition-colors">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        
        {/* Book/Read Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#428038] transition-colors">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
        
        {/* Bookmark Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#428038] transition-colors">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        
        {/* More Dots Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#428038] transition-colors">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </div>
    </div>

    {/* Right Content Area */}
    <div className="flex-1 flex flex-col gap-8 z-10">
      
      {/* Arabic Text & End of Ayah Icon */}
      <div className="flex items-center justify-end gap-4 w-full">
        <h2
          className="text-[26px] md:text-[32px] font-normal text-[#3A3B3A] text-right leading-[2]"
          dir="rtl"
        >
          {arabic}
        </h2>
        {/* আপনি চাইলে endIcon প্রপ্স হিসেবে ইমেজ পাঠাতে পারেন */}
        {endIcon && (
          <img
            src={endIcon}
            alt="end-ayah"
            className="w-[24px] h-[29px] object-contain"
          />
        )}
      </div>

      {/* English Translation */}
      <div className="flex flex-col gap-1.5 text-left">
        <p className="text-[11px] font-semibold text-[#8A9691] uppercase tracking-wide">
          {translator}
        </p>
        <p className="text-[15px] text-[#4A4B4A] leading-relaxed">
          {translation}
        </p>
      </div>
    </div>
  </div>
);



const SurahComponent = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Leftmost Navigation Sidebar */}
      <TopHeader />
      
      {/* Right side containing Header and Main Layout */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        {/* Main Content Area: Sidebar + Surah + Settings */}
        <div className="flex-1 flex overflow-hidden">
          <QuranSidebarComponent />
          
          {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAFA] font-['Inter']">
      <div className="max-w-[1184px] mx-auto bg-white border-l border-r border-[#F0F0F0] min-h-screen">
        
        {/* Header Section */}
        <div className="grid grid-cols-3 items-center px-6 py-8 border-b border-[#F0F0F0]">
          {/* Left: Kaaba Image */}
          <div className="flex justify-start opacity-70">
            {/* <Image src={homeImage} alt="Header Icon" className="w-[100px] h-auto object-contain" /> */}
            <Image src={homeImage} alt="Header Icon" className="w-[150px] h-auto object-contain" /> 
          </div>
          
          {/* Center: Title & Info */}
          <div className="text-center flex flex-col items-center">
            <h1 className="text-[20px] font-bold text-[#4A4B4A]">
              Surah Al Fatihah
            </h1>
            <p className="text-[13px] text-[#8A9691] mt-1">Ayah-7, Makkah</p>
          </div>

          {/* Right: Empty div to keep the grid perfectly centered */}
          <div></div>
        </div>

        {/* Ayahs Container */}
        <div className="flex flex-col pb-20">
          <AyahBlock
            number="1:1"
            arabic="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝"
            translation="In the name of Allah, the Entirely Merciful, the Especially Merciful."
            translator="SAHEEH INTERNATIONAL"
            isActive={true} // বামপাশের সবুজ দাগটি দেখানোর জন্য
          />

          <AyahBlock
            number="1:2"
            arabic="الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝"
            translation="[All] praise is [due] to Allah, Lord of the worlds -"
            translator="SAHEEH INTERNATIONAL"
          />

          <AyahBlock
            number="1:3"
            arabic="الرَّحْمَٰنِ الرَّحِيمِ ۝"
            translation="The Entirely Merciful, the Especially Merciful,"
            translator="SAHEEH INTERNATIONAL"
          />
        </div>
      </div>
    </div>

          <SettingsSidebar />
        </div>
      </div>
    </div>
  );
};

export default SurahComponent;
