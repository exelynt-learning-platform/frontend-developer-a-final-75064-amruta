import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EditEmployeePage from "../../pages/EditEmployee/EditEmployeePage";

const mockUseGetEmployeeByIdQuery = vi.fn();
const mockUpdateEmployee = vi.fn();
const mockUseUpdateEmployeeMutation = vi.fn(() => [
  mockUpdateEmployee,
  { isLoading: false, isError: false },
]);
const mockUseGetCountriesQuery = vi.fn();

vi.mock("../../features/employees/employeeApi", () => ({
  useGetEmployeeByIdQuery: (id, opts) => mockUseGetEmployeeByIdQuery(id, opts),
  useUpdateEmployeeMutation: () => mockUseUpdateEmployeeMutation(),
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

describe("EditEmployeePage", () => {
  const mockEmployee = {
    id: "5",
    name: "John Smith",
    email: "john@smith.com",
    mobile: "9876543210",
    country: "Canada",
    state: "Ontario",
    district: "Toronto",
  };

  const mockCountries = [{ id: "1", country: "Canada" }];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetCountriesQuery.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      isError: false,
    });
    mockUpdateEmployee.mockReturnValue({
      unwrap: () => Promise.resolve({ success: true }),
    });
  });

  const renderWithRoute = () =>
    render(
      <MemoryRouter initialEntries={["/employees/edit/5"]}>
        <Routes>
          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading spinner while employee data is being fetched", () => {
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithRoute();
    expect(screen.getByText(/loading employee #5.../i)).toBeInTheDocument();
  });

  it("renders error state when employee data fails to load", () => {
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 404 },
    });

    renderWithRoute();
    expect(screen.getByText("Employee Not Found")).toBeInTheDocument();
  });

  it("pre-populates form with employee data and updates successfully", async () => {
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: mockEmployee,
      isLoading: false,
      isError: false,
    });

    renderWithRoute();

    expect(screen.getByRole("heading", { name: /edit employee #5/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/employee name/i)).toHaveValue("John Smith");
    expect(screen.getByLabelText(/employee email/i)).toHaveValue("john@smith.com");

    // Modify name
    fireEvent.change(screen.getByLabelText(/employee name/i), {
      target: { value: "Johnathan Smith" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update employee/i }));

    await waitFor(() => {
      expect(mockUpdateEmployee).toHaveBeenCalledWith({
        id: "5",
        employee: expect.objectContaining({
          name: "Johnathan Smith",
          email: "john@smith.com",
        }),
      });
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  it("navigates back to /employees on cancel click", () => {
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: mockEmployee,
      isLoading: false,
      isError: false,
    });

    renderWithRoute();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/employees");
  });
});
