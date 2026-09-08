import { describe, it, expect } from "vitest";
import { countryApi } from "../../features/countries/countryApi";

describe("countryApi definition", () => {
  it("defines countryApi with correct reducerPath", () => {
    expect(countryApi.reducerPath).toBe("countryApi");
    expect(countryApi.util).toBeDefined();
  });

  it("contains getCountries endpoint", () => {
    expect(countryApi.endpoints.getCountries).toBeDefined();
  });
});
