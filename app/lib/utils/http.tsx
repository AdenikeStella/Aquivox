import { getCookie, setCookie, deleteCookie } from "./cookie";

const APP_API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;

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

// Shared fetch handler with automatic token refresh + retry
const fetchWithRefresh = async (url: string, options: RequestInit): Promise<any> => {
  const res = await fetch(`${APP_API_BASEURL}${url}`, {
    ...options,
    headers: getHeaders(),
  });

  // If 401, try to refresh and retry once
  if (res.status === 401) {
    if (url.startsWith("/api/auth/")) {
        throw await res.json();
    }

    const newToken = await refreshAccessToken();

    if (!newToken) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        window.location.href = "/login";
        return;
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
  get: (url: string) =>
    fetchWithRefresh(url, { method: "GET" }),

  post: (url: string, body: any) =>
    fetchWithRefresh(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (url: string, body: any) =>
    fetchWithRefresh(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (url: string) =>
    fetchWithRefresh(url, { method: "DELETE" }),
};

export default Http;