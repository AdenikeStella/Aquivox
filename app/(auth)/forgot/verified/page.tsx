"use client";
import { Logo } from "@/app/components/Logo";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotVerified() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center p-20 min-h-[70vh]">
            <div className="flex gap-3 items-center mb-10">
                <Logo size={50} />
            </div>

            <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-[700px] gap-6 items-center text-center">
                {/* Success icon */}
                <span className="flex items-center justify-center bg-[#E8F5E9] rounded-full p-5 w-20 h-20">
                    <CircleCheck className="w-[46.67] h-[46.67] text-[#4CAF50]" strokeWidth={2.0} />
                </span>

                <div className="text-center font-inter">
                    <h1 className="font-bold text-4xl text-[#1A1A1A]">Verification Successful!</h1>
                    <p className="text-[#4F4F4F] text-base font-normal mt-1 text-center">
                        Your identity has been confirmed. You can now create a new password.
                    </p>
                </div>

                {/* Info box */}
                <div className="flex w-full bg-[#F9FAFB] rounded-xl p-8 gap-4 items-start text-left">

                    <span className="flex items-center font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-1-0 h-10 text-[#005F6B]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8333 9.16797H4.16667C3.24619 9.16797 2.5 9.91416 2.5 10.8346V16.668C2.5 17.5884 3.24619 18.3346 4.16667 18.3346H15.8333C16.7538 18.3346 17.5 17.5884 17.5 16.668V10.8346C17.5 9.91416 16.7538 9.16797 15.8333 9.16797Z" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83203 9.16797V5.83464C5.83203 4.72957 6.27102 3.66976 7.05242 2.88836C7.83382 2.10696 8.89363 1.66797 9.9987 1.66797C11.1038 1.66797 12.1636 2.10696 12.945 2.88836C13.7264 3.66976 14.1654 4.72957 14.1654 5.83464V9.16797" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                    </span>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base font-semibold text-[#1A1A1A] font-inter">Password Requirements</h4>
                        <ul className="gap-2">
                            <li className="text-sm font-inter font-normal text-[#4F4F4F] mb-2">• At least 8 characters long</li>
                                                        <li className="text-sm font-inter font-normal text-[#4F4F4F] mb-2">• Mix of uppercase and lowercase letters</li>
                            <li className="text-sm font-inter font-normal text-[#4F4F4F] mb-2">• Include numbers and letters</li>
                            <li className="text-sm font-inter font-normal text-[#4F4F4F] mb-2">• Avoid common words or patterns</li>

                            
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/forgot/newPassword")}
                    className="w-full bg-[#005F6B] text-white py-3 rounded-[10px] font-semibold hover:bg-[#0091A3] transition mt-2"
                >
                    Create Your New Password →
                </button>
            </div>
        </div>
    );
}