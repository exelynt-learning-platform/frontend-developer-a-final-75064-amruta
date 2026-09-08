import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import EmployeeRow from "./EmployeeRow";

function EmployeeTable({ employees = [], onEdit, onDelete, isDeleting = false }) {
  if (!employees.length) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2, overflowX: "auto" }}>
      <Table aria-label="Employees table">
        <TableHead sx={{ backgroundColor: "grey.100" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
