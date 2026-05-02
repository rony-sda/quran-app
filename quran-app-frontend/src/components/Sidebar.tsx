

const SurahCard = ({ number, name, englishName, translation, isActive }) => (
  <div 
    className={`flex items-center justify-between p-4 mb-3 rounded-xl cursor-pointer transition-all ${
      isActive 
        ? 'bg-[#F2F6F0] border border-[#BFD4BC]' 
        : 'bg-white border border-[#F0F0F0] hover:bg-[#FAFAFA]'
    }`}
  >
    {/* Left Part: Number & Name */}
    <div className="flex items-center gap-4">
      
      {/* CSS Diamond Number Shape (No Images) */}
      <div className="relative w-[38px] h-[38px] flex items-center justify-center shrink-0">
        {/* Rotated Background */}
        <div 
          className={`absolute w-[28px] h-[28px] rounded-[6px] rotate-45 transition-colors ${
            isActive ? 'bg-[#428038]' : 'bg-[#F4F5F4]'
          }`}
        ></div>
        {/* Number Text */}
        <span className={`relative z-10 text-[13px] font-semibold mt-0.5 ${
          isActive ? 'text-white' : 'text-[#8A9691]'
        }`}>
          {number}
        </span>
      </div>
      
      {/* Name Info */}
      <div className="flex flex-col text-left">
        <h3 className="text-[15px] font-medium text-[#4A4B4A]">{englishName}</h3>
        <p className="text-[12px] text-[#8D9994]">{translation}</p>
      </div>
    </div>

    {/* Right Part: Arabic Name Only (No Image) */}
    <div className="flex items-center pl-4">
      <h3 
        className={`text-[20px] text-right font-medium leading-normal ${
          isActive ? 'text-[#428038]' : 'text-[#8D9994]'
        }`} 
        dir="rtl"
      >
        {name}
      </h3>
    </div>
  </div>
);





const QuranSidebarComponent = () => {
  const surahs = [
    { id: 1, name: "الْفَاتِحَة", englishName: "Al Fatihah", translation: "The Opener", isActive: true },
    { id: 2, name: "الْبَقَرَة", englishName: "Al Baqarah", translation: "The Cow", isActive: false },
    { id: 3, name: "آل عمران", englishName: "Al Imran", translation: "Family of Imran", isActive: false },
    { id: 4, name: "النِّسَاء", englishName: "An Nisa", translation: "The Women", isActive: false },
    { id: 5, name: "الْمَائِدَة", englishName: "Al Ma'idah", translation: "The Table Spread", isActive: false },
    { id: 6, name: "الْأَنْعَام", englishName: "Al An'am", translation: "The Cattle", isActive: false },
    { id: 7, name: "الْأَعْرَاف", englishName: "Al A'raf", translation: "The Heights", isActive: false },
    { id: 8, name: "الْأَنْفَال", englishName: "Al Anfal", translation: "The Spoils of War", isActive: false },
    { id: 9, name: "التَّوْبَة", englishName: "At Tawbah", translation: "The Repentance", isActive: false },
  ];

  return (
    <div className="flex h-full w-full max-w-[350px] bg-white border-r border-[#F0F0F0] font-['Inter']">
      {/* Main Sidebar Content */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Tabs (Pill Design) */}
        <div className="px-6 py-4">
          <div className="flex items-center bg-[#F4F5F4] rounded-full p-1.5">
            <button className="flex-1 py-1.5 bg-white rounded-full text-[14px] font-semibold text-[#4A4B4A] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              Surah
            </button>
            <button className="flex-1 py-1.5 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] transition-colors">
              Juz
            </button>
            <button className="flex-1 py-1.5 rounded-full text-[14px] font-medium text-[#8A9691] hover:text-[#4A4B4A] transition-colors">
              Page
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-3 bg-[#F4F5F4] px-4 py-3 rounded-full border border-transparent focus-within:border-[#D0E0CD] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0A8A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search Surah" 
              className="bg-transparent border-none outline-none text-[14px] text-gray-700 placeholder-[#A0A8A5] w-full"
            />
          </div>
        </div>

        {/* Surah List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-gray-200">
          <div className="flex flex-col">
            {surahs.map((surah) => (
              <SurahCard 
                key={surah.id}
                number={surah.id}
                name={surah.name}
                englishName={surah.englishName}
                translation={surah.translation}
                isActive={surah.isActive}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default QuranSidebarComponent;