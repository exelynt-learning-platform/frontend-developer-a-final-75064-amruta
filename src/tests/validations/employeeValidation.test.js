import { describe, it, expect } from "vitest";
import { employeeValidationSchema } from "../../validations/employeeValidation";

describe("employeeValidationSchema", () => {
  const validEmployee = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
  };

  it("should validate a completely valid employee payload", async () => {
    const isValid = await employeeValidationSchema.isValid(validEmployee);
    expect(isValid).toBe(true);
  });

  describe("name validation", () => {
    it("should fail when name is empty", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, name: "" })
      ).rejects.toThrow("Name is required");
    });

    it("should fail when name is less than 2 characters", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, name: "A" })
      ).rejects.toThrow("Name must be at least 2 characters");
    });

    it("should fail when name exceeds 50 characters", async () => {
      const longName = "A".repeat(51);
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, name: longName })
      ).rejects.toThrow("Name must not exceed 50 characters");
    });
  });

  describe("email validation", () => {
    it("should fail when email is empty", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, email: "" })
      ).rejects.toThrow("Email is required");
    });

    it("should fail when email format is invalid", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, email: "invalid-email" })
      ).rejects.toThrow("Enter a valid email address");
    });

    it("should fail when email exceeds 100 characters", async () => {
      const longEmail = `${"a".repeat(95)}@test.com`;
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, email: longEmail })
      ).rejects.toThrow("Email must not exceed 100 characters");
    });
  });

  describe("mobile validation", () => {
    it("should fail when mobile is empty", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, mobile: "" })
      ).rejects.toThrow("Mobile number is required");
    });

    it("should fail when mobile is less than 10 digits", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, mobile: "12345" })
      ).rejects.toThrow("Mobile number must be exactly 10 digits");
    });

    it("should fail when mobile contains non-digits", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, mobile: "98765abcde" })
      ).rejects.toThrow("Mobile number must be exactly 10 digits");
    });
  });

  describe("country, state, and district validation", () => {
    it("should fail when country is missing", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, country: "" })
      ).rejects.toThrow("Country is required");
    });

    it("should fail when state is empty or too short", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, state: "" })
      ).rejects.toThrow("State is required");

      await expect(
        employeeValidationSchema.validate({ ...validEmployee, state: "A" })
      ).rejects.toThrow("State must be at least 2 characters");
    });

    it("should fail when district is empty or too short", async () => {
      await expect(
        employeeValidationSchema.validate({ ...validEmployee, district: "" })
      ).rejects.toThrow("District is required");

      await expect(
        employeeValidationSchema.validate({ ...validEmployee, district: "X" })
      ).rejects.toThrow("District must be at least 2 characters");
    });
  });
});
