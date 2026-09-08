import { describe, it, expect } from "vitest";
import {
  filterEmployeesById,
  filterEmployeesByQuery,
  normalizeEmployeePayload,
  sortEmployeesByName,
} from "../../features/employees/employeeUtils";

describe("employeeUtils", () => {
  const sampleEmployees = [
    { id: "1", name: "Alice Smith", email: "alice@example.com", country: "USA" },
    { id: "2", name: "Bob Johnson", emailId: "bob@example.com", country: "Canada" },
    { id: "3", name: "Charlie Rose", email: "charlie@test.com", country: "India" },
  ];

  describe("filterEmployeesById", () => {
    it("should filter employees by exact id", () => {
      const result = filterEmployeesById(sampleEmployees, "2");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob Johnson");
    });

    it("should return all employees if id is falsy", () => {
      expect(filterEmployeesById(sampleEmployees, "")).toEqual(sampleEmployees);
    });
  });

  describe("filterEmployeesByQuery", () => {
    it("should match by name", () => {
      const result = filterEmployeesByQuery(sampleEmployees, "alice");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should match by email or emailId", () => {
      const result = filterEmployeesByQuery(sampleEmployees, "bob@example.com");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob Johnson");
    });

    it("should match by country", () => {
      const result = filterEmployeesByQuery(sampleEmployees, "canada");
      expect(result).toHaveLength(1);
    });

    it("should return all employees if query is empty", () => {
      expect(filterEmployeesByQuery(sampleEmployees, "")).toEqual(sampleEmployees);
    });
  });

  describe("normalizeEmployeePayload", () => {
    it("should trim and normalize strings", () => {
      const input = {
        name: "  Jane Doe  ",
        email: "  jane@test.com ",
        mobile: " 1234567890 ",
        country: " India ",
        state: " MH ",
        district: " Pune ",
      };
      const normalized = normalizeEmployeePayload(input);
      expect(normalized.name).toBe("Jane Doe");
      expect(normalized.email).toBe("jane@test.com");
      expect(normalized.emailId).toBe("jane@test.com");
      expect(normalized.mobile).toBe("1234567890");
    });

    it("should handle empty object safely", () => {
      const normalized = normalizeEmployeePayload({});
      expect(normalized.name).toBe("");
      expect(normalized.email).toBe("");
    });
  });

  describe("sortEmployeesByName", () => {
    it("should sort ascending by default", () => {
      const sorted = sortEmployeesByName(sampleEmployees);
      expect(sorted[0].name).toBe("Alice Smith");
      expect(sorted[2].name).toBe("Charlie Rose");
    });

    it("should sort descending when specified", () => {
      const sorted = sortEmployeesByName(sampleEmployees, "desc");
      expect(sorted[0].name).toBe("Charlie Rose");
      expect(sorted[2].name).toBe("Alice Smith");
    });
  });
});
