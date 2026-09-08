/**
 * Extract user-friendly error message from API or JavaScript errors
 * @param {any} error
 * @param {string} fallback
 * @returns {string}
 */
export const getErrorMessage = (error, fallback = "An unexpected error occurred. Please try again.") => {
  if (!error) return fallback;

  if (typeof error === "string") {
    return error;
  }

  // RTK Query error with data
  if (error.data) {
    if (typeof error.data === "string") {
      return error.data;
    }
    if (error.data.message) {
      return error.data.message;
    }
  }

  // RTK Query error with status code
  if (error.status) {
    if (error.status === 404) {
      return "The requested record was not found.";
    }
    if (error.status === 500) {
      return "Server error. Please try again later.";
    }
    if (error.status === "FETCH_ERROR") {
      return "Network connection error. Please check your internet connection.";
    }
    if (error.error) {
      return String(error.error);
    }
  }

  // Standard Error instance
  if (error.message) {
    return error.message;
  }

  return fallback;
};
