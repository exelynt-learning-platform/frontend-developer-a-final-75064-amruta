import { describe, it, expect } from "vitest";
import { api } from "../../services/api";
import { validateApiBaseUrl, DEFAULT_API_BASE_URL } from "../../constants/apiConstants";

describe("api service", () => {
  it("exports api object with baseURL", () => {
    expect(api).toBeDefined();
    expect(typeof api.baseURL).toBe("string");
  });

  describe("validateApiBaseUrl", () => {
    it("returns default URL when input is missing or empty", () => {
      expect(validateApiBaseUrl()).toBe(DEFAULT_API_BASE_URL);
      expect(validateApiBaseUrl("")).toBe(DEFAULT_API_BASE_URL);
      expect(validateApiBaseUrl("   ")).toBe(DEFAULT_API_BASE_URL);
      expect(validateApiBaseUrl(null)).toBe(DEFAULT_API_BASE_URL);
    });

    it("returns default URL when input is an invalid URL format", () => {
      expect(validateApiBaseUrl("not-a-valid-url")).toBe(DEFAULT_API_BASE_URL);
    });

    it("normalizes valid URLs and ensures a trailing slash", () => {
      expect(validateApiBaseUrl("https://example.com/api")).toBe("https://example.com/api/");
      expect(validateApiBaseUrl("https://example.com/api/")).toBe("https://example.com/api/");
    });
  });
});
