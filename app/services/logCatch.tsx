import { catchHistoryResponse, logCatchData } from "../lib/types"
import Http from "../lib/utils/http"

export const dailyCatchLog = (payload: logCatchData) => {
   return Http.post(`/api/catch`, payload)
}

export const dailyCatchHistory = (payload: any) => {
    return Http.get(`/api/catch`)
}

export const dailycatchMetrics = (payload: any) => {
    return Http.get(`/api/catch/summary`)
}

