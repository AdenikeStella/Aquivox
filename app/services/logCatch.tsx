import { catchHistoryResponse, catchLogMetricsResponse, logCatchData, logCatchDataResponse } from "../lib/types"
import Http from "../lib/utils/http"

export const dailyCatchLog = (payload: logCatchData) => {
   return Http.post<logCatchDataResponse>(`/api/catch`, payload)
}

export const dailyCatchHistory = () => {
    return Http.get<catchHistoryResponse>(`/api/catch`)
}

export const dailycatchMetrics = () => {
    return Http.get<catchLogMetricsResponse>(`/api/catch/summary`)
}