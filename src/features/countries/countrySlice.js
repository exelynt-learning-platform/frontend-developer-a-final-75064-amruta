import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: "",
  searchFilter: "",
};

export const countrySlice = createSlice({
  name: "countryUi",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    resetCountryState: () => initialState,
  },
});

export const { setSelectedCountry, setSearchFilter, resetCountryState } = countrySlice.actions;

export default countrySlice.reducer;
