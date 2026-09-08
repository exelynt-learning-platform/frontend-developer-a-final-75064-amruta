import { describe, it, expect } from "vitest";
import { getErrorMessage } from "../../utils/errorHandler";

describe("errorHandler", () => {
  it("should return fallback when error is undefined or null", () => {
    expect(getErrorMessage(null, "Custom fallback")).toBe("Custom fallback");
    expect(getErrorMessage(undefined)).toBe("An unexpected error occurred. Please try again.");
  });

  it("should return the string directly if error is a string", () => {
    expect(getErrorMessage("Direct error string")).toBe("Direct error string");
  });

  it("should return error.data if it is a string", () => {
    expect(getErrorMessage({ data: "Record not found" })).toBe("Record not found");
  });

  it("should return error.data.message if present", () => {
    expect(getErrorMessage({ data: { message: "Invalid payload" } })).toBe("Invalid payload");
  });

  it("should return specific message for HTTP 404", () => {
    expect(getErrorMessage({ status: 404 })).toBe("The requested record was not found.");
  });

  it("should return specific message for HTTP 500", () => {
    expect(getErrorMessage({ status: 500 })).toBe("Server error. Please try again later.");
  });

  it("should return network connection message for FETCH_ERROR", () => {
    expect(getErrorMessage({ status: "FETCH_ERROR" })).toBe(
      "Network connection error. Please check your internet connection."
    );
  });

  it("should return error.error if present", () => {
    expect(getErrorMessage({ status: 400, error: "Bad Request" })).toBe("Bad Request");
  });

  it("should return Error.message for standard Error objects", () => {
    expect(getErrorMessage(new Error("Standard JS error"))).toBe("Standard JS error");
  });
});
