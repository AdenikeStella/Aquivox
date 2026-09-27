import Header from "@/app/components/Header";
import { Logo } from "@/app/components/Logo";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";

function RegisterPageContent() {
    return (
        <div>
            <div className="flex justify-between md:p-20">
                {/* left side */}
                <div className="hidden md:flex flex-col my-auto py-40 gap-8">
                    <div className="flex gap-3 items-center">
                        <Link href="/" className="flex items-center gap-3">
                        <Logo size={50} />
                        </Link>
                        <p className="font-bold text-xs md:text-[22px] font-sans">Aquivox</p>
                    </div>

                    <div className="flex gap-5 flex-col">
                        <h1 className="text-5xl font-inter font-extrabold">
                            Start Your Journey <br />
                            to Sustainability
                        </h1>

                        <p className="text-[#6B7280] font-normal text-lg">
                            Join thousands of fishers and aquaculture operators using <br /> Aquivox to optimize their operations and increase <br /> profitability.
                        </p>
                    </div>

                    <div>
                        <ul className="text-[15px] text-[#374151] gap-4">
                            <li className="flex gap-3 mb-3"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#4CAF50" />
                                <path d="M17.3337 8L10.0003 15.3333L6.66699 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>Track catches and operations in real-time</li>
                            <li className="flex gap-3 mb-3"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#4CAF50" />
                                <path d="M17.3337 8L10.0003 15.3333L6.66699 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>Get AI-powered income predictions</li>
                            <li className="flex gap-3 mb-3"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#4CAF50" />
                                <path d="M17.3337 8L10.0003 15.3333L6.66699 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>Reduce post-harvest losses</li>
                            <li className="flex gap-3 mb-3"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#4CAF50" />
                                <path d="M17.3337 8L10.0003 15.3333L6.66699 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>Access offline mode for remote areas</li>
                            <li className="flex gap-3 mb-3"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#4CAF50" />
                                <path d="M17.3337 8L10.0003 15.3333L6.66699 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>Connect with fishing communities</li>

                        </ul>
                    </div>
                </div>

                {/* right side */}
                <div className="flex md:justify-end mx-auto md:py-0 py-10">
                    <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] md:w-lg w-full gap-5">
                        <div className="mb-2">
                            <h3 className="font-bold text-[28px]">
                                Create Account
                            </h3>
                            <p className="text-[#6B7280] text-[15px] font-normal">
                                Fill in your details to get started
                            </p>
                        </div>

                        <RegisterForm />
                        <p className="text-center text-gray-500 text-sm mt-6">
                            Already have an account?{" "}
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
    )
}

export default function RegisterPage() {
    return (
        <Suspense>
            <RegisterPageContent />
        </Suspense>
    );
}