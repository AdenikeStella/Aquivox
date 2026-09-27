"use client";
import { Logo } from "@/app/components/Logo";
import { useRouter } from "next/navigation";
import { User, BarChart2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const nextSteps = [
    {
        icon: <User size={20} className="text-[#0091A3]" />,
        title: "Complete Your Profile",
        desc: "Add your business details and preferences",
        bg: "bg-[#E6F9FC]",
    },
    {
        icon: <BarChart2 size={20} className="text-[#92400E]" />,
        title: "Start Logging Activities",
        desc: "Track your first catch or operation",
        bg: "bg-[#FEF9C3]",
    },
    {
        icon: <TrendingUp size={20} className="text-[#0369A1]" />,
        title: "Explore AI Insights",
        desc: "Discover predictive analytics features",
        bg: "bg-[#DBEAFE]",
    },
    {
        icon: <Users size={20} className="text-[#6D28D9]" />,
        title: "Join the Community",
        desc: "Connect with other water entrepreneurs",
        bg: "bg-[#EDE9FE]",
    },
];

export default function RegisterSuccess() {
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-[#F3F4F6]">
            {/* Logo */}
            <div className="mb-6">
                <Logo size={52} />
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] w-full max-w-210 flex flex-col items-center px-10 py-10 gap-7">
                {/* Success icon */}
                <span className="flex items-center justify-center bg-[#DCFCE7] rounded-full w-16 h-16">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="15" stroke="#22C55E" strokeWidth="2" />
                        <path
                            d="M9 16L13.5 20.5L23 11"
                            stroke="#22C55E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>

                {/* Heading */}
                <div className="text-center">
                    <h1 className="font-bold text-[26px] text-[#111827]">
                        Welcome to Aquivox!
                    </h1>
                    <p className="text-[#6B7280] text-sm mt-1.5">
{"                        Your account has been created successfully. Let's get you started. "}                    
</p>
                </div>

                {/* Next steps */}
                <div className="w-full p-8 gap-6 rounded-[14px] bg-[#F9FAFB] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#0091A3]" />
                        <p className="text-sm font-semibold text-[#374151]">
                            Next Steps to Get Started
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {nextSteps.map((step) => (
                            <div
                                key={step.title}
                                className={`flex flex-col gap-2 p-4 rounded-xl ${step.bg}`}
                            >
                                <span className="bg-white w-10 h-10 rounded-[10px] justify-center items-center flex">{step.icon}</span>
                                <p className="text-[#111827] font-semibold text-sm">
                                    {step.title}
                                </p>
                                <p className="text-[#6B7280] text-xs leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Link href="/userDashboard" className="w-full flex items-center justify-center gap-2 bg-[#0D6B6E] text-white py-3.5 rounded-xl font-semibold hover:bg-[#005F6B] transition text-sm">
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>

            </div>
        </div>
    );
}