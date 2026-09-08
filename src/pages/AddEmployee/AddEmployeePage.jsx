import { Box, Typography, Paper, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useCreateEmployeeMutation } from "../../features/employees/employeeApi";

import { useGetCountriesQuery } from "../../features/countries/countryApi";

import EmployeeForm from "../../components/employee/EmployeeForm";

function AddEmployeePage() {
  const navigate = useNavigate();

  const {
    data: countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
  } = useGetCountriesQuery();

  const [createEmployee, { isLoading: isCreating, isError: isCreateError }] =
    useCreateEmployeeMutation();

  const handleSubmit = async (formData) => {
    try {
      await createEmployee(formData).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add Employee
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Enter employee information
      </Typography>

      {isCountriesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load countries.
        </Alert>
      )}

      {isCreateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to create employee. Please try again.
        </Alert>
      )}

      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <EmployeeForm
          countries={countries}
          isSubmitting={isCreating || isCountriesLoading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
    </Box>
  );
}

export default AddEmployeePage;
