"use client";

import { PiArrowLeft } from "react-icons/pi";
import { useRouter } from "next/navigation";

const Title = ({
  title,
  description,
    canGoBack = false,
  className,
}: {
  title: string;
  description: string | React.ReactNode;
    canGoBack?: boolean;
  className?: string;
}) => {
    const router = useRouter();
     const goBack = () => {
    router.back();
     };
     
  return (
    <div
      className={`sticky top-15.25 md:top-0 z-20 flex items-center gap-3 px-5 py-4 ${className} w-full`}
    >
      {canGoBack && (
        <div
          onClick={goBack}
          className="flex p-2 rounded-full cursor-pointer hover:bg-[#e1e8e1]/50 transition items-center gap-2"
        >
          <PiArrowLeft className="w-5 h-5 flex" />
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

export default Title;
