import { describe, it, expect } from "vitest";
import {
  selectEmployeesResult,
  selectEmployeesData,
  selectEmployeeByIdResult,
  selectEmployeeByIdData,
} from "../../features/employees/employeeSelectors";
import {
  selectCountriesResult,
  selectCountriesData,
  selectSelectedCountry,
  selectCountryFilter,
} from "../../features/countries/countrySelectors";

describe("Redux Selectors", () => {
  it("should select employee data from state safely", () => {
    const mockState = {
      employeeApi: {
        queries: {},
        mutations: {},
      },
      countryApi: {
        queries: {},
      },
      countryUi: {
        selectedCountry: "France",
        searchFilter: "Fra",
      },
    };

    expect(selectEmployeesResult(mockState)).toBeDefined();
    expect(selectEmployeesData(mockState)).toEqual([]);
    expect(selectEmployeeByIdResult("1")(mockState)).toBeDefined();
    expect(selectEmployeeByIdData(null)(mockState)).toBeNull();
    expect(selectCountriesResult(mockState)).toBeDefined();
    expect(selectCountriesData(mockState)).toEqual([]);
    expect(selectSelectedCountry(mockState)).toBe("France");
    expect(selectCountryFilter(mockState)).toBe("Fra");
  });
});
