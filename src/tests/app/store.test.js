import { describe, it, expect } from "vitest";
import { store } from "../../app/store";
import { setSelectedCountry, setSearchFilter, resetCountryState } from "../../features/countries/countrySlice";

describe("Redux Store Configuration", () => {
  it("should initialize store with correct state structure", () => {
    const state = store.getState();
    expect(state).toHaveProperty("employeeApi");
    expect(state).toHaveProperty("countryApi");
    expect(state).toHaveProperty("countryUi");
  });

  it("should handle countryUi actions correctly", () => {
    store.dispatch(setSelectedCountry("Canada"));
    expect(store.getState().countryUi.selectedCountry).toBe("Canada");

    store.dispatch(setSearchFilter("Can"));
    expect(store.getState().countryUi.searchFilter).toBe("Can");

    store.dispatch(resetCountryState());
    expect(store.getState().countryUi.selectedCountry).toBe("");
    expect(store.getState().countryUi.searchFilter).toBe("");
  });
});
