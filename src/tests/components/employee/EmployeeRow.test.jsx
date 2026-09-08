import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeeRow from "../../../components/employee/EmployeeRow";
import { Table, TableBody } from "@mui/material";

describe("EmployeeRow Component", () => {
  const mockEmployee = {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    mobile: "9876543210",
    country: "Germany",
  };

  const renderInTable = (component) =>
    render(
      <Table>
        <TableBody>{component}</TableBody>
      </Table>
    );

  it("renders employee details correctly in table cells", () => {
    renderInTable(
      <EmployeeRow
        employee={mockEmployee}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("(987) 654-3210")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  it("renders emailId if email field is absent", () => {
    const employeeWithEmailId = {
      id: "2",
      name: "Bob",
      emailId: "bob@company.com",
      mobile: "1234567890",
      country: "USA",
    };

    renderInTable(
      <EmployeeRow
        employee={employeeWithEmailId}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("bob@company.com")).toBeInTheDocument();
  });

  it("returns null if employee is not provided", () => {
    const { container } = renderInTable(
      <EmployeeRow employee={null} onEdit={vi.fn()} onDelete={vi.fn()} />
    );
    expect(container.querySelector("tr")).toBeNull();
  });
});
