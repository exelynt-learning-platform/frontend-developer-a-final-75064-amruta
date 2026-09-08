import { describe, it, expect } from "vitest";
import {
  formatEmail,
  formatPhoneNumber,
  capitalize,
  formatLocation,
} from "../../utils/formatters";

describe("formatters", () => {
  describe("formatEmail", () => {
    it("should return email if present", () => {
      expect(formatEmail({ email: "test@example.com" })).toBe("test@example.com");
    });

    it("should return emailId if email is not present", () => {
      expect(formatEmail({ emailId: "user@domain.com" })).toBe("user@domain.com");
    });

    it("should return N/A if employee is null or has no email", () => {
      expect(formatEmail(null)).toBe("N/A");
      expect(formatEmail({})).toBe("N/A");
    });
  });

  describe("formatPhoneNumber", () => {
    it("should format a 10-digit phone number correctly", () => {
      expect(formatPhoneNumber("9876543210")).toBe("(987) 654-3210");
    });

    it("should handle numbers formatted as numbers", () => {
      expect(formatPhoneNumber(9876543210)).toBe("(987) 654-3210");
    });

    it("should return original string if not 10 digits", () => {
      expect(formatPhoneNumber("12345")).toBe("12345");
    });

    it("should return N/A if empty or falsy", () => {
      expect(formatPhoneNumber("")).toBe("N/A");
      expect(formatPhoneNumber(null)).toBe("N/A");
    });
  });

  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("employee")).toBe("Employee");
    });

    it("should return empty string for falsy or non-string input", () => {
      expect(capitalize("")).toBe("");
      expect(capitalize(null)).toBe("");
    });
  });

  describe("formatLocation", () => {
    it("should format district, state, and country nicely", () => {
      expect(formatLocation("Pune", "Maharashtra", "India")).toBe(
        "Pune, Maharashtra, India"
      );
    });

    it("should filter out empty or missing values", () => {
      expect(formatLocation("Pune", "", "India")).toBe("Pune, India");
    });

    it("should return N/A when all arguments are empty", () => {
      expect(formatLocation("", "", "")).toBe("N/A");
    });
  });
});
