import React from "react";
import TimelineCard from "@/components/ui/timeline";

const MultiStepFormWrapper = ({ children, currentStep }) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <TimelineCard currentStep={currentStep} />
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default MultiStepFormWrapper;
