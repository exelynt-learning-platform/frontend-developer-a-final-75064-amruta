import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

function ConfirmDialog({
  open,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this employee? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmColor = "error",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={isLoading} variant="outlined">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
          autoFocus
        >
          {isLoading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
