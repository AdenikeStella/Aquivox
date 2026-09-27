"use client";
import { Logo } from "@/app/components/Logo";
import OTPInput from "@/app/components/otpInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// Phone icon SVG
function PhoneIcon() {
    return (
        <svg width="27" height="37" viewBox="0 0 27 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.667 1.66797H5.00033C3.15938 1.66797 1.66699 3.16035 1.66699 5.0013V31.668C1.66699 33.5089 3.15938 35.0013 5.00033 35.0013H21.667C23.5079 35.0013 25.0003 33.5089 25.0003 31.668V5.0013C25.0003 3.16035 23.5079 1.66797 21.667 1.66797Z" stroke="#0091A3" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ResendIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.0003 2V5.33333H10.667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32263 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33333 10.668H2V14.0013" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const RESEND_SECONDS = 55;

export default function LoginVerification() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(RESEND_SECONDS);
    const [canResend, setCanResend] = useState(false);
    // Simulate session timeout warning after 2 minutes of inactivity
    const [sessionTimedOut, setSessionTimedOut] = useState(false);
    const [otpValue, setOtpValue] = useState("");

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = () => {
        setCanResend(false);
        setCountdown(RESEND_SECONDS);
        // TODO: call your API to resend OTP
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: validate OTP via API
            await new Promise((res) => setTimeout(res, 800));
            router.push("/login/loginSuccess");
        } catch {
            // handle error
        } finally {
            setIsLoading(false);
        }
    };

    // Session timed out view
    if (sessionTimedOut) {
        return (
            <div className="flex flex-col justify-center items-center p-20 min-h-[70vh]">
                <div className="flex gap-3 items-center mb-10">
                    <Logo size={50} />
                </div>

                {/* Timeout warning banner */}
                <div className="w-full max-w-lg mb-6 bg-[#FFF8E1] border border-[#FBC02D] rounded-xl p-4 flex gap-3 items-start">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1.66667L18.3333 16.6667H1.66667L10 1.66667Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M10 7.5V11.25" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="10" cy="13.75" r="0.833333" fill="#F59E0B" />
                    </svg>
                    <div>
                        <p className="text-sm font-semibold text-[#92400E]">Verification Code Expired</p>
                        <p className="text-xs text-[#78350F] mt-0.5">
                            Your verification code has timed out for your security. To refill your order, please request a new code. Please ensure you enter the code promptly.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-lg gap-6 items-center">
                    {/* Orange clock icon */}
                    <span className="flex items-center justify-center bg-[#FFF3E0] rounded-full p-5 w-20 h-20">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#F97316" strokeWidth="1.8" />
                            <path d="M12 6V12L16 14" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    <div className="text-center">
                        <h2 className="font-bold text-[26px] text-[#111827]">Session Timed Out</h2>
                        <p className="text-[#6B7280] text-sm mt-1">+234 xxx xxx xxxx</p>
                        <p className="text-[#6B7280] text-sm mt-1">Requested at 12:45 PM — 2 min ago</p>
                    </div>

                    <button
                        onClick={handleResend}
                        className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold hover:bg-[#005F6B] transition"
                    >
                        Request New Code
                    </button>
                    <button
                        onClick={() => router.push("/login")}
                        className="text-[#6B7280] text-sm font-semibold hover:underline"
                    >
                        Back to Login
                    </button>

                    <p className="text-[#6B7280] text-xs text-center mt-2">
                        Why did this happen? Your verification code expired after 2 minutes for security reasons. Please request a new code and enter it promptly to complete verification.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center p-20">
            <div className="flex gap-3 items-center mb-10">
                <Logo size={50} />
            </div>

            <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-lg gap-5 items-center">
                {/* Phone icon */}
                <span className="flex items-center justify-center bg-[#E6F9FC] rounded-[14px] p-5 w-20 h-20">
                    <PhoneIcon />
                </span>

                <div className="flex flex-col gap-2 text-center mt-2">
                    <h1 className="font-bold text-[32px] font-inter text-[#111827]">
                        Verify Your Identity
                    </h1>
                    <p className="text-[15px] font-normal text-[#6B7280]">
                        Enter the 6-digit code we sent to
                    </p>
                    <p className="text-base font-semibold text-[#0091A3]">070x xxx xxxx</p>
                </div>

                <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-6 mt-2">
                    <OTPInput />

                    {/* Resend countdown */}
                    <span className="flex gap-2 items-center">
                        <ResendIcon />
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-[#0091A3] font-semibold text-sm hover:underline"
                            >
                                Resend code
                            </button>
                        ) : (
                            <p className="text-[#6B7280] font-semibold text-sm">
                                Resend code in{" "}
                                <span className="text-[#0091A3]">{countdown}s</span>
                            </p>
                        )}
                    </span>

                    <button
                        type="submit"
                        className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold shadow hover:bg-[#005F6B] transition disabled:opacity-60"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify & Sign In"}
                    </button>
                </form>

                {/* Simulate timeout for demo — remove in production */}
                <div className="flex gap-1 p-4 bg-[#F9FAFB] rounded-lg w-full items-center justify-center mt-2">
                    <p className="text-[#6B7280] text-[13px]">
                        Didn't receive the code? Check your phone or{" "}
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-[#0091A3] text-[13px] font-semibold hover:underline"
                    >
                        try a different number
                    </button>
                </div>

                {/* Dev helper: simulate session timeout */}
                <button
                    type="button"
                    onClick={() => setSessionTimedOut(true)}
                    className="text-xs text-gray-300 mt-1 hover:text-gray-400"
                >
                    [dev] Simulate session timeout
                </button>
            </div>
        </div>
    );
}