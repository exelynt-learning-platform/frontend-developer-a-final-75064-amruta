import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { getErrorMessage } from "../../utils/errorHandler";

function ErrorMessage({
  title = "Error",
  message,
  error,
  onRetry,
  severity = "error",
}) {
  const displayMessage = message || (error ? getErrorMessage(error) : "An unexpected error occurred.");

  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity={severity}
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : null
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {displayMessage}
      </Alert>
    </Box>
  );
}

export default ErrorMessage;
