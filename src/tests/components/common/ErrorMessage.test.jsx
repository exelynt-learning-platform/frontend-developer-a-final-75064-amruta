import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../../../components/common/ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders with custom title and message", () => {
    render(<ErrorMessage title="Network Error" message="Unable to connect to server." />);
    expect(screen.getByText("Network Error")).toBeInTheDocument();
    expect(screen.getByText("Unable to connect to server.")).toBeInTheDocument();
  });

  it("extracts message from error object if message prop not given", () => {
    render(<ErrorMessage error={{ status: 404 }} />);
    expect(screen.getByText("The requested record was not found.")).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message="Fail" onRetry={handleRetry} />);
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
