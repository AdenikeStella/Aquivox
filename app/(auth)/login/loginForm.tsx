"use client";
import { Lock, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import { customerLogin } from "@/app/services/onboarding";
import { UserLogin } from "@/app/lib/types";
import { useToast } from "@/app/context/ToastContext";
import { setCookie } from "@/app/lib/utils/cookie";

const loginSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { showToast } = useToast();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phoneNumber: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormType) => {
        setIsLoading(true);
        try {
            const res = await customerLogin({ mobile: data.phoneNumber, password: data.password });

            if (res.success === true) {
                // Save both tokens from the response
                const { accessToken, refreshToken } = res.data;
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken);
                setCookie("fullName", res.data.user.fullName || "Admin User"); 
                setCookie("role", res.data.user.role || "admin");

                showToast(res.message, "success");
                router.push("/login/loginSuccess");
            } else {
    // handle non-throwing failure
    form.setError("root", { message: res.message || "Login failed. Please try again." });
}
        } catch (err: any) {
            const errorMessage = err?.message || "Login failed. Please try again.";
            form.setError("root", { message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form name="loginAquivox" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Mobile Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Mobile Number
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Phone size={16} className="text-[#BDBDBD]" />
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091A3] placeholder:text-[#9CA3AF] transition"
                                        {...field}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                                            field.onChange(filtered);
                                        }}
                                        disabled={isLoading}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Lock size={16} className="text-[#BDBDBD]" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="UVFnhd545kjf"
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

                {/* API-level error (wrong credentials etc.) */}
                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.root.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#005F6B] text-white py-3 rounded-[10px] font-semibold shadow hover:bg-[#0091A3] transition disabled:opacity-60 mt-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </Form>
    );
}