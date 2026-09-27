import { processingLogData } from "../lib/types";
import Http from "../lib/utils/http";

export const processingEntry = (
    payload: processingLogData
) => {
    return Http.post(`/api/processing`, payload);
};

export const processingHistoryList = () => {
    return Http.get(`/api/processing`)
};

export const processingMetrics = () => {
    return Http.get(`/api/processing/summary`)
};