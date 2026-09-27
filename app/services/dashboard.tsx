import Http from "../lib/utils/http"

export const DashboardMetricsData = (payload: any) => {
  return  Http.get(`/api/dashboard/summary`)
}