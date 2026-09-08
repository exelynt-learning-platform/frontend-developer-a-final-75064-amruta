import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";

import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../../features/employees/employeeApi";

import { useGetCountriesQuery } from "../../features/countries/countryApi";

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: employee,
    isLoading: employeeLoading,
    isError: employeeError,
  } = useGetEmployeeByIdQuery(id);

  const { data: countries = [], isLoading: countriesLoading } =
    useGetCountriesQuery();

  const [updateEmployee, { isLoading: updating }] = useUpdateEmployeeMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });

  /*
   * Populate form when employee API returns data
   */
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        mobile: employee.mobile || "",
        country: employee.country || "",
        state: employee.state || "",
        district: employee.district || "",
      });
    }
  }, [employee]);

  /*
   * Generic input handler
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Country change
   */
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;

    setFormData((previous) => ({
      ...previous,
      country: selectedCountry,

      // Reset dependent fields
      state: "",
      district: "",
    }));
  };

  /*
   * Update employee
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateEmployee({
        id,
        employee: formData,
      }).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  if (employeeLoading) {
    return <Typography>Loading employee...</Typography>;
  }

  if (employeeError) {
    return <Typography color="error">Failed to load employee.</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 3,
      }}
    >
      <Typography variant="h5" mb={3}>
        Edit Employee
      </Typography>

      {/* Name */}
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />

      {/* Email */}
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />

      {/* Mobile */}
      <TextField
        fullWidth
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        margin="normal"
      />

      {/* Country */}
      <TextField
        select
        fullWidth
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        margin="normal"
        disabled={countriesLoading}
      >
        {countries.map((country) => (
          <MenuItem key={country.id} value={country.country}>
            {country.country}
          </MenuItem>
        ))}
      </TextField>

      {/* State */}
      <TextField
        select
        fullWidth
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        margin="normal"
        disabled={!formData.country}
      >
        <MenuItem value="">Select State</MenuItem>

        {/* Add your state data here */}
      </TextField>

      {/* District */}
      <TextField
        select
        fullWidth
        label="District"
        name="district"
        value={formData.district}
        onChange={handleChange}
        margin="normal"
        disabled={!formData.state}
      >
        <MenuItem value="">Select District</MenuItem>

        {/* Add your district data here */}
      </TextField>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={() => navigate("/employees")}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" disabled={updating}>
          {updating ? "Updating..." : "Update Employee"}
        </Button>
      </Box>
    </Box>
  );
}

export default EditEmployeePage;
