import { createSlice } from "@reduxjs/toolkit";

const skillsAndQualificationsSlice = createSlice({
  name: "skillsAndQualifications",
  initialState: {
    skills: [],
    certificates: [],
  },
  reducers: {
    setSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    setSkillWhole: (state, action) => {
      state.skills = action.payload;
    },
    updateSkill: (state, action) => {
      const { index, data } = action.payload;
      state.skills[index] = data;
    },
    deleteSkill: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    resetSkills: (state) => {
      state.skills = [];
    },
    setCertificate: (state, action) => {
      state.certificates.push(action.payload);
    },
    updateCertificate: (state, action) => {
      const { index, data } = action.payload;
      state.certificates[index] = data;
    },
    deleteCertificate: (state, action) => {
      state.certificates.splice(action.payload, 1);
    },
    resetCertificates: (state) => {
      state.certificates = [];
    },
  },
});

export const {
  setSkill,
  setSkillWhole,
  updateSkill,
  deleteSkill,
  resetSkills,
  setCertificate,
  updateCertificate,
  deleteCertificate,
  resetCertificates,
} = skillsAndQualificationsSlice.actions;

export default skillsAndQualificationsSlice.reducer;
