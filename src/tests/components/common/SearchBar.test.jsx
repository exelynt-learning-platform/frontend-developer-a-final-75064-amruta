import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../../components/common/SearchBar";

describe("SearchBar Component", () => {
  it("renders search input, search button, and clear button", () => {
    render(<SearchBar onSearch={vi.fn()} onClear={vi.fn()} />);
    expect(screen.getByLabelText(/search employee by id/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("disables search button when input is empty or whitespace", () => {
    render(<SearchBar onSearch={vi.fn()} onClear={vi.fn()} />);
    const searchBtn = screen.getByRole("button", { name: /search/i });
    expect(searchBtn).toBeDisabled();

    const input = screen.getByLabelText(/search employee by id/i);
    fireEvent.change(input, { target: { value: "   " } });
    expect(searchBtn).toBeDisabled();
  });

  it("calls onSearch with trimmed query on button click", () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} onClear={vi.fn()} />);

    const input = screen.getByLabelText(/search employee by id/i);
    fireEvent.change(input, { target: { value: " 42 " } });

    const searchBtn = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchBtn);

    expect(handleSearch).toHaveBeenCalledWith("42");
  });

  it("calls onSearch on form submission (Enter key)", () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} onClear={vi.fn()} />);

    const input = screen.getByLabelText(/search employee by id/i);
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.submit(input.closest("form"));

    expect(handleSearch).toHaveBeenCalledWith("100");
  });

  it("clears search input and calls onClear when clear button is clicked", () => {
    const handleClear = vi.fn();
    render(<SearchBar onSearch={vi.fn()} onClear={handleClear} initialValue="15" />);

    const input = screen.getByLabelText(/search employee by id/i);
    expect(input.value).toBe("15");

    const clearBtn = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearBtn);

    expect(input.value).toBe("");
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
