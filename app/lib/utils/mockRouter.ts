// app/lib/utils/mockRouter.ts
import {
  UserLogin,
  ForgotPasswordVerifyOTP,
  SetNewPassword,
  logCatchData,
  logSalesData,
  processingLogData,
} from "../types";

const delay = (ms = 500) => new Promise<void>((res) => setTimeout(res, ms));

const MOCK_USERS = [
  { mobile: "+2348122381218", password: "Tester@123", fullName: "Adenike Turton", role: "Fisher" },
];

export async function mockRequest(url: string, method: string, body?: unknown) {
  await delay();

  // ---- AUTH ----
  if (url === "/api/auth/login" && method === "POST") {
    const payload = body as UserLogin;
    const user = MOCK_USERS.find(u => u.mobile === payload.mobile && u.password === payload.password);
    if (!user) throw { success: false, message: "Invalid mobile number or password" };
    return {
      success: true,
      message: "Login successful",
      data: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: { fullName: user.fullName, role: user.role },
      },
    };
  }

  if (url === "/api/auth/register" && method === "POST") {
    return { success: true, message: "Registered", data: {} };
  }

  if (url === "/api/auth/forgot-password/request-otp" && method === "POST") {
    return { success: true, message: "OTP sent to your phone (use 123456)" };
  }

  if (url === "/api/auth/forgot-password/verify-otp" && method === "POST") {
    const payload = body as ForgotPasswordVerifyOTP;
    if (payload.otp !== "123456") throw { success: false, message: "Invalid OTP. Use 123456 for testing." };
    return { success: true, message: "OTP verified", data: { passwordResetToken: "mock-reset-token" } };
  }

  if (url === "/api/auth/forgot-password/reset" && method === "POST") {
    const payload = body as SetNewPassword;
    return { success: true, message: "Password reset successful", data: payload };
  }

  // ---- DASHBOARD ----
  if (url === "/api/dashboard/summary" && method === "GET") {
    return {
      success: true, message: "OK",
      data: {
        revenue: { currentMonth: 452000, previousMonth: 398000, percentChange: 13.6 },
        transactions: 128,
        catch: { totalCatchKg: 3420, totalCatchTons: 3.42 },
      },
    };
  }

  // ---- LOG CATCH ----
  if (url === "/api/catch" && method === "GET") {
    return {
      success: true, message: "OK",
      data: [
        { id: 1, userId: 1, fisherId: "F001", species: "Tilapia", gearType: "Net", fishingHours: 5,
          catchVolumeKg: 120, weather: "Sunny", catchDate: "2026-09-20", country: "Nigeria",
          region: "Lagos", createdAt: "2026-09-20T08:00:00Z", updatedAt: "2026-09-20T08:00:00Z" },
      ],
    };
  }
  if (url === "/api/catch" && method === "POST") {
    const payload = body as logCatchData;
    return { success: true, message: "Catch logged", data: { data: payload } };
  }
  if (url === "/api/catch/summary" && method === "GET") {
    return {
      success: true, message: "OK",
      data: { month: "September 2026", totalCatchKg: 3420, totalFishingHours: 210, totalLogs: 34,
        topSpecies: "Tilapia", gearBreakdown: [], revenueEstimate: 452000, totalSoldKg: 2980, totalTransactions: 128 },
    };
  }

  // ---- LOG SALES ----
  if (url === "/api/sales" && method === "GET") {
    return { success: true, message: "OK", data: { logSalesHistoryData: [] } };
  }
  if (url === "/api/sales" && method === "POST") {
    const payload = body as logSalesData;
    return { success: true, message: "Sale logged", data: { logSalesData: payload } };
  }
  if (url === "/api/sales/summary" && method === "GET") {
    return { success: true, message: "OK",
      data: { month: "September 2026", totalRevenue: 452000, totalWeightSoldKg: 2980, totalTransactions: 128 } };
  }

  // ---- PROCESSING ----
  if (url === "/api/processing" && method === "GET") {
    return { success: true, message: "OK", data: { processingHistory: [] } };
  }
  if (url === "/api/processing" && method === "POST") {
    const payload = body as processingLogData;
    return { success: true, message: "Processing entry logged", data: { processingLogData: payload } };
  }
  if (url === "/api/processing/summary" && method === "GET") {
    return { success: true, message: "OK",
      data: { processingMetricsData: {
        totalProcessedKg: 2600, processedPercentChange: 8.2, spoilageLast7DaysKg: 45,
        spoilagePercentChange: -3.1, avgYieldRate: 92, avgYieldPercent: 92,
        targetYield: 95, targetYieldPercent: 95, yieldStatus: "GOOD" } } };
  }

  throw { success: false, message: `No mock handler for ${method} ${url}` };
}