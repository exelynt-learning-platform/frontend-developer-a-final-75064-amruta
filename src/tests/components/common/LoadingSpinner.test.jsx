import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("renders with default loading message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<LoadingSpinner message="Fetching records..." size={50} />);
    expect(screen.getByText("Fetching records...")).toBeInTheDocument();
  });
});
