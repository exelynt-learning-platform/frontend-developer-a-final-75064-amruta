import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeForm from "../../../components/employee/EmployeeForm";

describe("EmployeeForm Component", () => {
  const mockCountries = [
    { id: "1", country: "India" },
    { id: "2", country: "United States" },
  ];

  it("renders all required form fields and buttons", () => {
    render(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/employee name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employee email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employee mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employee state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employee district/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /add employee/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("shows validation error messages when submitting empty form", async () => {
    render(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Mobile number is required")).toBeInTheDocument();
      expect(screen.getByText("State is required")).toBeInTheDocument();
      expect(screen.getByText("District is required")).toBeInTheDocument();
    });
  });

  it("calls onSubmit with valid form data", async () => {
    const handleSubmit = vi.fn();
    render(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={handleSubmit}
        onCancel={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/employee name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/employee email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/employee mobile number/i), {
      target: { value: "9876543210" },
    });

    // Select country
    const countrySelect = screen.getByLabelText(/country/i);
    fireEvent.mouseDown(countrySelect);
    const countryOption = await screen.findByRole("option", { name: "India" });
    fireEvent.click(countryOption);

    fireEvent.change(screen.getByLabelText(/employee state/i), {
      target: { value: "Maharashtra" },
    });
    fireEvent.change(screen.getByLabelText(/employee district/i), {
      target: { value: "Pune" },
    });

    const submitBtn = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john@example.com",
          mobile: "9876543210",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        }),
        expect.anything()
      );
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    const handleCancel = vi.fn();
    render(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={vi.fn()}
        onCancel={handleCancel}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("pre-populates form fields when defaultValues is provided in edit mode", async () => {
    const defaultEmployee = {
      name: "Existing Employee",
      email: "existing@test.com",
      mobile: "1234567890",
      country: "India",
      state: "State1",
      district: "District1",
    };

    render(
      <EmployeeForm
        isEdit
        countries={mockCountries}
        defaultValues={defaultEmployee}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /update employee/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/employee name/i)).toHaveValue("Existing Employee");
    expect(screen.getByLabelText(/employee email/i)).toHaveValue("existing@test.com");
    expect(screen.getByLabelText(/employee mobile number/i)).toHaveValue("1234567890");
    expect(screen.getByLabelText(/employee state/i)).toHaveValue("State1");
    expect(screen.getByLabelText(/employee district/i)).toHaveValue("District1");
  });

  it("does not reset user inputs when parent re-renders without defaultValues", () => {
    const { rerender } = render(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    // User types into the form
    const nameInput = screen.getByLabelText(/employee name/i);
    const emailInput = screen.getByLabelText(/employee email/i);
    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });

    expect(nameInput).toHaveValue("Jane Smith");
    expect(emailInput).toHaveValue("jane@example.com");

    // Parent re-renders (simulating parent state updates without passing defaultValues)
    rerender(
      <EmployeeForm
        countries={mockCountries}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isCountriesLoading={false}
      />
    );

    // Form inputs must retain their values and not be wiped/reset
    expect(nameInput).toHaveValue("Jane Smith");
    expect(emailInput).toHaveValue("jane@example.com");
  });
});
