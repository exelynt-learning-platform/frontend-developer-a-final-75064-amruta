import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EmployeeListPage from "../pages/EmployeeList/EmployeeListPage";
import AddEmployeePage from "../pages/AddEmployee/AddEmployeePage";
import EditEmployeePage from "../pages/EditEmployee/EditEmployeePage";

import MainLayout from "../components/layout/MainLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />

          <Route path="/employees" element={<EmployeeListPage />} />

          <Route path="/employees/add" element={<AddEmployeePage />} />

          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />

          <Route path="*" element={<Navigate to="/employees" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;
