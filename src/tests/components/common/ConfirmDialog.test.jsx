import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

describe("ConfirmDialog Component", () => {
  it("does not render dialog content when open is false", () => {
    render(
      <ConfirmDialog
        open={false}
        title="Delete Confirmation"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.queryByText("Delete Confirmation")).not.toBeInTheDocument();
  });

  it("renders title, message, and buttons when open is true", () => {
    const handleConfirm = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        title="Delete Employee #1"
        message="Are you sure you want to proceed?"
        confirmText="Yes, Delete"
        cancelText="No, Keep"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );

    expect(screen.getByText("Delete Employee #1")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: /no, keep/i });
    fireEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalledTimes(1);

    const confirmBtn = screen.getByRole("button", { name: /yes, delete/i });
    fireEvent.click(confirmBtn);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables buttons and shows deleting status when isLoading is true", () => {
    render(
      <ConfirmDialog
        open={true}
        isLoading={true}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Deleting...")).toBeInTheDocument();
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    expect(cancelBtn).toBeDisabled();
  });
});
