import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PersonalInfo from "@/pages/app/user/jobApplication/personalInfo";
import Experience from "@/pages/app/user/jobApplication/experience";
import Education from "@/pages/app/user/jobApplication/education";
import Review from "@/pages/app/user/jobApplication/review";
import MultiStepFormWrapper from "@/pages/app/user/jobApplication";


const MultiStepFormRoutes = () => {
  const location = useLocation();

  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes("personal-info")) return 0;
    if (path.includes("education")) return 1;
    if (path.includes("experience")) return 2;
    if (path.includes("review")) return 3;
    return 0;
  };

  return (
    <MultiStepFormWrapper currentStep={getCurrentStep()}>
      <Routes>
        <Route path="personal-info/:jobId" element={<PersonalInfo />} />
        <Route path="education/:jobId" element={<Education />} />
        <Route path="experience/:jobId" element={<Experience />} />
        <Route path="review/:jobId" element={<Review />} />
      </Routes>
    </MultiStepFormWrapper>
  );
};

export default MultiStepFormRoutes;
