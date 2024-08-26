import { createSlice } from "@reduxjs/toolkit";

const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    setEducation: (state, action) => {
      state.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, data } = action.payload;
      state[index] = data;
    },
    deleteEducation: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetEducation: () => {
      return [];
    },
  },
});

export const { setEducation, updateEducation, deleteEducation, resetEducation } = educationSlice.actions;
export default educationSlice.reducer;
