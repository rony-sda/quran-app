import React from 'react';

const Header = () => {
  return (
    <div className="w-full">
      <div className="px-10 py-2 flex items-center justify-between border-b border-b-[#F0F0F0]">
        
        {/* Left Side: Logo & Title */}
        <div>
          <h1 className="text-[20px] font-bold text-[#4A4B4A]">Quran Mazid</h1>
          <p className="text-[11px] text-[#A0A8A5] mt-0.5">Read, Study, and Learn The Quran</p>
        </div>

        {/* Right Side: Icons & Navbar */}
        <div className="flex items-center gap-3">
          
          {/* Search Icon */}
          <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#F4F7F5] cursor-pointer hover:bg-[#E6EFE8] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#428037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          {/* Sun / Theme Icon */}
          <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#F4F7F5] cursor-pointer hover:bg-[#E6EFE8] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#428037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>

          {/* Support Us Button */}
          <button className="flex items-center gap-2 bg-[#428037] text-white px-5 py-2.5 ml-2 rounded-full text-[14px] font-medium hover:bg-[#356b2b] transition-colors shadow-sm">
            Support Us
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none"><path opacity="0.4" d="M15.2153 6.0675C15.2153 6.18 15.2153 6.29251 15.2078 6.39751C14.0603 5.97001 12.7103 6.23251 11.8103 7.04251C11.2028 6.49501 10.4153 6.18751 9.57531 6.18751C7.73031 6.18751 6.23032 7.69501 6.23032 9.55501C6.23032 11.6775 7.29532 13.23 8.31532 14.235C8.23282 14.2275 8.16532 14.2125 8.10532 14.19C6.16282 13.5225 1.82031 10.7625 1.82031 6.0675C1.82031 3.9975 3.48531 2.32501 5.54031 2.32501C6.76281 2.32501 7.84281 2.91 8.51781 3.8175C9.20031 2.91 10.2803 2.32501 11.4953 2.32501C13.5503 2.32501 15.2153 3.9975 15.2153 6.0675Z" fill="currentColor"></path><path d="M13.8217 7.1925C13.0192 7.1925 12.2917 7.58251 11.8417 8.18251C11.3917 7.58251 10.6717 7.1925 9.86171 7.1925C8.49671 7.1925 7.38672 8.30251 7.38672 9.68251C7.38672 10.215 7.46922 10.7025 7.61922 11.1525C8.32422 13.38 10.4917 14.7075 11.5642 15.075C11.7142 15.1275 11.9617 15.1275 12.1192 15.075C13.1917 14.7075 15.3592 13.38 16.0642 11.1525C16.2142 10.695 16.2967 10.2075 16.2967 9.68251C16.2967 8.30251 15.1867 7.1925 13.8217 7.1925Z" fill="currentColor"></path></svg>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Header;