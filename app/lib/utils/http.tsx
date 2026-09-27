// app/lib/utils/http.tsx
import { getCookie, setCookie, deleteCookie } from "./cookie";
import { mockRequest } from "./mockRouter";

const APP_API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

const getHeaders = () => {
  const token = getCookie("accessToken");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Calls the refresh endpoint and updates the stored accessToken
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${APP_API_BASEURL}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const newAccessToken = data?.data?.accessToken;

    if (newAccessToken) {
      setCookie("accessToken", newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch {
    return null;
  }
};

// Shared fetch handler with automatic token refresh + retry (or mock, when enabled)
const fetchWithRefresh = async <T = unknown>(url: string, options: RequestInit): Promise<T> => {
  if (USE_MOCKS) {
    const method = options.method || "GET";
    const body: unknown = options.body ? JSON.parse(options.body as string) : undefined;
    return mockRequest(url, method, body) as Promise<T>;
  }

  const res = await fetch(`${APP_API_BASEURL}${url}`, {
    ...options,
    headers: getHeaders(),
  });

  if (res.status === 401) {
    if (url.startsWith("/api/auth/")) {
      throw await res.json();
    }

    const newToken = await refreshAccessToken();

    if (!newToken) {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  throw { success: false, message: "Session expired", code: "SESSION_EXPIRED" };
}

    const retryRes = await fetch(`${APP_API_BASEURL}${url}`, {
      ...options,
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${newToken}`,
      },
    });

    if (!retryRes.ok) throw await retryRes.json();
    return retryRes.json();
  }

  if (!res.ok) throw await res.json();
  return res.json();
};

export const Http = {
  get: <T = unknown>(url: string) =>
    fetchWithRefresh<T>(url, { method: "GET" }),

  post: <T = unknown, B = unknown>(url: string, body: B) =>
    fetchWithRefresh<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T = unknown, B = unknown>(url: string, body: B) =>
    fetchWithRefresh<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T = unknown>(url: string) =>
    fetchWithRefresh<T>(url, { method: "DELETE" }),
};

export default Http;