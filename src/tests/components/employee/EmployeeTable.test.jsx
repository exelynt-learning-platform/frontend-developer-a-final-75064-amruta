import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeeTable from "../../../components/employee/EmployeeTable";

describe("EmployeeTable Component", () => {
  const employees = [
    { id: "1", name: "Alice", email: "alice@test.com", mobile: "1112223333", country: "India" },
    { id: "2", name: "Bob", email: "bob@test.com", mobile: "4445556666", country: "UK" },
  ];

  it("renders table headers and rows for all employees", () => {
    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("returns null when employees array is empty", () => {
    const { container } = render(
      <EmployeeTable
        employees={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders accessible table caption and scope attributes for headers", () => {
    render(
      <EmployeeTable
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText(/employees directory - showing 2 employees/i)
    ).toBeInTheDocument();

    const idHeader = screen.getByRole("columnheader", { name: "ID" });
    expect(idHeader).toBeInTheDocument();
    expect(idHeader).toHaveAttribute("scope", "col");
  });
});
