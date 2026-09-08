import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddEmployeePage from "../../pages/AddEmployee/AddEmployeePage";

const mockCreateEmployee = vi.fn();
const mockUseCreateEmployeeMutation = vi.fn(() => [
  mockCreateEmployee,
  { isLoading: false, isError: false },
]);

const mockUseGetCountriesQuery = vi.fn();

vi.mock("../../features/employees/employeeApi", () => ({
  useCreateEmployeeMutation: () => mockUseCreateEmployeeMutation(),
}));

vi.mock("../../features/countries/countryApi", () => ({
  useGetCountriesQuery: () => mockUseGetCountriesQuery(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AddEmployeePage", () => {
  const mockCountries = [{ id: "1", country: "India" }];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetCountriesQuery.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    });
    mockCreateEmployee.mockReturnValue({
      unwrap: () => Promise.resolve({ id: "10", name: "New Employee" }),
    });
  });

  it("renders Add Employee title and inputs", () => {
    render(
      <MemoryRouter>
        <AddEmployeePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Add Employee" })).toBeInTheDocument();
    expect(screen.getByLabelText(/employee name/i)).toBeInTheDocument();
  });

  it("submits valid employee and navigates to employee list", async () => {
    render(
      <MemoryRouter>
        <AddEmployeePage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/employee name/i), {
      target: { value: "New Employee" },
    });
    fireEvent.change(screen.getByLabelText(/employee email/i), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/employee mobile number/i), {
      target: { value: "9876543210" },
    });

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

    fireEvent.click(screen.getByRole("button", { name: /add employee/i }));

    await waitFor(() => {
      expect(mockCreateEmployee).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  it("navigates back to /employees on cancel", () => {
    render(
      <MemoryRouter>
        <AddEmployeePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });
});
