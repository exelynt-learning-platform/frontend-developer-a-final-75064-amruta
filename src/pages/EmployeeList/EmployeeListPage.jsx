import { useState } from "react";
import { Typography, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useDeleteEmployeeMutation,
} from "../../features/employees/employeeApi";

import EmployeeTable from "../../components/employee/EmployeeTable";
import SearchBar from "../../components/common/SearchBar";

function EmployeeListPage() {
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState("");

  // Get all employees
  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();

  // Search employee by ID
  const {
    data: searchedEmployee,
    isLoading: isSearching,
    isError: isSearchError,
  } = useGetEmployeeByIdQuery(searchId, {
    skip: !searchId,
  });

  // Delete employee
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();

  const handleSearch = (id) => {
    setSearchId(id);
  };

  const handleClear = () => {
    setSearchId("");
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  // Loading employees
  if (isLoading) {
    return <Typography>Loading employees...</Typography>;
  }

  // Error loading employees
  if (isError) {
    return (
      <Typography color="error">
        Failed to load employees.
        <br />
        Please try again.
      </Typography>
    );
  }

  const displayedEmployees = searchId
    ? searchedEmployee
      ? [searchedEmployee]
      : []
    : employees;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Employee List
      </Typography>

      <SearchBar onSearch={handleSearch} onClear={handleClear} />

      {/* Searching */}
      {isSearching && (
        <Typography sx={{ mb: 2 }}>Searching employee...</Typography>
      )}

      {/* Search error */}
      {isSearchError && !isSearching && (
        <Typography color="error" sx={{ mb: 2 }}>
          Employee with ID {searchId} was not found.
        </Typography>
      )}

      {/* Employee table */}
      {!isSearching && !isSearchError && displayedEmployees.length > 0 && (
        <EmployeeTable
          employees={displayedEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* No employees */}
      {!searchId && employees.length === 0 && (
        <Typography sx={{ mb: 2 }}>No employees found.</Typography>
      )}
    </Box>
  );
}

export default EmployeeListPage;
