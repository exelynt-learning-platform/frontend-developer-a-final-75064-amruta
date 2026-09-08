import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeListPage from "../../pages/EmployeeList/EmployeeListPage";

// Mock the API hooks
const mockUseGetEmployeesQuery = vi.fn();
const mockUseGetEmployeeByIdQuery = vi.fn();
const mockDeleteEmployee = vi.fn();
const mockUseDeleteEmployeeMutation = vi.fn(() => [mockDeleteEmployee, { isLoading: false }]);

vi.mock("../../features/employees/employeeApi", () => ({
  useGetEmployeesQuery: () => mockUseGetEmployeesQuery(),
  useGetEmployeeByIdQuery: (id, options) => mockUseGetEmployeeByIdQuery(id, options),
  useDeleteEmployeeMutation: () => mockUseDeleteEmployeeMutation(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("EmployeeListPage", () => {
  const sampleEmployees = [
    {
      id: "1",
      name: "Amruta Musmade",
      email: "amruta@example.com",
      mobile: "9876543210",
      country: "India",
      state: "Maharashtra",
      district: "Pune",
    },
    {
      id: "2",
      name: "Rita Sharma",
      emailId: "rita@example.com",
      mobile: "9123456789",
      country: "India",
      state: "Maharashtra",
      district: "Mumbai",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteEmployee.mockReturnValue({
      unwrap: () => Promise.resolve({ success: true }),
    });
  });

  it("renders loading spinner while employees are loading", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading employees.../i)).toBeInTheDocument();
  });

  it("renders error state when fetching employees fails", () => {
    const refetchMock = vi.fn();
    mockUseGetEmployeesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 500 },
      refetch: refetchMock,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to Load Employees")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it("renders employee list table when data is loaded", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText("Amruta Musmade")).toBeInTheDocument();
    expect(screen.getByText("Rita Sharma")).toBeInTheDocument();
  });

  it("navigates to edit page when edit button is clicked", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    const editBtn = screen.getByRole("button", { name: /edit employee 1/i });
    fireEvent.click(editBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/edit/1");
  });

  it("opens confirmation dialog before deleting and calls delete mutation on confirm", async () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    // Click delete button on row 1
    const deleteBtn = screen.getByRole("button", { name: /delete employee 1/i });
    fireEvent.click(deleteBtn);

    // Confirm dialog should now be open
    expect(screen.getByText(/are you sure you want to delete employee #1\?/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmBtn = screen.getByRole("button", { name: /^delete$/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockDeleteEmployee).toHaveBeenCalledWith("1");
    });
  });

  it("cancels deletion when cancel is clicked in confirm dialog", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    // Click delete button
    fireEvent.click(screen.getByRole("button", { name: /delete employee 1/i }));
    expect(screen.getByText(/are you sure you want to delete employee #1\?/i)).toBeInTheDocument();

    // Click cancel in dialog
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockDeleteEmployee).not.toHaveBeenCalled();
    expect(screen.queryByText(/are you sure you want to delete employee #1\?/i)).not.toBeInTheDocument();
  });

  it("shows not found message when searching for an employee ID that does not exist", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 404 },
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    // Enter search ID
    const searchInput = screen.getByLabelText(/search employee by id/i);
    fireEvent.change(searchInput, { target: { value: "999" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText("No Employee Found")).toBeInTheDocument();
    expect(
      screen.getByText(/employee with id "999" was not found/i)
    ).toBeInTheDocument();
  });

  it("displays single employee when searched by ID successfully", () => {
    mockUseGetEmployeesQuery.mockReturnValue({
      data: sampleEmployees,
      isLoading: false,
      isError: false,
    });
    mockUseGetEmployeeByIdQuery.mockReturnValue({
      data: sampleEmployees[0],
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <EmployeeListPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/search employee by id/i);
    fireEvent.change(searchInput, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText("Amruta Musmade")).toBeInTheDocument();
    expect(screen.queryByText("Rita Sharma")).not.toBeInTheDocument();
  });
});
