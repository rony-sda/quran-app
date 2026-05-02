import React from 'react';

const SettingsSidebar = () => {
  return (
    <div className="w-full max-w-[300px] h-full bg-white border-l border-[#F0F0F0] flex flex-col font-['Inter'] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
      
      {/* Tabs Section (Translation / Reading) */}
      <div className="px-6 py-6">
        <div className="flex items-center bg-[#F4F5F4] rounded-full p-1.5">
          <button className="flex-1 py-2 bg-white rounded-full text-[14px] font-semibold text-[#4A4B4A] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            Translation
          </button>
          <button className="flex-1 py-2 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] transition-colors">
            Reading
          </button>
        </div>
      </div>

      {/* Settings Options Section */}
      <div className="flex-1 px-6 flex flex-col gap-8">
        
        {/* Reading Settings Toggle */}
        <div className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="#8A9691" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h2 className="text-[15px] font-medium text-[#4A4B4A]">Reading Settings</h2>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#4A4B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 opacity-80">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Font Settings Group */}
        <div className="flex flex-col gap-7">
          
          {/* Header */}
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-[18px] h-[18px] bg-[#428038] text-white rounded-[4px] flex items-center justify-center text-[12px] font-bold">
                T
              </div>
              <h2 className="text-[15px] font-bold text-[#428038]">Font Settings</h2>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#428038" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>

          {/* Settings Items */}
          <div className="flex flex-col gap-8">
            
            {/* Arabic Font Size Slider */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#4A4B4A] font-medium">Arabic Font Size</span>
                <span className="text-[#428038] font-bold">30</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                defaultValue="30" 
                className="w-full accent-[#428038] h-[4px] bg-[#EAEAEA] rounded-lg appearance-none cursor-pointer outline-none" 
              />
            </div>

            {/* Translation Font Size Slider */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#4A4B4A] font-medium">Translation Font Size</span>
                <span className="text-[#428038] font-bold">17</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="40" 
                defaultValue="17" 
                className="w-full accent-[#428038] h-[4px] bg-[#EAEAEA] rounded-lg appearance-none cursor-pointer outline-none" 
              />
            </div>

            {/* Arabic Font Face Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-[15px] text-[#4A4B4A] font-medium">Arabic Font Face</span>
              <div className="flex items-center justify-between bg-[#F4F5F4] px-4 py-3.5 rounded-[8px] cursor-pointer hover:bg-[#ebeceb] transition-colors">
                <span className="text-[14px] text-[#4A4B4A] font-medium">KFGQ</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="#A0A8A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Support Us Bottom Card */}
      <div className="px-6 pb-6 pt-4 mt-4">
        <div className="bg-[#EDF3EE] border border-[#DDE8DE] rounded-[12px] p-5 flex flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#3A3B3A] leading-snug">
            Help spread the knowledge of Islam
          </h3>
          <p className="text-[13px] text-[#7A827E] leading-relaxed">
            Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
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