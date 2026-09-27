export interface UserOnboarding {
  fullName: string;
  role: string;
  mobile: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  mobile: string;
  password: string;
}

export interface VerifyOTP {
  mobile: string;
  otp: string;
}

export interface ForgotPasswordVerifyOTP {
  mobile: string;
  otp: string;
}

export interface ForgotPasswordVerifyOTPResponse {

  success: boolean;
  message: string;
  data: {
    passwordResetToken: string;
  }
}

export interface SetNewPassword {
  passwordResetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface dashboardMetrics {
  revenue: {
    currentMonth: number;
    previousMonth: number;
    percentChange: number;
  },
  transactions: number;
  catch: {
    totalCatchKg: number;
    totalCatchTons: number;
  },
}

export interface dashboardMetricsResponse {
  success: boolean;
  message: string;
  data: {
    revenue: {
      currentMonth: number;
      previousMonth: number;
      percentChange: number;
    },
    transactions: number;
    catch: {
      totalCatchKg: number;
      totalCatchTons: number;
    }
  }
}

export interface logCatchData {
  species: string,
  catchDate: string,
  quantity: number,
  unit: string,
  fishingHours: number,
  gearType: string,
}

export interface logCatchDataResponse {
  success: boolean;
  message: string;
  data: {
    data: logCatchData;
  }
}

export interface catchHistory {
  id: number;
  userId: number;
  fisherId: string;
  species: string;
  gearType: string;
  fishingHours: number;
  catchVolumeKg: number;
  weather: string | null;
  catchDate: string;
  country: string;
  region: string;
  createdAt: string;
  updatedAt: string;
}

export interface catchHistoryResponse {
  success: boolean;
  message: string;
  data:
  catchHistory[];
}

export interface catchLogMetrics {
  month: string;
  totalCatchKg: number;
  totalFishingHours: number;
  totalLogs: number;
  topSpecies: string;
  gearBreakdown: [];
  revenueEstimate: number;
  totalSoldKg: number;
  totalTransactions: number;
}

export interface catchLogMetricsResponse {
  success: boolean;
  message: string;
  data: {
    month: string;
    totalCatchKg: number;
    totalFishingHours: number;
    totalLogs: number;
    topSpecies: string;
    gearBreakdown: [];
    revenueEstimate: number;
    totalSoldKg: number;
    totalTransactions: number;
  }
}

export interface logSalesData {
  buyerName: string;
  species: string;
  quantitySoldKg: string;
  pricePerUnit: string;
  transactionDate: string;
}

export interface logSalesDataResponse {
  code: string;
  success: boolean;
  message: string;
  data: {
    logSalesData: {}
  }
}

export interface logSalesHistoryData {
  buyerName: string;
  species: string;
  quantitySoldKg: string;
  pricePerUnit: string;
  transactionDate: string;
  totalRevenue: string;
}

export interface logSalesHistoryDataResponse {
  code: string;
  success: boolean;
  message: string;
  data: {
    logSalesHistoryData: []
  }
}


export interface LogSalesMetrics {
  month: string;
  totalRevenue: number;
  totalWeightSoldKg: number;
  totalTransactions: number;
}

export interface LogSalesMetricsResponse {
  success: boolean;
  message: string;
  data: {
    month: string;
    totalRevenue: number;
    totalWeightSoldKg: number;
    totalTransactions: number;
  }
}

export interface processingLogData {
  processingDate: string;
  rawWeightKg: number;
  spoilageWeightKg: number;
  spoilageReason?: string;
  qualityReportUrl?: string;
  batchCode?: string;
  location?: string;
  species?: string;
}

export interface processingLogDataResponse {
  success: boolean;
  message: string;
  data: {
    processingLogData: {};
  }
}


export interface processingHistory {
  processingDate: string;
  processedWeightKg: number;
  spoilageWeightKg: number;
  lossPercent: number;
  status: "GOOD" | "cRITICAL" | "WARNING";
}

export interface processingHistoryResponse {
  success: boolean;
  message: string;
  data: {
    processingHistory: [];
  }
}

export interface processingMetricsData {
  totalProcessedKg: number;
  processedPercentChange: number;
  spoilageLast7DaysKg: number;
  spoilagePercentChange: number;
  avgYieldRate: number;
  avgYieldPercent: number;
  targetYield: number;
  targetYieldPercent: number;
  yieldStatus: string;
}

export interface processingMetricsDataResponse {
  success: boolean;
  message: string;
  data: {
  processingMetricsData: {}
}
}




