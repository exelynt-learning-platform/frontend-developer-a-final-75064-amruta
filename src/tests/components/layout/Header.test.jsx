import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../../components/layout/Header";

describe("Header Component", () => {
  it("renders app title and navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Employee Management")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /employees/i })).toHaveAttribute("href", "/employees");
    expect(screen.getByRole("link", { name: /add employee/i })).toHaveAttribute("href", "/employees/add");
  });
});
