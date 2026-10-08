import { ForgotPasswordVerifyOTP, ForgotPasswordVerifyOTPResponse, SetNewPassword, UserLogin, UserLoginResponse, UserOnboarding, VerifyOTP } from "../lib/types";
import Http from "../lib/utils/http";


export const customerOnboarding = (payload: UserOnboarding) => {
    return Http.post('/api/auth/register', payload);
}

export const customerLogin = (payload: UserLogin) => {
    return Http.post<UserLoginResponse>('/api/auth/login', payload);
}

export const OtpVerification = (payload: VerifyOTP) => {
    return Http.post('/api/auth/verify-otp', payload);
}

export const resendOtp = (payload: { mobile: string }) => {
    return Http.post('/api/auth/resend-otp', payload);
}

export const logout = (payload: { refreshToken: string }) => {
    return Http.post('/api/auth/logout', payload);
}

export const forgotPassword = (payload: { mobile: string }) => {
    return Http.post('/api/auth/forgot-password/request-otp', payload);
}

export const forgotPasswordOTPVerification = (payload: ForgotPasswordVerifyOTP) => {
    return Http.post<ForgotPasswordVerifyOTPResponse>('/api/auth/forgot-password/verify-otp', payload);
}


export const resendForgotPasswordOtp = (payload: { mobile: string }) => {
    return Http.post('/api/auth/forgot-password/request-otp', payload);
}

export const newPassword = (payload: SetNewPassword) => {
    return Http.post('/api/auth/forgot-password/reset', payload);
}