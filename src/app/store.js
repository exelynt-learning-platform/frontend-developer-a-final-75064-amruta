import { configureStore } from "@reduxjs/toolkit";

import { employeeApi } from "../features/employees/employeeApi";
import { countryApi } from "../features/countries/countryApi";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeApi.middleware,
      countryApi.middleware,
    ),
});
