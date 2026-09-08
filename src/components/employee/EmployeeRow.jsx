import { TableRow, TableCell, Button, Stack } from "@mui/material";

function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>

      <TableCell>{employee.name}</TableCell>

      <TableCell>{employee.email}</TableCell>

      <TableCell>{employee.mobile}</TableCell>

      <TableCell>{employee.country}</TableCell>

      <TableCell>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(employee.id)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default EmployeeRow;
