import { describe, it, expect } from "vitest";
import countryReducer, {
  setSelectedCountry,
  setSearchFilter,
  resetCountryState,
} from "../../features/countries/countrySlice";

describe("countrySlice reducer", () => {
  const initialState = {
    selectedCountry: "",
    searchFilter: "",
  };

  it("should return the initial state by default", () => {
    expect(countryReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSelectedCountry", () => {
    const state = countryReducer(initialState, setSelectedCountry("United States"));
    expect(state.selectedCountry).toBe("United States");
  });

  it("should handle setSearchFilter", () => {
    const state = countryReducer(initialState, setSearchFilter("Sing"));
    expect(state.searchFilter).toBe("Sing");
  });

  it("should handle resetCountryState", () => {
    const modifiedState = {
      selectedCountry: "Australia",
      searchFilter: "Aus",
    };
    const state = countryReducer(modifiedState, resetCountryState());
    expect(state).toEqual(initialState);
  });
});
