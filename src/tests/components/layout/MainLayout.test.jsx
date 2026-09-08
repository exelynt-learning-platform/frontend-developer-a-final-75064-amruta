import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";

describe("MainLayout Component", () => {
  it("renders header and wraps children inside layout container", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div data-testid="test-child">Child Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByText("Employee Management")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toHaveTextContent("Child Content");
  });
});
