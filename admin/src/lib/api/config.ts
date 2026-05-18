export const CONFIGURED_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL;

export const API_BASE_URL = (
  CONFIGURED_API_BASE_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function authHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function logApiFetchError({
  endpoint,
  url,
  status,
  error,
}: {
  endpoint: string;
  url: string;
  status?: number;
  error?: unknown;
}) {
  console.error("[api] fetch failed", {
    endpoint,
    url,
    status: status ?? "unavailable",
    error: error instanceof Error ? error.message : error,
  });
}
