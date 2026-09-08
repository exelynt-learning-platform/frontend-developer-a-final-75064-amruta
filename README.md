# Employee Management Application

A responsive, accessible, and robust Employee Management Application built with **React**, **Redux Toolkit (RTK Query)**, **Material-UI (MUI)**, **React Hook Form**, and **Yup**.

---

## Features

- **Employee Directory**:
  - View all employees in a clean, responsive table with Name, Email, Mobile, and Country.
  - Safe fallbacks for `email` / `emailId` mock schema differences.
- **Search by ID**:
  - Direct employee lookup by ID with keyboard (`Enter` key) support.
  - Clear, user-friendly empty state when an ID is not found.
  - One-click Clear button restoring the full directory.
- **Add Employee**:
  - Reusable presentation form with validation for required fields, email format, 10-digit mobile number, and field lengths.
  - Dynamic country dropdown populated directly from the Mock API.
- **Edit Employee**:
  - Pre-populated form loaded from the employee endpoint.
  - Reuses the shared `EmployeeForm` component with proper state synchronization.
- **Delete Confirmation**:
  - Accessible modal dialog requiring explicit confirmation before deleting an employee record.
  - Disables actions and displays loading status during API operations.
- **Robust UI States**:
  - Dedicated Dumb components for `LoadingSpinner`, `ErrorMessage` (with retry support), and `EmptyState`.
  - Action feedback with toast alerts.
- **State Management & Architecture**:
  - Strict Smart and Dumb component separation.
  - Redux Toolkit with RTK Query for automated caching, tag invalidation, and state synchronization.

---

## Tech Stack

- **Framework**: React 19, Vite
- **UI Library**: Material-UI (MUI v6/v7) & Emotion
- **State Management**: Redux Toolkit & RTK Query
- **Routing**: React Router v7
- **Forms & Validation**: React Hook Form & Yup
- **Testing**: Vitest, React Testing Library, jsdom, `@vitest/coverage-v8`
- **Linting**: Oxlint

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Run Unit Tests
```bash
npm test
```

### 4. Run Test Coverage
```bash
npm run test:coverage
```

### 5. Build for Production
```bash
npm run build
```

### 6. Run Linter
```bash
npm run lint
```
