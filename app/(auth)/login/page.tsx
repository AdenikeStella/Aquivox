import Header from "@/app/components/Header";
import { Logo } from "@/app/components/Logo";
import Link from "next/link";
import LoginForm from "./loginForm";
import { Suspense } from "react";

function LoginPageContent() {
    return (
        <div>
            <div className="flex justify-between p-20">
                {/* left side */}
                <div className="lg:flex md:flex hidden flex-col my-auto py-40 gap-8">
                    <div className="flex gap-3 items-center">
                        <Link href="/" className="flex items-center gap-3">
                        <Logo size={50} />
                        </Link>
                        <p className="font-bold text-xs md:text-[22px] font-sans">Aquivox</p>
                    </div>

                    <div className="flex gap-5 flex-col">
                        <h1 className="text-5xl font-inter font-extrabold">
                            Welcome Back to <br />
                            Your Dashboard
                        </h1>

                        <p className="text-[#4F4F4F] font-normal text-lg font-inter">
                            Sign in to access your fishing operations dashboard, <br /> track your catches, and get AI-powered insights.                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex mb-2 items-center gap-4">
                            <span className="flex items-center text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-1-0 h-10">
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4055 13.2654V15.7654C17.4064 15.9975 17.3589 16.2273 17.2659 16.4399C17.1729 16.6525 17.0365 16.8434 16.8655 17.0003C16.6945 17.1572 16.4926 17.2767 16.2728 17.351C16.0529 17.4254 15.8199 17.453 15.5888 17.4321C13.0245 17.1535 10.5613 16.2772 8.39713 14.8738C6.38365 13.5943 4.67658 11.8873 3.39713 9.87378C1.98878 7.69978 1.11233 5.22461 0.838795 2.64878C0.817971 2.41833 0.845358 2.18608 0.919212 1.9668C0.993067 1.74752 1.11177 1.54602 1.26777 1.37513C1.42376 1.20424 1.61363 1.0677 1.82529 0.974214C2.03694 0.880724 2.26575 0.83233 2.49713 0.832112H4.99713C5.40155 0.828132 5.79362 0.971344 6.10026 1.23506C6.4069 1.49877 6.60719 1.86498 6.66379 2.26545C6.76931 3.0655 6.965 3.85105 7.24713 4.60711C7.35925 4.90538 7.38351 5.22954 7.31705 5.54118C7.25059 5.85282 7.09618 6.13887 6.87213 6.36545L5.8138 7.42378C7.00009 9.51007 8.72751 11.2375 10.8138 12.4238L11.8721 11.3654C12.0987 11.1414 12.3848 10.987 12.6964 10.9205C13.008 10.8541 13.3322 10.8783 13.6305 10.9904C14.3865 11.2726 15.1721 11.4683 15.9721 11.5738C16.3769 11.6309 16.7466 11.8348 17.0109 12.1467C17.2752 12.4586 17.4156 12.8568 17.4055 13.2654Z" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </span>
                            <span className="px-0 flex flex-col justify-center">
                                <p className="text-[#111827] font-semibold font-inter text-[15px]">Quick Access</p>
                                <p className="text-sm text-[#6B7280] font-normal">Log in with just your mobile number</p>
                            </span>
                        </div>

                        <div className="flex mb-2 items-center gap-4">
                            <span className="flex items-center text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-1-0 h-10">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8333 9.16797H4.16667C3.24619 9.16797 2.5 9.91416 2.5 10.8346V16.668C2.5 17.5884 3.24619 18.3346 4.16667 18.3346H15.8333C16.7538 18.3346 17.5 17.5884 17.5 16.668V10.8346C17.5 9.91416 16.7538 9.16797 15.8333 9.16797Z" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83203 9.16797V5.83464C5.83203 4.72957 6.27102 3.66976 7.05242 2.88836C7.83382 2.10696 8.89363 1.66797 9.9987 1.66797C11.1038 1.66797 12.1636 2.10696 12.945 2.88836C13.7264 3.66976 14.1654 4.72957 14.1654 5.83464V9.16797" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                            </span>
                            <span className="px-0 flex flex-col justify-center">
                                <p className="text-[#111827] font-semibold font-inter text-[15px]">Secure OTP</p>
                                <p className="text-sm text-[#6B7280] font-normal">Two-factor authentication for safety</p>
                            </span>
                        </div>

                        <div className="flex mb-2 items-center gap-4">
                            <span className="flex items-center text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-1-0 h-10">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 10.835C16.6654 15.0017 13.7487 17.085 10.282 18.2933C10.1005 18.3549 9.90331 18.3519 9.7237 18.285C6.2487 17.085 3.33203 15.0017 3.33203 10.835V5.00168C3.33203 4.78066 3.41983 4.5687 3.57611 4.41242C3.73239 4.25614 3.94435 4.16834 4.16536 4.16834C5.83203 4.16834 7.91536 3.16834 9.36536 1.90168C9.54191 1.75084 9.76649 1.66797 9.9987 1.66797C10.2309 1.66797 10.4555 1.75084 10.632 1.90168C12.0904 3.17668 14.1654 4.16834 15.832 4.16834C16.053 4.16834 16.265 4.25614 16.4213 4.41242C16.5776 4.5687 16.6654 4.78066 16.6654 5.00168V10.835Z" stroke="#0091A3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                            </span>
                            <span className="px-0 flex flex-col justify-center">
                                <p className="text-[#111827] font-semibold font-inter text-[15px]">Protected Data</p>
                                <p className="text-sm text-[#6B7280] font-normal">Your information is encrypted</p>
                            </span>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="flex flex-col justify-end py-40">
                    <div className="flex flex-col p-10 bg-white rounded-2xl shadow-md border border-[#E5E7EB] w-lg gap-8 mb-6 mt-16">
                        <div className="mb-6">
                            <h3 className="font-bold text-[28px]">
                                Sign In
                            </h3>
                            <p className="text-[#6B7280] text-[15px] font-normal">
                                Enter your mobile number to continue
                            </p>
                        </div>

                        <LoginForm />

                    </div>
                    <p className="text-center text-gray-500 text-sm mt-6 gap-2 flex justify-center items-center mb-4">
                        Don't have an account?
                        <Link
                            href="/register"
                            className="text-[#0091A3] font-semibold hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                    <p className="flex items-center justify-center">
                        <Link
                            href="/forgot"
                            className="text-[#6B7280] font-semibold hover:underline items-center justify-center"
                        >
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginPageContent />
        </Suspense>
    );
}