import { createSlice } from "@reduxjs/toolkit";

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  },
  reducers: {
    setPersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: (state) => {
      return {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
      };
    },
  },
});

export const { setPersonalInfo, resetPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
