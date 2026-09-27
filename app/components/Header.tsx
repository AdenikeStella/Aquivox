"use client";

import { PiArrowLeft } from "react-icons/pi";
import { useRouter } from "next/navigation";

const Header = ({
  title,
  description,
  where,
  canGoBack = false,
  className,
}: {
  title: string;
  description: string | React.ReactNode;
  where:string;
  canGoBack?: boolean;
  className?: string;
}) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={`sticky top-0 z-20 bg-white flex items-center gap-3 border-b border-[#8D8D8D33] px-5 py-4 ${className}`}
    >
      {canGoBack && (
        <div
          onClick={goBack}
          className="flex p-2 rounded-full cursor-pointer hover:bg-[#e1e8e1]/50 transition items-center gap-2"
        >
          <PiArrowLeft className="w-5 h-5 flex" />
          <p className="flex text-[#6B7280]">Back to {where}</p>
        </div>
      )}
      <div>
        <span className="md:text-2xl text-base font-medium md:font-semibold text-[#333] mb-1">
          {title}
        </span>
        <p className="text-[#8d8d8d] text-[13px] md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Header;
