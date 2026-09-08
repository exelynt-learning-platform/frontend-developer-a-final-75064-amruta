/**
 * Format email safely from employee object (handles email or emailId)
 * @param {Object} employee
 * @returns {string}
 */
export const formatEmail = (employee) => {
  if (!employee) return "N/A";
  return employee.email || employee.emailId || "N/A";
};

/**
 * Format 10-digit phone number as (XXX) XXX-XXXX or return original
 * @param {string|number} phone
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "N/A";
  const cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return String(phone);
};

/**
 * Capitalize first letter of a word
 * @param {string} text
 * @returns {string}
 */
export const capitalize = (text) => {
  if (!text || typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format complete location string
 * @param {string} district
 * @param {string} state
 * @param {string} country
 * @returns {string}
 */
export const formatLocation = (district, state, country) => {
  const parts = [district, state, country].filter((p) => Boolean(p && String(p).trim()));
  return parts.length > 0 ? parts.join(", ") : "N/A";
};
