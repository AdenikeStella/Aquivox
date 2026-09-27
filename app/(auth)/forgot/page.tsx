"use client";
import { Logo } from "@/app/components/Logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Phone, KeyRound, Clock, Lock } from "lucide-react";
import { forgotPassword } from "@/app/services/onboarding";

const features = [
    {
        icon: <KeyRound size={18} className="text-[#005F6B]" />,
        title: "Secure Verification",
        desc: "OTP code sent directly to your phone",
    },
    {
        icon: <Clock size={18} className="text-[#005F6B]" />,
        title: "Quick Process",
        desc: "Reset in under 2 minutes",
    },
    {
        icon: <Lock size={18} className="text-[#005F6B]" />,
        title: "Protected Reset",
        desc: "No email required for verification",
    },
];

export default function ForgotPassword() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const digitsOnly = phone.replace(/[^0-9]/g, "");
        if (digitsOnly.length < 7) {
            setError("Please enter a valid phone number.");
            return;
        }

        setIsLoading(true);
        try {
            await forgotPassword({ mobile: phone });

            router.push(`/forgot/verify?mobile=${encodeURIComponent(phone)}`);
        } catch (err: any) {
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between p-4 md:p-20">
                {/* Left side */}
                <div className="md:flex flex-col my-auto py-40 gap-8 hidden">
                    <div className="flex gap-3 items-center">
                        <Logo size={50} />
                        <p className="font-bold text-[22px] font-sans">Aquivox</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-inter font-extrabold leading-tight text-[#111827]">
                            Secure Password
                            <br />
                            Recovery
                        </h1>
                        <p className="text-[#6B7280] text-lg leading-relaxed">
                            We'll send you a secure verification code to help you <br />
                            reset your password and regain access to your account.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {features.map((f) => (
                            <div key={f.title} className="flex items-center gap-4">
                                <span className="flex items-center justify-center bg-[#E6F9FC] rounded-[12px] p-3 w-10 h-10 shrink-0">
                                    {f.icon}
                                </span>
                                <div>
                                    <p className="text-[#111827] font-semibold text-[15px]">
                                        {f.title}
                                    </p>
                                    <p className="text-sm text-[#6B7280]">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side — form card */}
                <div className="flex flex-col justify-end py-40">
                    <div className="flex flex-col p-3 md:p-10 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] w-full max-w-lg gap-6">
                        <div>
                            <h3 className="font-bold text-[26px] text-[#111827]">
                                Reset Password
                            </h3>
                            <p className="text-[#6B7280] text-[15px] mt-1">
                                Enter your mobile number to continue
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[#374151] text-sm font-semibold mb-1.5">
                                    Mobile Number (+234 *** **** 4545)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Phone size={16} className="text-[#BDBDBD]" />
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="+234 *** **** ***"
                                        value={phone}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                                            setPhone(filtered);
                                        }}
                                        disabled={isLoading}
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091A3] placeholder:text-[#9CA3AF] transition"
                                    />
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-1.5">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold hover:bg-[#005F6B] transition disabled:opacity-60"
                            >
                                {isLoading ? "Sending..." : "Send Verification Code"}
                            </button>
                        </form>

                        <p className="text-center text-[#6B7280] text-sm">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-[#0091A3] font-semibold hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}