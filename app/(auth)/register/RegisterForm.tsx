"use client";
import { useRouter } from "next/navigation";
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
import { Input } from "@/app/components/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { User, Phone, Lock, X, AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { customerOnboarding } from "@/app/services/onboarding";
import { UserOnboarding } from "@/app/lib/types";
import { useToast } from "@/app/context/ToastContext";
const roles = ["Fisher", "Aquaculture Operator", "Supplier", "Buyer", "Other"];

// Only validate fields that are actually in the form UI
const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Full name is required")
            .regex(/^[a-zA-Z' -]+$/, "Only letters, hyphens, and apostrophes are allowed"),
        role: z.string().min(1, "Please select your role"),
        phoneNumber: z
            .string()
            .min(7, "Phone number is required")
            .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number"),
        location: z.string().min(2, "Please enter your location"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormType = z.infer<typeof registerSchema>;

function ErrorBanner({ message, onClose }: { message: string; onClose: () => void }) {
    return (
        <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 mb-2">
            <span className="flex items-center justify-center bg-[#EF4444] rounded-full w-7 h-7 shrink-0 mt-0.5">
                <AlertCircle size={14} className="text-white" />
            </span>
            <div className="flex-1">
                <p className="text-sm font-semibold text-[#991B1B]">
                    Phone Number Already Registered
                </p>
                <p className="text-xs text-[#7F1D1D] mt-0.5">{message}</p>
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="mt-2 px-3 py-1 bg-[#EF4444] text-white text-xs font-semibold rounded-md hover:bg-[#DC2626] transition"
                >
                    Sign In
                </button>
            </div>
            <button
                type="button"
                onClick={onClose}
                className="text-[#9CA3AF] hover:text-[#6B7280] mt-0.5"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const { showToast } = useToast();

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            role: "",
            phoneNumber: "",
            location: "",
            password: "",
            confirmPassword: "",
        },
    });

    // const phoneError = form.formState.errors.phoneNumber;

    

    const onSubmit = (data: RegisterFormType) => {
    // setIsLoading(true);
    // setServerError("");
   
        const res = {
            fullName: data.fullName,
            role: data.role,
            mobile: data.phoneNumber,
            city: data.location,
            country: data.location,   
            password: data.password,
            confirmPassword: data.confirmPassword,
        }
                    console.log(res)


        localStorage.setItem("registeredMobile", data.phoneNumber); 
        console.log("Saved mobile:", localStorage.getItem("registeredMobile")); // 👈
        showToast("Registration successful! Please verify your account.", "success");
        router.push("./verification"); 

    }


    return (
        <Form {...form}>
            <form name="registerAquivox" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Server error banner */}
                {/* {serverError && (
                    <ErrorBanner
                        message={serverError}
                        onClose={() => {
                            setServerError("");
                            form.clearErrors("phoneNumber");
                        }}
                    />
                )} */}

                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Full Name
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <User size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <Input
                                        placeholder="John Fisher"
                                        {...field}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^a-zA-Z' -]/g, "");
                                            field.onChange(filtered);
                                        }}
                                        disabled={isLoading}
                                        className="pl-9 placeholder:text-[#9CA3AF]"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Role */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Role
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                        <User size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <select
                                        {...field}
                                        disabled={isLoading}
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091A3] transition bg-white appearance-none text-[#374151] disabled:opacity-60"
                                    >
                                        <option value="" disabled>
                                            Select your role
                                        </option>
                                        {roles.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Phone Number
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Phone size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <Input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        {...field}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                                            field.onChange(filtered);
                                        }}
                                        disabled={isLoading}
                                        className={`pl-9 placeholder:text-[#9CA3AF] `}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Location */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#374151] text-sm font-semibold">
                                Location
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <MapPin size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <Input
                                    type="text"
                                        placeholder="e.g. Lagos, Nigeria"
                                        {...field}
                                        disabled={isLoading}
                                        className="pl-9 placeholder:text-[#9CA3AF]"
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
                                        <Lock size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password123"
                                        {...field}
                                        disabled={isLoading}
                                        className="pl-9 placeholder:text-[#9CA3AF]"
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
                                        <Lock size={15} className="text-[#BDBDBD]" />
                                    </span>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Password123"
                                        {...field}
                                        disabled={isLoading}
                                        className="pl-9 placeholder:text-[#9CA3AF]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button
                    type="submit"
                    className="w-full bg-[#0091A3] text-white py-3 rounded-[10px] font-semibold shadow hover:bg-[#005F6B] transition mt-2 disabled:opacity-60"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing Up..." : "Continue to Verification"}
                </button>
            </form>
        </Form>
    );
}