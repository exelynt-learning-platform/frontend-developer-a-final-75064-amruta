import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../../../components/common/ErrorBoundary";

function ProblematicComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("Test render error");
  }
  return <div>Normal Content</div>;
}

describe("ErrorBoundary Component", () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Content")).toBeInTheDocument();
  });

  it("catches error and displays fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/an unexpected application error occurred/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload app/i })).toBeInTheDocument();
  });

  it("calls onReset callback when reload button is clicked", () => {
    const handleReset = vi.fn();
    render(
      <ErrorBoundary onReset={handleReset}>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadBtn = screen.getByRole("button", { name: /reload app/i });
    fireEvent.click(reloadBtn);

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
