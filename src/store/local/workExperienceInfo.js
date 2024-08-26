import { createSlice } from "@reduxjs/toolkit";

const workExperienceSlice  = createSlice({
  name: "workExperience",
  initialState: [],
  reducers: {
    setWorkExperience: (state, action) => {
      state.push(action.payload);
    },
    updateWorkExperience: (state, action) => {
      const { index, data } = action.payload;
      state[index] = data;
    },
    deleteWorkExperience: (state, action) => {
      state.splice(action.payload, 1);
    },
    resetWorkExperience: () => {
      return [];
    },
  },
});

export const { setWorkExperience, updateWorkExperience, deleteWorkExperience, resetWorkExperience } = workExperienceSlice.actions;
export default workExperienceSlice.reducer;
