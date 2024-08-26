import { Button } from "@/components/ui/common/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card/card";
import jobDescriptions from "@/util/mock/job-description";
import { useNavigate } from "react-router-dom";

const Job = () => {

  const navigate = useNavigate();

  const onApply = (jobId) => {
    navigate(`/jobs/applicationForm/personal-info/${jobId}`);
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-6 ">
          <CardHeader className="">
            <CardTitle>{jobDescriptions[0].jobTitle}</CardTitle>
            {/* <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription> */}
            <CardDescription className="py-2">
              <div className="flex flex-row justify-between h-full">
                {/* START :: Left of CardDescription */}
                <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:space-x-4 items-start basis-3/4 ">
                  <div>{jobDescriptions[0].location}</div>
                  <div>{jobDescriptions[0].workArrangement}</div>
                  <div>{jobDescriptions[0].employmentType}</div>
                </div>
                {/* END :: Left of CardDescription */}

                {/* START :: Right of CardDescription */}
                <div className="flex basis-1/4 justify-end">
                  <Button onClick={() => onApply(jobDescriptions[0].jobId)} className="w-full max-w-60">Apply Now</Button>
                </div>
                {/* END :: Right of CardDescription */}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {/* START Job Description */}
            <div className="text-base px-6 flex flex-col gap-4">
              <h3 className=" text-center my-2">Job Description</h3>
              {/* Summary */}
              <div>
                <p className="font-bold">Summary : </p>
                <p className="py-4">
                  {jobDescriptions[0].jobDescription.summary}
                </p>
              </div>

              <div>
                <p className="font-bold ">Job Responsibilities : </p>
                <div className="py-4 ">
                  <ul className="list-disc list-inside">
                    {jobDescriptions[0].jobDescription.responsibilities.map(
                      (responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <p className="font-bold ">Qualifications : </p>
                <div className="py-4 ">
                  <ul className="list-disc list-inside">
                    {jobDescriptions[0].jobDescription.qualifications.skills.map(
                      (qualification, index) => (
                        <li key={index}>{qualification}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* END Job Description */}
          </CardContent>
          {/* <CardFooter className="">
            <div className="flex w-full flex-row gap-2 py-4 justify-center items-center">
                <p className="text-center">Job Info</p>
                <div className="py-2 w-1/2 flex flex-col gap-1 justify-evenly">
                    <div className="">
                        
                    </div>
                    <div></div>
                </div>
            </div>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default Job;
