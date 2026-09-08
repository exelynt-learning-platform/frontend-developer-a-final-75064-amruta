import { Stack, Button } from "@mui/material";

function EmployeeActions({ employeeId, onEdit, onDelete, isDeleting = false }) {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => onEdit(employeeId)}
        aria-label={`Edit employee ${employeeId}`}
      >
        Edit
      </Button>

      <Button
        variant="outlined"
        color="error"
        size="small"
        disabled={isDeleting}
        onClick={() => onDelete(employeeId)}
        aria-label={`Delete employee ${employeeId}`}
      >
        Delete
      </Button>
    </Stack>
  );
}

export default EmployeeActions;
