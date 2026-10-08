import { logSalesData, logSalesDataResponse, logSalesHistoryDataResponse, LogSalesMetricsResponse } from "../lib/types";
import Http from "../lib/utils/http";

export const logSales = (payload: logSalesData) => {
    return Http.post<logSalesDataResponse>(`/api/sales`, payload)
};

export const logSalesHistory = () => {
    return Http.get<logSalesHistoryDataResponse>(`/api/sales`)
};

export const logSalesMetrics = () => {
    return Http.get<LogSalesMetricsResponse>(`/api/sales/summary`)
}