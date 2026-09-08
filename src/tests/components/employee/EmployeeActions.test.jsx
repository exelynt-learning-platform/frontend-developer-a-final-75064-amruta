import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeActions from "../../../components/employee/EmployeeActions";

describe("EmployeeActions Component", () => {
  it("renders Edit and Delete action buttons", () => {
    render(
      <EmployeeActions
        employeeId="1"
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /edit employee 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete employee 1/i })).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const handleEdit = vi.fn();
    render(
      <EmployeeActions
        employeeId="42"
        onEdit={handleEdit}
        onDelete={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit employee 42/i }));
    expect(handleEdit).toHaveBeenCalledWith("42");
  });

  it("calls onDelete when Delete button is clicked", () => {
    const handleDelete = vi.fn();
    render(
      <EmployeeActions
        employeeId="42"
        onEdit={vi.fn()}
        onDelete={handleDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /delete employee 42/i }));
    expect(handleDelete).toHaveBeenCalledWith("42");
  });

  it("disables Delete button when isDeleting is true", () => {
    render(
      <EmployeeActions
        employeeId="42"
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        isDeleting={true}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /delete employee 42/i });
    expect(deleteBtn).toBeDisabled();
  });
});
