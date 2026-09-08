import { TableRow, TableCell } from "@mui/material";
import EmployeeActions from "./EmployeeActions";
import { formatEmail, formatPhoneNumber } from "../../utils/formatters";

function EmployeeRow({ employee, onEdit, onDelete, isDeleting = false }) {
  if (!employee) return null;

  return (
    <TableRow hover data-testid={`employee-row-${employee.id}`}>
      <TableCell component="th" scope="row">
        {employee.id}
      </TableCell>
      <TableCell>{employee.name || "N/A"}</TableCell>
      <TableCell>{formatEmail(employee)}</TableCell>
      <TableCell>{formatPhoneNumber(employee.mobile)}</TableCell>
      <TableCell>{employee.country || "N/A"}</TableCell>
      <TableCell align="center">
        <EmployeeActions
          employeeId={employee.id}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
}

export default EmployeeRow;
