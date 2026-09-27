import { logSalesData } from "../lib/types";
import Http from "../lib/utils/http";

export const logSales = (payload: logSalesData) => {
    return Http.post(`/api/sales`, payload)
};

export const logSalesHistory = () => {
    return Http.get(`/api/sales`)
};

export const logSalesMetrics = (payload: any) => {
    return Http.get(`/api/sales/summary`)
}