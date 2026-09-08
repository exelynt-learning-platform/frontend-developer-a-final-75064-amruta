export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/";

export const API_ENDPOINTS = {
  EMPLOYEES: "/employee",
  COUNTRIES: "/country",
};
