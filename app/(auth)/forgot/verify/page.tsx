"use client";
import { Logo } from "@/app/components/Logo";
import OTPInput from "@/app/components/otpInput";
import { getErrorMessage } from "@/app/lib/utils";
import {
  forgotPasswordOTPVerification,
  resendForgotPasswordOtp,
} from "@/app/services/onboarding";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const RESEND_SECONDS = 20;

function ResendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333"
        stroke="#6B7280"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0003 2V5.33333H10.667"
        stroke="#6B7280"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32263 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667"
        stroke="#6B7280"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33333 10.668H2V14.0013"
        stroke="#6B7280"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ForgotVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mobile = searchParams.get("mobile") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [otpValue, setOtpValue] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    try {
      await resendForgotPasswordOtp({ mobile });
      setCanResend(false);
      setCountdown(RESEND_SECONDS);
    } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Failed to resend code";
      console.log("Resend error:", err);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await forgotPasswordOTPVerification({
        mobile,
        otp: otpValue,
      });

      const passwordResetToken = res.data.passwordResetToken;
      router.push(
        `/forgot/newPassword?token=${encodeURIComponent(passwordResetToken)}`,
      );
    } catch (err: unknown) {
    setError(getErrorMessage(err));
      console.log("OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-20">
      <div className="flex gap-3 items-center mb-10">
        <Logo size={50} />
      </div>

      <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-lg gap-5 items-center">
        {/* Phone icon */}
        <span className="flex items-center justify-center bg-[#E6F9FC] rounded-[14px] p-5 w-20 h-20">
          <svg
            width="20"
            height="26"
            viewBox="0 0 27 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.667 1.66797H5.00033C3.15938 1.66797 1.66699 3.16035 1.66699 5.0013V31.668C1.66699 33.5089 3.15938 35.0013 5.00033 35.0013H21.667C23.5079 35.0013 25.0003 33.5089 25.0003 31.668V5.0013C25.0003 3.16035 23.5079 1.66797 21.667 1.66797Z"
              stroke="#0091A3"
              strokeWidth="3.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-bold text-[30px] text-[#111827]">
            Verify OTP Code
          </h1>
          <p className="text-[15px] text-[#6B7280]">
            Enter the 6-digit code we sent to your phone
          </p>
          <p className="text-base font-semibold text-[#0091A3]">{mobile}</p>
        </div>

        <form
          onSubmit={handleVerify}
          className="w-full flex flex-col items-center gap-6 mt-2"
        >
          <OTPInput onChange={(val: string) => setOtpValue(val)} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
            disabled={isLoading}
            className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold hover:bg-[#005F6B] transition disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="flex md:flex-row flex-col gap-1 p-4 bg-[#F9FAFB] rounded-lg w-full items-center justify-center mt-2">
          <p className="text-[#6B7280] text-[13px] text-center">
            {" Didn't receive the code? Check your phone or "}{" "}
          </p>
          <button
            type="button"
            onClick={() => router.push("/forgot")}
            className="text-[#0091A3] text-[13px] font-semibold hover:underline"
          >
            try a different number
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ForgotVerify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotVerifyContent />
    </Suspense>
  );
}
