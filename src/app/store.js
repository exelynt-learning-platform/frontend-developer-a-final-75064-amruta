import { configureStore } from "@reduxjs/toolkit";

import { employeeApi } from "../features/employees/employeeApi";
import { countryApi } from "../features/countries/countryApi";
import countryUiReducer from "../features/countries/countrySlice";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    countryUi: countryUiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeApi.middleware,
      countryApi.middleware,
    ),
});
