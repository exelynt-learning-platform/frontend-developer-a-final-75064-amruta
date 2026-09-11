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
      <Table aria-label="Employees Directory Table">
        <caption style={{ textAlign: "left", padding: "8px 16px", color: "#666", fontSize: "0.875rem" }}>
          Employees Directory - Showing {employees.length} {employees.length === 1 ? "employee" : "employees"}
        </caption>
        <TableHead sx={{ backgroundColor: "grey.100" }}>
          <TableRow>
            <TableCell component="th" scope="col" sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell component="th" scope="col" sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell component="th" scope="col" sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell component="th" scope="col" sx={{ fontWeight: "bold" }}>Mobile</TableCell>
            <TableCell component="th" scope="col" sx={{ fontWeight: "bold" }}>Country</TableCell>
            <TableCell component="th" scope="col" align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
