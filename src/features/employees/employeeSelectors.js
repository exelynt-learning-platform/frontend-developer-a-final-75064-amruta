import { employeeApi } from "./employeeApi";

// Select the raw getEmployees query result object from state
export const selectEmployeesResult = employeeApi.endpoints.getEmployees.select();

// Select cached list of employees or empty array fallback
export const selectEmployeesData = (state) => {
  const result = selectEmployeesResult(state);
  return result?.data ?? [];
};

// Select employee by ID query result
export const selectEmployeeByIdResult = (id) => (state) => {
  if (!id) return null;
  return employeeApi.endpoints.getEmployeeById.select(id)(state);
};

// Select employee by ID data
export const selectEmployeeByIdData = (id) => (state) => {
  const result = selectEmployeeByIdResult(id)(state);
  return result?.data ?? null;
};
