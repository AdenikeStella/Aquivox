"use client";
import { Logo } from "@/app/components/Logo";
import OTPInput from "@/app/components/otpInput";
import { useRouter} from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Phone, RotateCcw } from "lucide-react";
import Link from "next/link";
// import { OtpVerification, resendOtp } from "@/app/services/onboarding";
import { useToast } from "@/app/context/ToastContext";

const COUNTDOWN_SECONDS = 180; 

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function RegisterVerificationContent() {
    const router = useRouter();
    // const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [error, setError] = useState("");
const [mobile] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("registeredMobile") ?? "" : ""
);    // const { showToast } = useToast();

    // useEffect(() => {
    //     if (countdown <= 0) {
    //         setCanResend(true);
    //         return;
    //     }
    //     const timer = setTimeout(() => setCountdown((c) => c - 1), 1000); 
    //     return () => clearInterval(timer);
    // }, [countdown]);

    // const handleResend = async () => {
    //     try {
    //         await resendOtp({ mobile });
    //         setCanResend(false);
    //         setCountdown(COUNTDOWN_SECONDS);
    //         showToast("OTP sent successfully!");
    //     } catch (err: any) {
    //         showToast("Failed to resend OTP. Please try again.");
    //     }
    // };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otpValue || otpValue.length < 6) {
            setError("Please enter the 6-digit code");
            return;
        }
        // setIsLoading(true);
        // setError("");
        // try {
        //     await OtpVerification({ mobile, otp: otpValue });
        //     showToast("Account verified successfully!");
            router.push("/register/registerSuccess");
        // } catch (err: any) {
        //     setError(err.message);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    useEffect(() => {
    const savedMobile = localStorage.getItem("registeredMobile");
    if (!mobile) {
        router.push("/register");
    }
}, [router]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-[#F3F4F6]">
            <div className="mb-6">
                <Link href="/" className="flex items-center gap-3">
                    <Logo size={50} />
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] w-full max-w-150 flex flex-col items-center px-8 py-10 gap-6">
                <span className="flex items-center justify-center bg-[#E6F9FC] rounded-2xl w-14 h-14">
                    <Phone size={24} className="text-[#0091A3]" />
                </span>

                <div className="text-center">
                    <h1 className="font-bold text-[22px] text-[#111827]">
                        Verify Your Phone Number
                    </h1>
                    <p className="text-[#6B7280] text-sm mt-1">
                        Enter the 6-digit code we sent to
                    </p>
                    <p className="text-[#0091A3] font-semibold text-sm mt-0.5">
                        {mobile || "your phone number"}
                    </p>
                </div>

                <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-5">
                    <OTPInput onChange={(val: string) => setOtpValue(val)} />

                    {error && (
                        <p className="text-[#EB5757] text-sm">{error}</p>
                    )}

                    <div className="flex items-center gap-1.5">
                        <RotateCcw size={13} className="text-[#6B7280]" />
                        {canResend ? (
                            <button
                                type="button"
                                // onClick={handleResend}
                                className="text-[#0091A3] text-sm font-semibold hover:underline"
                            >
                                Resend code
                            </button>
                        ) : (
                            <p className="text-[#6B7280] text-sm">
                                Resend code in{" "}
                                <span className="text-[#111827] font-semibold">
                                    {formatTime(countdown)}
                                </span>
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otpValue.length < 6}
                        className="w-full bg-[#0091A3] text-white py-3 px-4 rounded-[10px] font-semibold hover:bg-[#005F6B] transition disabled:opacity-60"
                    >
                        {isLoading ? "Verifying..." : "Verify & Create Account"}
                    </button>
                </form>

                <p className="text-[#9CA3AF] text-xs text-center">
                    Make sure you entered the correct number
                </p>
            </div>
        </div>
    );
}

export default function RegisterVerification() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterVerificationContent />
        </Suspense>
    );
}