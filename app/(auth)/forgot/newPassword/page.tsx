"use client";
import { Logo } from "@/app/components/Logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/app/components/form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Lock } from "lucide-react";
import { newPassword } from "@/app/services/onboarding";

const newPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "At least 8 characters")
            .regex(/[A-Z]/, "One uppercase letter")
            .regex(/[a-z]/, "One lowercase letter")
            .regex(/[0-9]/, "One number")
            .regex(/[^a-zA-Z0-9]/, "One special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type NewPasswordFormType = z.infer<typeof newPasswordSchema>;

function RequirementItem({ met, label }: { met: boolean; label: string }) {
    return (
        <li className="flex items-center gap-2">
            <span
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    met ? "bg-[#4CAF50]" : "bg-[#E5E7EB]"
                }`}
            >
                {met && (
                    <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
                        <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
            <span
                className={`text-sm transition-colors duration-200 ${
                    met ? "text-[#374151]" : "text-[#9CA3AF]"
                }`}
            >
                {label}
            </span>
        </li>
    );
}

function NewPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const passwordResetToken = searchParams.get("token") || "";

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<NewPasswordFormType>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
        mode: "onChange",
    });

    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    const requirements = [
        { label: "At least 8 characters", met: password.length >= 8 },
        { label: "One uppercase letter", met: /[A-Z]/.test(password) },
        { label: "One lowercase letter", met: /[a-z]/.test(password) },
        { label: "One number", met: /[0-9]/.test(password) },
        { label: "One special character", met: /[^a-zA-Z0-9]/.test(password) },
        {
            label: "Passwords match",
            met: password === confirmPassword && confirmPassword.length > 0,
        },
    ];

    const onSubmit = async () => {
        if (!passwordResetToken) {
            form.setError("root", { message: "Reset token is missing. Please restart the process." });
            return;
        }

        setIsLoading(true);
        try {
            await newPassword({ passwordResetToken, newPassword: password, confirmPassword });
            router.push("/forgot/resetComplete");
        } catch {
            form.setError("root", { message: "Something went wrong. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-between items-center md:px-20 mx-auto py-10 gap-16 min-h-[80vh]">
            {/* Left side */}
            <div className="md:flex hidden flex-col gap-8 max-w-md">
                <div className="flex gap-3 items-center">
                    <Logo size={50} />
                    <p className="font-bold text-[22px] font-sans">Aquivox</p>
                </div>

                <div>
                    <h1 className="text-5xl font-inter font-extrabold leading-tight text-[#111827]">
                        Create New
                        <br />
                        Password
                    </h1>
                    <p className="text-[#6B7280] text-lg mt-4">
                        Your password should be strong and unique to protect
                        your account.
                    </p>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-4">
                        Password Requirements
                    </p>
                    <ul className="flex flex-col gap-3">
                        {requirements.map((r) => (
                            <RequirementItem key={r.label} met={r.met} label={r.label} />
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right side — form card */}
            <div className="flex items-center justify-end">
                <div className="flex flex-col p-10 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-full max-w-sm gap-6">
                    <div>
                        <h3 className="font-bold text-[24px] text-[#111827]">
                            Set New Password
                        </h3>
                        <p className="text-[#6B7280] text-sm mt-1">
                            {"Choose a strong password you haven't used before"}
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* New Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151] text-sm font-semibold">
                                            New Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <Lock size={16} className="text-[#BDBDBD]" />
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091A3] placeholder:text-[#9CA3AF] transition"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151] text-sm font-semibold">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <Lock size={16} className="text-[#BDBDBD]" />
                                                </span>
                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    placeholder="Repeat new password"
                                                    className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091A3] placeholder:text-[#9CA3AF] transition"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm(!showConfirm)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.formState.errors.root && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.root.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || !requirements.every((r) => r.met)}
                                className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold hover:bg-[#005F6B] transition disabled:opacity-50 mt-2"
                            >
                                {isLoading ? "Saving..." : "Save Password"}
                            </button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default function NewPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewPasswordContent />
        </Suspense>
    );
}