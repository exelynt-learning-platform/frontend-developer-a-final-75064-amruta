import { Typography, Button, Paper } from "@mui/material";

function EmptyState({
  title = "No Employees Found",
  description = "There are no records matching your criteria.",
  actionLabel,
  onAction,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        my: 3,
        textAlign: "center",
        backgroundColor: "background.default",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
}

export default EmptyState;
