import { useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useDeleteEmployeeMutation,
} from "../../features/employees/employeeApi";

import EmployeeTable from "../../components/employee/EmployeeTable";
import SearchBar from "../../components/common/SearchBar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

function EmployeeListPage() {
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Get all employees (conditionally skipped when searching by ID to avoid redundant API requests)
  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetEmployeesQuery(undefined, {
    skip: Boolean(searchId),
  });

  // Search employee by ID
  const {
    data: searchedEmployee,
    isLoading: isSearching,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useGetEmployeeByIdQuery(searchId, {
    skip: !searchId,
  });

  // Handle the isLoading state based on the active query parameters (searchId):
  // If searchId is cleared/empty, search is inactive so isSearchLoading is immediately false.
  // This prevents the race condition where isLoading remains true after clearing the search,
  // which previously prevented the full employee list from rendering.
  const isSearchLoading = Boolean(searchId) && Boolean(isSearching || isSearchFetching);

  // Delete employee mutation
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const handleSearch = (id) => {
    setSearchId(id);
  };

  const handleClear = () => {
    setSearchId("");
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteTargetId(id);
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setDeleteTargetId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteEmployee(deleteTargetId).unwrap();
      setSnackbar({
        open: true,
        message: `Employee #${deleteTargetId} deleted successfully.`,
        severity: "success",
      });
      setDeleteTargetId(null);

      // If we were viewing this searched employee, reset search
      if (searchId === deleteTargetId) {
        setSearchId("");
      }
    } catch (err) {
      console.error("Failed to delete employee:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete employee. Please try again.",
        severity: "error",
      });
    }
  };

  // Loading initial employees (only when no search is active)
  if (isLoading && !searchId) {
    return <LoadingSpinner message="Loading employees..." />;
  }

  // Error loading initial employees (only when no search is active)
  if (isError && !searchId) {
    return (
      <Box sx={{ my: 4 }}>
        <ErrorMessage
          title="Failed to Load Employees"
          error={error}
          onRetry={refetch}
        />
      </Box>
    );
  }

  // Determine which employees to display
  let displayedEmployees = employees;
  if (searchId) {
    if (searchedEmployee && !isSearchError) {
      if (Array.isArray(searchedEmployee)) {
        displayedEmployees = searchedEmployee;
      } else {
        displayedEmployees = [searchedEmployee];
      }
    } else {
      displayedEmployees = [];
    }
  }

  // Check if searched employee was not found:
  // If searchId is active, loading is complete, and either:
  // - the query resulted in an error
  // - the result is null/undefined
  // - the result is an empty array [] (mockapi.io behavior for non-existent IDs)
  // - displayedEmployees is empty
  const isSearchNotFound =
    Boolean(searchId) &&
    !isSearchLoading &&
    (isSearchError ||
      !searchedEmployee ||
      (Array.isArray(searchedEmployee) && searchedEmployee.length === 0) ||
      displayedEmployees.length === 0);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Employees
        </Typography>

        <Button
          component={Link}
          to="/employees/add"
          variant="contained"
          color="primary"
        >
          Add Employee
        </Button>
      </Box>

      <SearchBar onSearch={handleSearch} onClear={handleClear} initialValue={searchId} />

      {/* Searching State */}
      {isSearchLoading && (
        <LoadingSpinner message={`Searching for employee #${searchId}...`} size={30} />
      )}

      {/* Search Not Found State */}
      {isSearchNotFound && (
        <EmptyState
          title="No Employee Found"
          description={`Employee with ID "${searchId}" was not found. Please verify the ID and try again.`}
          actionLabel="Clear Search"
          onAction={handleClear}
        />
      )}

      {/* Empty State when no employees exist at all */}
      {!searchId && employees.length === 0 && (
        <EmptyState
          title="No Employees Yet"
          description="Get started by adding your first employee to the directory."
          actionLabel="Add Employee"
          onAction={() => navigate("/employees/add")}
        />
      )}

      {/* Employee Table */}
      {!isSearchLoading && displayedEmployees.length > 0 && (
        <EmployeeTable
          employees={displayedEmployees}
          onEdit={handleEdit}
          onDelete={handleOpenDeleteDialog}
          isDeleting={isDeleting}
        />
      )}

      {/* Confirmation Dialog before deleting */}
      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete employee #${deleteTargetId}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EmployeeListPage;
