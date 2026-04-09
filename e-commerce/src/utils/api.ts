export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://backend-zi60.onrender.com"
).replace(/\/$/, "");

export const buildApiUrl = (path: string) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const resolveMediaUrl = (path?: string | null) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return buildApiUrl(path);
};
