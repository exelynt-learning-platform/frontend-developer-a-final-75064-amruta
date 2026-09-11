import { useState } from "react";
import { Box, Typography, Paper, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../../features/employees/employeeApi";
import { useGetCountriesQuery } from "../../features/countries/countryApi";
import { getErrorMessage } from "../../utils/errorHandler";
import EmployeeForm from "../../components/employee/EmployeeForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitErrorMessage, setSubmitErrorMessage] = useState(null);

  // Validate ID parameter before triggering any API queries to prevent unnecessary calls
  const isValidId = Boolean(id && String(id).trim() && id !== "undefined" && id !== "null");

  // Fetch employee by ID (skipped if ID is missing or invalid)
  const {
    data: employee,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
    error: employeeError,
    refetch: refetchEmployee,
  } = useGetEmployeeByIdQuery(id, { skip: !isValidId });

  // Fetch countries list for the dropdown (skipped if ID is invalid)
  const {
    data: countries = [],
    isLoading: isCountriesLoading,
    isError: isCountriesError,
  } = useGetCountriesQuery(undefined, { skip: !isValidId });

  // Update employee mutation
  const [updateEmployee, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdateEmployeeMutation();

  const handleSubmit = async (formData) => {
    try {
      setSubmitErrorMessage(null);
      await updateEmployee({
        id,
        employee: formData,
      }).unwrap();

      navigate("/employees");
    } catch (err) {
      const userMessage = getErrorMessage(
        err,
        "Failed to update employee. Please check your data and try again."
      );
      setSubmitErrorMessage(userMessage);
    }
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  // Immediate validation error when ID parameter is missing or invalid
  if (!isValidId) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <ErrorMessage
          title="Invalid Employee ID"
          message={`The employee ID "${id || ""}" is invalid. Please return to the directory and select a valid employee.`}
          onRetry={() => navigate("/employees")}
        />
      </Box>
    );
  }

  if (isEmployeeLoading) {
    return <LoadingSpinner message={`Loading employee #${id}...`} />;
  }

  if (isEmployeeError || !employee || (Array.isArray(employee) && employee.length === 0)) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <ErrorMessage
          title="Employee Not Found"
          message={`Unable to load employee #${id}.`}
          error={employeeError}
          onRetry={refetchEmployee}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Edit Employee #{id}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Update employee information
      </Typography>

      {isCountriesError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Failed to load country list. You can still update other details.
        </Alert>
      )}

      {(isUpdateError || submitErrorMessage) && (
        <ErrorMessage
          title="Update Failed"
          message={submitErrorMessage || "Failed to update employee. Please check your data and try again."}
          error={updateError}
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
          isEdit
          countries={countries}
          defaultValues={employee}
          isSubmitting={isUpdating || isCountriesLoading}
          isCountriesLoading={isCountriesLoading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
    </Box>
  );
}

export default EditEmployeePage;
