import Image from "next/image";
import { Logo } from "./components/Logo";
import Link from "next/link";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";

export default function Home() {
  return (
    <div>
      <header className="flex border border-b border-[#d9e3e2] px-4 md:px-20 justify-between w-full h-[82.5]">
        <div className="flex items-center gap-3 justify-start">
          <Logo size={50} />
          <p className="font-bold text-xs md:text-[22px] font-sans">Aquivox</p>
        </div>

        <div className="flex justify-end items-center gap-3">
          <Link href="/login" className="text-[#374151] font-medium text-[15px]">
            Sign In
          </Link>

          <Link href="/register" className="bg-[#0091A3] text-[#ffffff] font-medium text-[15px] p-2 rounded-[10px]">
            <p className="mx-2">
              Get Started
            </p>
          </Link>
        </div>
      </header>
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-20 md:py-32 md:px-20 px-2 bg-white sm:items-start">
        <div className="flex flex-col md:flex-row gap-16 justify-between px-8">
          <div className="mb-16 gap-5">
            <span className="flex gap-2 bg-[#E6F9FC] border border-[#BFEFF7] rounded-4xl p-2 md:p-4 items-center mb-6 md:mb-20 w-[295.95px]">
              <span className="flex rounded-full bg-[#0091A3]  w-2 h-2"></span>
              <p className="flex text-[#007A88] font-semibold text-sm">Empowering Water-Dependent SMEs</p>
            </span>
            <div className="flex flex-col gap-6">
              <span className="md:mb-10">
                <h6 className="text-[#111827] font-extrabold text-[30px] md:text-[58px] font-inter">
                  Sustainable Fishing
                </h6>
                <h6 className="text-[#0091A3] font-extrabold text-[30px] md:text-[63.8px] font-inter">
                  Profitable Operations
                </h6>
              </span>

              <span className="mb-7">
                <p className="text-[#4B5563] text-sm md:text-[19px] font-normal">
                  Track your daily catches, predict income trends,<br /> and reduce post-harvest losses with AI-powered insights <br /> designed for fishers and aquaculture operators.
                </p>
              </span>
            </div>

            <div className="flex gap-4 mb-10">
              <Link href="/register">
                <Button className="bg-[#0091A3] shadow-2xl">
                  Create Free Account
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                >
                  Sign In
                </Button>
              </Link>

            </div>

            <div className="flex border-t border-[#E5E7EB] gap-10 md:gap-12 items-center pt-8 mt-7">
              <span className="flex flex-col gap-1">
                <p className="text-[#0091A3] text-[28px] font-bold">5,000+</p>
                <p className="text-sm font-normal text-[#6B7280]">Active Users</p>
              </span>

              <span className="flex flex-col gap-1">
                <p className="text-[#0091A3] text-[28px] font-bold">98%</p>
                <p className="text-sm font-normal text-[#6B7280]">Satisfaction</p>
              </span>

              <span className="flex flex-col gap-1">
                <p className="text-[#0091A3] text-[28px] font-bold">24/7</p>
                <p className="text-sm font-normal text-[#6B7280]">Support</p>
              </span>
            </div>
          </div>
          {/* hero */}
          <div className="flex md:w-125">
            <Image
              src="/Hero.png"
              alt="Hero"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        {/* Everything you need */}
        <div className="flex flex-col gap-12 items-center justify-center px-5 md:px-20 w-full mt-10">
          <div className="flex flex-col items-center">
            <h1 className="font-inter flex text-lg md:text-[36px] font-bold">
              Everything You Need to Succeed
            </h1>

            <h6 className="text-base font-normal text-[#6B7280]">
              Smarter Fishing, Stronger Future
            </h6>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="bg-[#ffffff] border-[#E5E7EB] rounded-[14px] p-6 mb-2 items-center">
              <CardHeader className="pt-1 px-0 items-center justify-center ">
                <CardTitle className="text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-14 h-14">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" fill="#E6F9FC" />
                    <path d="M7.58301 14C8.67967 9.96333 13.3463 7 17.4997 7C21.653 7 24.5697 9.96333 25.6663 14C24.5697 18.0483 21.653 21 17.4997 21C13.3463 21 8.67967 18.0483 7.58301 14Z" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 14V14.5833" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.6669 20.9187C17.1493 18.9316 16.3271 16.5007 16.3271 14.0004C16.3271 11.5001 17.1493 9.06911 18.6669 7.08203" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.16648 12.4496C8.16648 9.33464 6.50982 6.9663 3.18482 6.41797C2.01815 8.16797 2.01815 12.2513 3.45315 14.0013C2.00648 15.7513 2.00648 19.8346 3.18482 21.5846C6.50982 21.0363 8.16648 18.668 8.16648 15.553" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.203 8.47002C11.8997 6.86002 10.698 4.94668 9.33301 3.50002H16.0997C16.6533 3.49796 17.1895 3.6928 17.6127 4.04971C18.0359 4.40662 18.3183 4.90236 18.4097 5.44835L18.678 7.08168" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.678 20.9171L18.4097 22.5505C18.3183 23.0965 18.0359 23.5922 17.6127 23.9491C17.1895 24.306 16.6533 24.5009 16.0997 24.4988H11.083C12.2133 23.2172 12.8321 21.5643 12.8213 19.8555" stroke="#0091A3" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 flex flex-col justify-center items-center mx-6">
                <p className="text-[#111827] font-bold font-inter text-base">Track Daily Operations</p>
                <p className="text-[15px] text-[#4B5563] font-normal">Log catches and expenses in seconds</p>
              </CardContent>
            </Card>

            <Card className="bg-[#ffffff] border-[#E5E7EB] rounded-[14px] p-6 mb-2 items-center">
              <CardHeader className="pt-1 px-0 items-center justify-center ">
                <CardTitle className="text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-14 h-14">
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 12.0005C17 17.0005 13.5 19.5005 9.34 20.9505C9.1222 21.0243 8.8855 21.0208 8.67 20.9405C4.5 19.5005 1 17.0005 1 12.0005V5.00045C1 4.73523 1.10536 4.48088 1.29289 4.29334C1.48043 4.10581 1.73478 4.00045 2 4.00045C4 4.00045 6.5 2.80045 8.24 1.28045C8.4519 1.09945 8.7214 1 9 1C9.2786 1 9.5481 1.09945 9.76 1.28045C11.51 2.81045 14 4.00045 16 4.00045C16.2652 4.00045 16.5196 4.10581 16.7071 4.29334C16.8946 4.48088 17 4.73523 17 5.00045V12.0005Z" stroke="#0091A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 flex flex-col justify-center items-center mx-6">
                <p className="text-[#111827] font-bold font-inter text-base">Secure & Private</p>
                <p className="text-[15px] text-[#4B5563] font-normal">Your data is encrypted and protected</p>
              </CardContent>
            </Card>

            <Card className="bg-[#ffffff] border-[#E5E7EB] rounded-[14px] p-6 mb-2 items-center">
              <CardHeader className="pt-1 px-0 items-center justify-center ">
                <CardTitle className="text-[#B1B1B1] text-sm font-medium bg-[#E6F9FC] rounded-[14px] p-4 w-14 h-14">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6C2.6 6.5 3.2 7 4.5 7C7 7 7 5 9.5 5C12.1 5 11.9 7 14.5 7C17 7 17 5 19.5 5C20.8 5 21.4 5.5 22 6" stroke="#0091A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12C2.6 12.5 3.2 13 4.5 13C7 13 7 11 9.5 11C12.1 11 11.9 13 14.5 13C17 13 17 11 19.5 11C20.8 11 21.4 11.5 22 12" stroke="#0091A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 18C2.6 18.5 3.2 19 4.5 19C7 19 7 17 9.5 17C12.1 17 11.9 19 14.5 19C17 19 17 17 19.5 17C20.8 17 21.4 17.5 22 18" stroke="#0091A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 flex flex-col justify-center items-center mx-6">
                <p className="text-[#111827] font-bold font-inter text-base">Easy to Use</p>
                <p className="text-[15px] text-[#4B5563] font-normal">No technical knowledge required</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <footer className="flex items-center w-full justify-between flex-col bg-[#0091A3] py-16 md:py-32 px-8 md:px-16">
        <p className="text-base font-medium text-[#ffffff]">
          2026 Aquivox. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
