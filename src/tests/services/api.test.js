import { describe, it, expect } from "vitest";
import { api } from "../../services/api";

describe("api service", () => {
  it("exports api object with baseURL", () => {
    expect(api).toBeDefined();
    expect(typeof api.baseURL).toBe("string");
  });
});
