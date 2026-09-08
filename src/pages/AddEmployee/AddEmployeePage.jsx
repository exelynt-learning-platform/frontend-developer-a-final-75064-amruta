import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useCreateEmployeeMutation } from "../../features/employees/employeeApi";
import { useGetCountriesQuery } from "../../features/countries/countryApi";
import EmployeeForm from "../../components/employee/EmployeeForm";
import ErrorMessage from "../../components/common/ErrorMessage";

function AddEmployeePage() {
  const navigate = useNavigate();

  const {
    data: countries = [],
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    error: countriesError,
  } = useGetCountriesQuery();

  const [createEmployee, { isLoading: isCreating, isError: isCreateError, error: createError }] =
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
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Add Employee
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Enter employee information to add them to the directory
      </Typography>

      {isCountriesError && (
        <ErrorMessage
          title="Country Warning"
          severity="warning"
          message="Failed to load country list from server. You can still type details manually if needed."
          error={countriesError}
        />
      )}

      {isCreateError && (
        <ErrorMessage
          title="Creation Failed"
          message="Failed to create employee. Please try again."
          error={createError}
        />
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
          isCountriesLoading={isCountriesLoading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
    </Box>
  );
}

export default AddEmployeePage;
