import jobDescriptions from "@/util/mock/job-description";
import { Button } from "../common/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../common/card/card";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Progress } from "../common/progress/progress";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const steps = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "Addional Info",
  "Review & Submit",
];

// const TimelineCard = ({ currentStep }) => {
//   const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <Card className="">
//       <CardHeader className="">
//         <CardTitle className="text-center">Job Application</CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="flex justify-evenly flex-row gap-2 items-center ">
//           {steps.map((step, index) => {
//             const isActive = index + 1 <= currentStep;
//             const isCompleted = index + 1 < currentStep;
//             const isVisible = index < steps.length - 1;
//             const stepClass = `${isActive ? "font-bold " : "text-gray-500"}`;

//             return (
//               <div
//                 key={index}
//                 className={`flex flex-row  ${isVisible ? "w-full" : "w-max"}  w-full gap-2 items-center`}
//               >
//                 <div
//                   className={`${stepClass} flex flex-col gap-3 items-center justify-center text-center ${
//                     isVisible ? "basis-2/5" : "md:min-w-48 "
//                   }`}
//                 >
//                   {step}
//                   <CheckCircledIcon />
//                 </div>
//                 {isVisible && (
//                   <div className=" w-full flex  items-center basis-3/5">
//                     <Progress value={progressValue} className="w-full h-2" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

const TimelineCard = ({ currentStep }) => {
  // const [progressData, setProgressData] = useState({
  //   personalInfoProgress: {
  //     value: "",
  //     error: "",
  //   },
  //   educationProgress: {
  //     value: "",
  //     error: "",
  //   },
  //   experienceProgress: {
  //     value: "",
  //     error: "",
  //   },
  //   reviewProgress: {
  //     value: "",
  //     error: "",
  //   },
  // });

  const [localCurrentStep, setLocalCurrentStep] = useState(0);

  const { stepProgress } = useSelector((state) => state.stepProgress);

  // const resetProgressData = () => {
  //   setProgressData({
  //     personalInfoProgress: {
  //       value: "",
  //       error: "",
  //     },
  //     educationProgress: {
  //       value: "",
  //       error: "",
  //     },
  //     experienceProgress: {
  //       value: "",
  //       error: "",
  //     },
  //     reviewProgress: {
  //       value: "",
  //       error: "",
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (progress === null || progress === undefined) {
  //     resetProgressData();
  //   } else {
  //     setProgressData({
  //       personalInfoProgress: {
  //         value: progress.personalInfoProgress,
  //         error: "",
  //       },
  //       educationProgress: {
  //         value: progress.educationProgress,
  //         error: "",
  //       },
  //       experienceProgress: {
  //         value: progress.experienceProgress,
  //         error: "",
  //       },
  //       reviewProgress: { value: progress.reviewProgress, error: "" },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    console.log("currentStep : " + currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.log("timeline : " + stepProgress);
    if (stepProgress === null || stepProgress === undefined) {
      setLocalCurrentStep(0);
    } else {
      console.log("stepProgress.currentStep :" + stepProgress.currentStep);
      setLocalCurrentStep(stepProgress.currentStep);
    }
  }, [stepProgress]);

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="text-center">Job Application</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-evenly flex-row gap-2 items-center">
          {/* Personal Info Step */}
          <div className={`flex flex-row w-full gap-2 items-center`}>
            <div
              className={`${
                currentStep >= 0 ? "font-bold " : "text-gray-500"
              } flex flex-col gap-3 items-center justify-center text-center basis-2/5`}
            >
              {steps[0]}
              <CheckCircledIcon />
            </div>

            <div className=" w-full flex  items-center basis-3/5">
              <Progress
                // value={progressData.personalInfoProgress}
                value={currentStep >= 1 ? 100 : 0}
                className="w-full h-2"
              />
            </div>
          </div>

          {/* Education Step */}
          <div className={`flex flex-row w-full gap-2 items-center`}>
            <div
              className={`${
                currentStep >= 1 ? "font-bold " : "text-gray-500 "
              } flex flex-col gap-3 items-center justify-center text-center basis-2/5`}
            >
              {steps[1]}
              <CheckCircledIcon />
            </div>

            <div className=" w-full flex  items-center basis-3/5">
              <Progress
                // value={progressData.educationProgress}
                value={currentStep >= 2 ? 100 : 0}
                className="w-full h-2"
              />
            </div>
          </div>

          {/* Experience Step */}
          <div className={`flex flex-row w-full gap-2 items-center`}>
            <div
              className={` ${
                currentStep >= 2 ? "font-bold " : "text-gray-500 "
              } flex flex-col gap-3 items-center justify-center text-center basis-2/5`}
            >
              {steps[2]}
              <CheckCircledIcon />
            </div>

            <div className=" w-full flex  items-center basis-3/5">
              <Progress
                // value={progressData.experienceProgress}
                value={currentStep >= 3 ? 100 : 0}
                className="w-full h-2"
              />
            </div>
          </div>

          {/* Skills Step */}
          <div className={`flex flex-row w-full gap-2 items-center`}>
            <div
              className={` ${
                currentStep >= 3 ? "font-bold " : "text-gray-500 "
              } flex flex-col gap-3 items-center justify-center text-center basis-2/5`}
            >
              {steps[3]}
              <CheckCircledIcon />
            </div>

            <div className=" w-full flex  items-center basis-3/5">
              <Progress
                // value={progressData.experienceProgress}
                value={currentStep >= 4 ? 100 : 0}
                className="w-full h-2"
              />
            </div>
          </div>

          {/* Additional info Step */}
          <div className={`flex flex-row w-full gap-2 items-center`}>
            <div
              className={` ${
                currentStep >= 4 ? "font-bold " : "text-gray-500 "
              } flex flex-col gap-3 items-center justify-center text-center basis-2/5`}
            >
              {steps[4]}
              <CheckCircledIcon />
            </div>

            <div className=" w-full flex  items-center basis-3/5">
              <Progress
                // value={progressData.experienceProgress}
                value={currentStep >= 5 ? 100 : 0}
                className="w-full h-2"
              />
            </div>
          </div>

          {/* Review & Submit Step */}
          <div className={`flex flex-row w-max gap-2 items-center`}>
            <div
              className={`${
                currentStep >= 5 ? "font-bold " : "text-gray-500"
              } flex flex-col gap-3 items-center justify-center text-center md:min-w-48 `}
            >
              {steps[5]}
              <CheckCircledIcon />
            </div>
            {/* {isVisible && (
              <div className=" w-full flex  items-center basis-3/5">
                <Progress value={progressValue} className="w-full h-2" />
              </div>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
