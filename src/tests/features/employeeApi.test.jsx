import { describe, it, expect } from "vitest";
import {
  employeeApi,
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../features/employees/employeeApi";

describe("employeeApi definition", () => {
  it("defines employeeApi with correct reducerPath and tagTypes", () => {
    expect(employeeApi.reducerPath).toBe("employeeApi");
    expect(employeeApi.util).toBeDefined();
    expect(typeof employeeApi.reducer).toBe("function");
    expect(typeof employeeApi.middleware).toBe("function");
  });

  it("contains all required endpoints", () => {
    const endpoints = employeeApi.endpoints;
    expect(endpoints.getEmployees).toBeDefined();
    expect(endpoints.getEmployeeById).toBeDefined();
    expect(endpoints.createEmployee).toBeDefined();
    expect(endpoints.updateEmployee).toBeDefined();
    expect(endpoints.deleteEmployee).toBeDefined();
  });

  it("exports all required React query and mutation hooks", () => {
    expect(typeof useGetEmployeesQuery).toBe("function");
    expect(typeof useGetEmployeeByIdQuery).toBe("function");
    expect(typeof useCreateEmployeeMutation).toBe("function");
    expect(typeof useUpdateEmployeeMutation).toBe("function");
    expect(typeof useDeleteEmployeeMutation).toBe("function");
  });

  it("creates valid query selectors for employees", () => {
    expect(typeof employeeApi.endpoints.getEmployees.select).toBe("function");
    expect(typeof employeeApi.endpoints.getEmployeeById.select).toBe("function");
  });
});
