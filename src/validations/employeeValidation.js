import * as yup from "yup";

export const employeeValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),

  mobile: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  country: yup.string().required("Country is required"),

  state: yup
    .string()
    .trim()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  district: yup
    .string()
    .trim()
    .required("District is required")
    .min(2, "District must be at least 2 characters")
    .max(50, "District must not exceed 50 characters"),
});
