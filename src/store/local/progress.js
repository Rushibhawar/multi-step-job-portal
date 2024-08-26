import { createSlice } from "@reduxjs/toolkit";

const stepProgressSlice = createSlice({
  name: "stepProgress",
  initialState: {
    personalInfoProgress: 0,
    educationProgress: 0,
    experienceProgress: 0,
    reviewProgress: 0,
    currentStep: 0,
  },
  reducers: {
    setPersonalInfoProgress: (state, action) => {
      state.personalInfoProgress = action.payload;
    },
    setEducationProgress: (state, action) => {
      state.educationProgress = action.payload;
    },
    setExperienceProgress: (state, action) => {
      state.experienceProgress = action.payload;
    },
    setReviewProgress: (state, action) => {
      state.reviewProgress = action.payload;
    },
    setCurrentStep: (state, action) => {
        state.currentStep = action.payload;
      },
    resetProgress: (state) => {
      state.personalInfoProgress = 0;
      state.educationProgress = 0;
      state.experienceProgress = 0;
      state.reviewProgress = 0;
      state.currentStep = 0;
    },
  },
});

export const {
  setPersonalInfoProgress,
  setEducationProgress,
  setExperienceProgress,
  setReviewProgress,
  setCurrentStep,
  resetProgress,
} = stepProgressSlice.actions;
export default stepProgressSlice.reducer;
