import { processingLogData, processingLogDataResponse, processingHistoryResponse, processingMetricsDataResponse } from "../lib/types";
import Http from "../lib/utils/http";

export const processingEntry = (
    payload: processingLogData
) => {
    return Http.post<processingLogDataResponse>(`/api/processing`, payload);
};

export const processingHistoryList = () => {
    return Http.get<processingHistoryResponse>(`/api/processing`)
};

export const processingMetrics = () => {
    return Http.get<processingMetricsDataResponse>(`/api/processing/summary`)
};