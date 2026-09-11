export const DEFAULT_API_BASE_URL =
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/";

/**
 * Validates and normalizes the API base URL.
 * Ensures the URL is well-formed with a protocol and trailing slash,
 * falling back to DEFAULT_API_BASE_URL if invalid or omitted.
 * @param {string} rawUrl
 * @returns {string}
 */
export const validateApiBaseUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") {
    return DEFAULT_API_BASE_URL;
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return DEFAULT_API_BASE_URL;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.href.endsWith("/") ? parsed.href : `${parsed.href}/`;
  } catch {
    return DEFAULT_API_BASE_URL;
  }
};

const rawEnvUrl =
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_BASE_URL : undefined;

export const API_BASE_URL = validateApiBaseUrl(rawEnvUrl);

export const API_ENDPOINTS = {
  EMPLOYEES: "/employee",
  COUNTRIES: "/country",
};
