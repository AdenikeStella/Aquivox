"use client";
import { Logo } from "@/app/components/Logo";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

function CheckCircleIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#E6F9FC" />
      <path
        d="M12 20L17.5 25.5L28 15"
        stroke="#0091A3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stats = [
  { label: "Fishing Days", value: "24" },
  { label: "Profit Change", value: "+12%" },
  { label: "Pending Tasks", value: "7" },
];

export default function LoginSuccess() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Auto-redirect after 5 seconds with a progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          router.push("/userDashboard");
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center p-20 min-h-[70vh]">
      <div className="flex gap-3 items-center mb-10">
        <Logo size={50} />
      </div>

      <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-3xl gap-6 items-center">
        {/* Success icon */}
        <span className="flex items-center justify-center bg-[#E8F5E9] rounded-full p-5 w-20 h-20">
          <CircleCheck
            className="w-[46.67] h-[46.67] text-[#4CAF50]"
            strokeWidth={2.0}
          />
        </span>

        <div className="text-center font-inter">
          <h1 className="font-bold text-4xl text-[#1A1A1A]">Welcome Back!</h1>
          <p className="text-[#4F4F4F] text-base font-normal mt-1 text-center">
            {
              "                        You've successfully logged in. Redirecting to your dashboard...                    "
            }{" "}
          </p>
        </div>

        {/* Progress bar - auto redirect */}
        <div className="w-full rounded-full h-1.5 px-36 mb-6">
          <div
            className="bg-[#0091A3] h-1.5 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dashboard stats preview */}
        <div className="w-full bg-[#F9FAFB] rounded-[14px] p-4 gap-6 flex flex-col">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="flex justify-center items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2291_608)">
                  <path
                    d="M18.3346 10.0013H16.268C15.9038 10.0005 15.5494 10.1191 15.2589 10.3388C14.9685 10.5585 14.758 10.8673 14.6596 11.218L12.7013 18.1846C12.6887 18.2279 12.6624 18.2659 12.6263 18.293C12.5902 18.32 12.5464 18.3346 12.5013 18.3346C12.4562 18.3346 12.4124 18.32 12.3763 18.293C12.3402 18.2659 12.3139 18.2279 12.3013 18.1846L7.7013 1.81797C7.68868 1.77469 7.66236 1.73668 7.6263 1.70964C7.59024 1.68259 7.54638 1.66797 7.5013 1.66797C7.45622 1.66797 7.41236 1.68259 7.3763 1.70964C7.34024 1.73668 7.31392 1.77469 7.3013 1.81797L5.34297 8.78464C5.24502 9.13393 5.03579 9.44173 4.74702 9.66131C4.45826 9.88089 4.10574 10.0003 3.74297 10.0013H1.66797"
                    stroke="#005F6B"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2291_608">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="flex justify-center items-center text-[15px] font-inter font-semibold text-[#6B7280] uppercase tracking-wide">
              Your Dashboard Overview
            </p>
          </div>

          <div className="flex justify-between gap-6 p-14">
            <div className="flex flex-col items-center gap-3">
              <span className="flex rounded-[10px] bg-[#EBFDFF] w-12 h-12 items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C2.6 6.5 3.2 7 4.5 7C7 7 7 5 9.5 5C12.1 5 11.9 7 14.5 7C17 7 17 5 19.5 5C20.8 5 21.4 5.5 22 6"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12C2.6 12.5 3.2 13 4.5 13C7 13 7 11 9.5 11C12.1 11 11.9 13 14.5 13C17 13 17 11 19.5 11C20.8 11 21.4 11.5 22 12"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 18C2.6 18.5 3.2 19 4.5 19C7 19 7 17 9.5 17C12.1 17 11.9 19 14.5 19C17 19 17 17 19.5 17C20.8 17 21.4 17.5 22 18"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="text-2xl font-bold text-[#1A1A1A]">24</span>
              <p className="text-sm text-[#4F4F4F] font-normal font-inter">
                This Month
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="flex rounded-[10px] bg-[#FEF3C7] w-12 h-12 items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 7L13.5 15.5L8.5 10.5L2 17"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 7H22V13"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="text-2xl font-bold text-[#1A1A1A]">+12%</span>
              <p className="text-sm text-[#4F4F4F] font-normal font-inter">
                Active Logs
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="flex rounded-[10px] bg-[#EBFDFF] w-12 h-12 items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V6"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 2V6"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 10H21"
                    stroke="#005F6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="text-2xl font-bold text-[#1A1A1A]">7</span>
              <p className="text-sm text-[#4F4F4F] font-normal font-inter">
                Days Active
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={() => router.push("/userDashboard")}
            className="flex-1 bg-[#005F6B] text-white py-3 rounded-[10px] font-semibold hover:bg-[#0091A3] transition text-sm"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
