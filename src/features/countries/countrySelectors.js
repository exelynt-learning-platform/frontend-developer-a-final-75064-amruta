import { countryApi } from "./countryApi";

// Select the raw getCountries query result
export const selectCountriesResult = countryApi.endpoints.getCountries.select();

// Select countries data array fallback
export const selectCountriesData = (state) => {
  const result = selectCountriesResult(state);
  return result?.data ?? [];
};

// UI state selectors
export const selectSelectedCountry = (state) => state?.countryUi?.selectedCountry ?? "";
export const selectCountryFilter = (state) => state?.countryUi?.searchFilter ?? "";
