import { Box, TextField, Button, MenuItem, Stack } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { employeeValidationSchema } from "../../validations/employeeValidation";

function EmployeeForm({
  countries = [],
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeValidationSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      district: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Mobile"
        {...register("mobile")}
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
        fullWidth
      />

      <TextField
        select
        label="Country"
        {...register("country")}
        error={!!errors.country}
        helperText={errors.country?.message}
        fullWidth
      >
        <MenuItem value="">Select Country</MenuItem>

        {countries.map((country) => (
          <MenuItem key={country.id} value={country.country}>
            {country.country}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="State"
        {...register("state")}
        error={!!errors.state}
        helperText={errors.state?.message}
        fullWidth
      />

      <TextField
        label="District"
        {...register("district")}
        error={!!errors.district}
        helperText={errors.district?.message}
        fullWidth
      />

      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: 2 }}
      >
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Employee"}
        </Button>
      </Stack>
    </Box>
  );
}

export default EmployeeForm;
