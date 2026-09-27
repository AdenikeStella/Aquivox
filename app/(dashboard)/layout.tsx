"use client";
import { Logo } from "@/app/components/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    CirclePlus,
    DollarSign,
    Factory,
    ChartColumn,
    TrendingUp,
    LogOut,
} from "lucide-react";
import { getCookie } from "../lib/utils/cookie";

const navItems = [
    { label: "Dashboard", href: "/userDashboard", icon: LayoutDashboard },
    { label: "Log Catch", href: "/log-catch", icon: CirclePlus },
    { label: "Log Sales", href: "/log-sales", icon: DollarSign },
    { label: "Processing", href: "/processing", icon: Factory },
    { label: "Predictions", href: "/predictions", icon: ChartColumn },
    { label: "Income Forecast", href: "/income-forecast", icon: TrendingUp },
];

function NavItem({
    icon,
    label,
    active = false,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    href: string;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all font-inter ${
                active
                    ? "bg-[#003B41] text-white shadow-inner"
                    : "text-white hover:bg-white/5 hover:text-white"
            }`}
        >
            {icon}
            {label}
        </Link>
    );
}

function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const userFullName = getCookie("fullName") || "";
    const userRole = getCookie("role") || "";

    const handleLogout = () => {
        // TODO: clear session/tokens here
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-[#005F6B] text-white flex flex-col justify-between p-4 shrink-0 fixed top-0 left-0 h-screen z-50">
            <div>
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-2 mb-8">
                  <Link href="/" className="flex items-center gap-3">
                        <Logo className="w-10 h-10" />
                        </Link>
                    
                    <div>
                        <h1 className="font-bold text-lg font-inter leading-none">Aquivox</h1>
                        <p className="text-xs font-inter font-normal text-[#ffffff]/70">
                            Fisheries Management
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#00444D]/30 my-4" />

                {/* Navigation Links */}
                <nav className="space-y-1">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive =
                            pathname === href ||
                            (href !== "/dashboard" && pathname.startsWith(href));
                        return (
                            <NavItem
                                key={href}
                                href={href}
                                icon={<Icon size={18} />}
                                label={label}
                                active={isActive}
                            />
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Sidebar Actions */}
            <div className="border-t border-teal-800 pt-4 space-y-2">
                {/* Admin account */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {userFullName ? userFullName.charAt(0) : "A"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{userFullName || "Admin User"}</p>
                        <p className="text-[10px] text-teal-300">{userRole || "Admin"}</p>
                    </div>
                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors group"
                >
                    <LogOut size={18} className="group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-white text-slate-900">
            <Sidebar />
            {/* Main content offset by sidebar width */}
            <main className="flex-1 flex flex-col w-full h-full overflow-hidden relative ml-64">
                <div className="flex-1 overflow-y-auto relative">
                    {children}
                </div>
            </main>
        </div>
    );
}