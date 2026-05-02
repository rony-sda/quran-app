import Image from "next/image";
import logo from "@/public/Image (1).png";
import icon1 from "@/public/Image (2).png";
import icon2 from "@/public/Image (3).png";
import icon3 from "@/public/Image (4).png";
import icon4 from "@/public/Image (5).png";
import icon5 from "@/public/Image (6).png";

const TopHeader = () => {
    return (
        <div className="w-[70px] h-full flex flex-col justify-start items-center py-6 bg-[#FAFAFA] border-r border-[#F0F0F0] shrink-0">
            {/* Logo */}
            <div className="mb-8">
                <Image src={logo} alt="logo" width={40} height={40} className="object-contain" />
            </div>
            
            {/* Nav Icons - Centered Vertically */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
                <Image src={icon1} alt="nav" className="w-[22px] h-[22px] object-contain cursor-pointer opacity-70 hover:opacity-100" />
                <Image src={icon2} alt="nav" className="w-[20px] h-[20px] object-contain cursor-pointer opacity-50 hover:opacity-100" />
                <Image src={icon3} alt="nav" className="w-[20px] h-[20px] object-contain cursor-pointer opacity-50 hover:opacity-100" />
                <Image src={icon4} alt="nav" className="w-[18px] h-[22px] object-contain cursor-pointer opacity-50 hover:opacity-100" />
                <Image src={icon5} alt="nav" className="w-[22px] h-[22px] object-contain cursor-pointer opacity-50 hover:opacity-100" />
            </div>
        </div>
    );
};

export default TopHeader