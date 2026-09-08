import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "../../../components/common/EmptyState";

describe("EmptyState Component", () => {
  it("renders default title and description", () => {
    render(<EmptyState />);
    expect(screen.getByText("No Employees Found")).toBeInTheDocument();
    expect(screen.getByText("There are no records matching your criteria.")).toBeInTheDocument();
  });

  it("renders custom title, description, and action button", () => {
    const handleAction = vi.fn();
    render(
      <EmptyState
        title="Custom Title"
        description="Custom Description"
        actionLabel="Click Me"
        onAction={handleAction}
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();

    const actionButton = screen.getByRole("button", { name: /click me/i });
    expect(actionButton).toBeInTheDocument();
    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
