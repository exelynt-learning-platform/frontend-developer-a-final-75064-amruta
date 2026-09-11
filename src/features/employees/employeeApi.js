import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstants";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    // =========================================================
    // GET ALL EMPLOYEES
    // =========================================================
    getEmployees: builder.query({
      query: () => "employee",

      providesTags: (result) =>
        result
          ? [
              // Individual employee tags
              ...result.map((employee) => ({
                type: "Employee",
                id: employee.id,
              })),

              // Tag for the complete list
              {
                type: "Employee",
                id: "LIST",
              },
            ]
          : [
              {
                type: "Employee",
                id: "LIST",
              },
            ],
    }),

    // =========================================================
    // GET EMPLOYEE BY ID
    // =========================================================
    getEmployeeById: builder.query({
      query: (id) => `employee/${id}`,

      // mockapi.io returns an empty array [] for non-existent IDs instead of 404.
      // If the response is an empty array or empty result, normalize it to null
      // so consumers can accurately detect the 'not found' condition.
      transformResponse: (response) => {
        if (Array.isArray(response)) {
          return response.length > 0 ? response[0] : null;
        }
        if (!response || (typeof response === "object" && Object.keys(response).length === 0)) {
          return null;
        }
        return response;
      },

      providesTags: (result, error, id) => [
        {
          type: "Employee",
          id,
        },
      ],
    }),

    // =========================================================
    // CREATE EMPLOYEE
    // =========================================================
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: "employee",
        method: "POST",
        body: employee,
      }),

      // Refresh employee list after creating
      invalidatesTags: [
        {
          type: "Employee",
          id: "LIST",
        },
      ],
    }),

    // =========================================================
    // UPDATE EMPLOYEE
    // =========================================================
    updateEmployee: builder.mutation({
      query: ({ id, employee }) => ({
        url: `employee/${id}`,
        method: "PUT",
        body: employee,
      }),

      // Refresh both individual employee and employee list
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Employee",
          id,
        },
        {
          type: "Employee",
          id: "LIST",
        },
      ],
    }),

    // =========================================================
    // DELETE EMPLOYEE
    // =========================================================
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),

      // Refresh employee list after deletion
      invalidatesTags: (result, error, id) => [
        {
          type: "Employee",
          id,
        },
        {
          type: "Employee",
          id: "LIST",
        },
      ],
    }),
  }),
});

// =============================================================
// GENERATED HOOKS
// =============================================================

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
