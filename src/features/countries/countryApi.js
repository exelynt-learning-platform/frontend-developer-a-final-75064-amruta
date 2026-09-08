import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstants";

export const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "country",
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
