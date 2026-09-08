import { useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { employeeValidationSchema } from "../../validations/employeeValidation";

const EMPTY_VALUES = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: "",
};

function EmployeeForm({
  countries = [],
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  isCountriesLoading = false,
  isEdit = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeValidationSchema),
    defaultValues: defaultValues || EMPTY_VALUES,
  });

  // Re-synchronize form values when defaultValues update (e.g. after async fetch in Edit)
  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        email: defaultValues.email || defaultValues.emailId || "",
        mobile: defaultValues.mobile || "",
        country: defaultValues.country || "",
        state: defaultValues.state || "",
        district: defaultValues.district || "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {/* Name */}
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        required
        slotProps={{
          htmlInput: { "aria-label": "Employee Name" },
        }}
      />

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        required
        slotProps={{
          htmlInput: { "aria-label": "Employee Email" },
        }}
      />

      {/* Mobile */}
      <TextField
        label="Mobile"
        {...register("mobile")}
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
        placeholder="10-digit mobile number"
        fullWidth
        required
        slotProps={{
          htmlInput: { "aria-label": "Employee Mobile Number" },
        }}
      />

      {/* Country */}
      <TextField
        select
        label="Country"
        defaultValue=""
        {...register("country")}
        error={!!errors.country}
        helperText={errors.country?.message}
        fullWidth
        required
        disabled={isCountriesLoading}
        slotProps={{
          select: { "aria-label": "Country" },
        }}
      >
        <MenuItem value="">
          <em>{isCountriesLoading ? "Loading countries..." : "Select Country"}</em>
        </MenuItem>

        {countries.map((item) => {
          const val = item.country || item.name || item;
          const key = item.id || val;
          return (
            <MenuItem key={key} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </TextField>

      {/* State */}
      <TextField
        label="State"
        {...register("state")}
        error={!!errors.state}
        helperText={errors.state?.message}
        fullWidth
        required
        slotProps={{
          htmlInput: { "aria-label": "Employee State" },
        }}
      />

      {/* District */}
      <TextField
        label="District"
        {...register("district")}
        error={!!errors.district}
        helperText={errors.district?.message}
        fullWidth
        required
        slotProps={{
          htmlInput: { "aria-label": "Employee District" },
        }}
      />

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: 2 }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
            ? "Update Employee"
            : "Add Employee"}
        </Button>
      </Stack>
    </Box>
  );
}

export default EmployeeForm;
