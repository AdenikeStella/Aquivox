"use client";
import { Logo } from "@/app/components/Logo";
import { useRouter } from "next/navigation";
import { CircleCheck, Key, KeyRound, Lock, Shield, ShieldCheck } from "lucide-react";

const securityTips = [
    {
        icon: <Lock size={22} className="text-[#005F6B] bg-[#ffffff]" />,
        title: "Keep It Private",
        desc: "Never share your password",
        bg: "bg-[#E6F9FC]",
        titleColor: "text-[#1A1A1A]",
    },
    {
        icon: <Key size={22} className="text-[#005F6B] bg-[#ffffff]" />,
        title: "Update Regularly",
        desc: "Change every 90 days",
        bg: "bg-[#FEF3C7]",
        titleColor: "text-[#1A1A1A]",
    },
    {
        icon: <Shield size={22} className="text-[#005F6B] bg-[#ffffff]" />,
        title: "Stay Alert",
        desc: "Watch for suspicious activity",
        bg: "bg-[#DBEAFE]",
        titleColor: "text-[##1A1A1A]",
    },
];

function getTimestamp() {
    return new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export default function ResetComplete() {
    const router = useRouter();
    const timestamp = getTimestamp();

    return (
        <div className="flex flex-col justify-center items-center px-6 py-16 min-h-[80vh]">
            {/* Logo */}
            <div className="mb-8">
                <Logo size={56} />
            </div>

            {/* Card */}
            <div className="flex flex-col bg-white rounded-3xl shadow-xl border border-[#E5E7EB] w-full max-w-210 overflow-hidden">
                <div className="flex flex-col items-center px-12 pt-12 pb-8 gap-5 text-center">
                    {/* Success icon */}
                    {/* Success icon */}
                <span className="flex items-center justify-center bg-[#E8F5E9] rounded-full p-5 w-20 h-20">
                    <CircleCheck className="w-[46.67] h-[46.67] text-[#4CAF50]" strokeWidth={2.0} />
                </span>

                    <div>
                        <h1 className="font-bold text-4xl text-[#1A1A1A]">
                            Password Reset Complete!
                        </h1>
                        <p className="text-[#4F4F4F] text-base font-normal mt-1 text-center">
                            Your password has been successfully changed. You can now sign in
                            with your new credentials.
                        </p>
                    </div>
                </div>

                {/* Security tips section */}
                <div className="mx-8 mb-8 bg-[#F9FAFB] rounded-2xl p-8 gap-6">
                    <div className="flex items-center gap-2 mb-5">
                        <span className="w-2 h-2 rounded-full bg-[#005F6B]" />
                        <p className="text-[15px] font-semibold text-[#4F4F4F]">
                            Keep Your Account Secure
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {securityTips.map((tip) => (
                            <div
                                key={tip.title}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl ${tip.bg}`}
                            >
                                <span>{tip.icon}</span>
                                <p className={`text-sm font-bold text-center ${tip.titleColor}`}>
                                    {tip.title}
                                </p>
                                <p className="text-xs text-[#6B7280] text-center">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 px-8 mb-8">
                    <button
                        onClick={() => router.push("/login")}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#005F6B] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0091A3] transition text-sm"
                    >
                        Sign In Now
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M3 8H13M13 8L9 4M13 8L9 12"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="flex-1 border border-[#E5E7EB] text-[#374151] py-3.5 rounded-xl font-semibold hover:bg-[#005F6B] hover:text-white transition text-sm"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Timestamp */}
                <div className="mt-2 px-8 py-4 text-center mb-7">
                    <p className="text-[#9CA3AF] text-xs">
                        Password changed on {timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
}