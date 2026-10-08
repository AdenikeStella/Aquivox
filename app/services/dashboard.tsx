import { dashboardMetricsResponse } from "../lib/types";
import Http from "../lib/utils/http"

export const DashboardMetricsData = () => {
  return Http.get<dashboardMetricsResponse>(`/api/dashboard/summary`)
}