import { Button } from "@/components/ui/common/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card/card";
import { Checkbox } from "@/components/ui/common/checkbox/checkbox";
import CustomInput from "@/components/ui/common/customInput";
import { DatePicker } from "@/components/ui/common/datepicker";
import { DatePickerWithRange } from "@/components/ui/common/dateRangePicker";
import { Label } from "@/components/ui/common/label/label";
import { Separator } from "@/components/ui/common/seperator/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteWorkExperience,
  setWorkExperience,
  updateWorkExperience,
} from "@/store/local/workExperienceInfo";
import {
  calculateDuration,
  calculateDurationFromStartDate,
  formatDate,
} from "@/util/date/date";
import { validateNames } from "@/util/validation/validators";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AdditionalInfo = () => {
  const [experienceData, setExperienceData] = useState({
    companyName: {
      value: "",
      error: "",
    },
    jobTitle: {
      value: "",
      error: "",
    },
    responsibilities: {
      value: "",
      error: "",
    },
    duration: {
      value: "",
      error: "",
    },
    startDate: {
      value: "",
      error: "",
    },
    endDate: {
      value: "",
      error: "",
    },
    currentlyWorking: {
      value: false,
    },
  });

  const [editIndex, setEditIndex] = useState(null);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const experienceList = useSelector((state) => state.workExperienceInfo);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { jobId } = useParams();

  const today = new Date();

  // #region reset
  const resetExperienceData = () => {
    setExperienceData({
      companyName: {
        value: "",
        error: "",
      },
      jobTitle: {
        value: "",
        error: "",
      },
      responsibilities: {
        value: "",
        error: "",
      },
      duration: {
        value: "",
        error: "",
      },
      currentlyWorking: {
        value: false,
      },
    });
    setEditIndex(null);
  };

  useEffect(() => {
    if (experienceData) {
      console.log("experienceData :" + JSON.stringify(experienceData));
    }
  }, [experienceData]);

  // #region useEffects
  useEffect(() => {
    if (editIndex !== null) {
      const selectedData = experienceList[editIndex] || {};
      setExperienceData((prevData) => ({
        ...prevData,
        companyName: {
          value: selectedData?.companyName || "",
          error: prevData?.companyName?.error,
        },
        jobTitle: {
          value: selectedData?.jobTitle || "",
          error: prevData?.jobTitle?.error,
        },
        responsibilities: {
          value: selectedData?.responsibilities || "",
          error: prevData?.responsibilities?.error,
        },
        duration: {
          value: selectedData?.duration || "",
          error: prevData?.duration?.error,
        },
        startDate: {
          value: selectedData?.startDate || "",
          error: prevData?.startDate?.error,
        },
        endDate: {
          value: selectedData?.endDate || "",
          error: prevData?.endDate?.error,
        },
        currentlyWorking: {
          value: selectedData?.currentlyWorking || false,
        },
      }));
    }
  }, [editIndex, experienceList]);


  //   useEffect(() => {
  //     if (currentlyWorking && experienceData?.startDate?.value) {
  //       const durationValue = calculateDurationFromStartDate(
  //         experienceData?.startDate?.value
  //       );
  //       setExperienceData((prevData) => ({
  //         ...prevData,
  //         duration: {
  //           value: durationValue,
  //           error: "",
  //         },
  //       }));
  //       console.log("experienceData :" + JSON.stringify(experienceData));
  //     } else {
  //       const durationValue = calculateDuration(
  //         experienceData?.startDate?.value,
  //         experienceData?.endDate?.value
  //       );
  //       setExperienceData((prevData) => ({
  //         ...prevData,
  //         duration: {
  //           value: durationValue,
  //           error: "",
  //         },
  //       }));
  //     }

  //   }, [experienceData?.startDate?.value, experienceData?.endDate?.value,currentlyWorking]);

  //#region handler functions
  const handleChange = (event) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [event?.target?.name]: {
        value: event?.target?.value,
        error: "",
      },
    }));
  };

  //   const handleDateRangeSelect = (date) => {
  //     console.log("Selected date range:", date);
  //     setExperienceData((prevData) => ({
  //       ...prevData,
  //       startDate: {
  //         value: date.from,
  //         error: "",
  //       },
  //       endDate: {
  //         value: date.to,
  //         error: "",
  //       },
  //     }));
  //   };

  //   const handleDateSelect = (date) => {
  //     console.log("Selected date :", date);
  //     setExperienceData((prevData) => ({
  //       ...prevData,
  //       startDate: {
  //         value: date,
  //         error: "",
  //       },
  //     }));
  //   };

  const handleDateSelect = (date) => {
    // if (currentlyWorking) {
    if (experienceData?.currentlyWorking?.value) {
      //   console.log("from : " + date);
      //   const durationValue = calculateDurationFromStartDate(
      //     experienceData?.startDate?.value
      //   );

      const durationValue = calculateDurationFromStartDate(date);

      setExperienceData((prevData) => ({
        ...prevData,
        duration: {
          value: durationValue,
          error: "",
        },
        startDate: {
          value: date,
          error: "",
        },
      }));
    } else {
      //   console.log("from : " + date.from + "to : " + date.to);
      //   const durationValue = calculateDuration(
      //     experienceData?.startDate?.value,
      //     experienceData?.endDate?.value
      //   );

      const durationValue = calculateDuration(date?.from, date?.to);

      console.log("durationValue :" + durationValue);

      setExperienceData((prevData) => ({
        ...prevData,
        duration: {
          value: durationValue,
          error: "",
        },
        startDate: {
          value: date?.from,
          error: "",
        },
        endDate: {
          value: date?.to,
          error: "",
        },
      }));
    }
  };

  //use value for Checkbox
  const handleCheckboxChange = (value) => {
    // setCurrentlyWorking(event.target.checked);
    // console.log("event.target.checked :"+event.target.checked)
    console.log("value :" + value);
    setCurrentlyWorking(value);

    const durationValue = calculateDurationFromStartDate(
      experienceData?.startDate?.value
    );

    if (value) {
      setExperienceData((prevData) => ({
        ...prevData,
        endDate: {
          value: "",
          error: "",
        },
        duration: {
          value: durationValue,
          error: "",
        },
        currentlyWorking: {
          value: value,
        },
      }));
    } else {
      setExperienceData((prevData) => ({
        ...prevData,
        currentlyWorking: {
          value: value,
        },
      }));
    }
  };

  const handleEdit = (index) => {
    console.log("index selected exp : " + index);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteWorkExperience(index));
  };

  // #region handleOnSubmit
  const handleOnAdd = (event) => {
    event.preventDefault();

    let isEmpty = false;
    let valid = true;
    let data = experienceData;

    if (experienceData?.companyName?.value?.trim() === "") {
      data = {
        ...data,
        companyName: {
          ...data.companyName,
          error: "Please enter the company name",
        },
      };
      valid = false;
      isEmpty = true;
    } else if (!validateNames(experienceData?.companyName?.value)) {
      console.log("!validate Board Uni :", experienceData?.companyName?.value);
      data = {
        ...data,
        companyName: {
          ...data.companyName,
          error: "Please enter valid company name",
        },
      };
      valid = false;
    }

    if (experienceData?.jobTitle?.value?.trim() === "") {
      data = {
        ...data,
        jobTitle: {
          ...data.jobTitle,
          error: "Please enter the job title",
        },
      };
      valid = false;
      isEmpty = true;
    } else if (!validateNames(experienceData?.jobTitle?.value)) {
      console.log("!validate Board Uni :", experienceData?.jobTitle?.value);
      data = {
        ...data,
        jobTitle: {
          ...data.jobTitle,
          error: "Please enter valid job title ",
        },
      };
      valid = false;
    }

    if (experienceData?.responsibilities?.value?.trim() === "") {
      data = {
        ...data,
        responsibilities: {
          ...data.responsibilities,
          error: "Please enter the responsibilities",
        },
      };
      valid = false;
      isEmpty = true;
    }

    if (
      experienceData?.responsibilities?.value?.trim().length < 10 ||
      experienceData?.responsibilities?.value?.trim().length > 500
    ) {
      data = {
        ...data,
        responsibilities: {
          ...data.responsibilities,
          error: "Responsibilities must be between 10 and 500 characters",
        },
      };
      valid = false;
    }

    if (experienceData?.duration?.value === "") {
      console.log(
        "experienceData?.duration?.value :" + experienceData?.duration?.value
      );
      data = {
        ...data,
        duration: {
          ...data.duration,
          error: "Please enter the duration or select employement period.",
        },
      };
      isEmpty = true;
      valid = false;
    }

    if (experienceData?.startDate?.value === "") {
      data = {
        ...data,
        startDate: {
          ...data.startDate,
          error: "Please select employement period.",
        },
      };
      isEmpty = true;
      valid = false;
    }

    // if (!currentlyWorking) {
    if (experienceData?.currentlyWorking?.value == false) {
      if (experienceData?.endDate?.value === "") {
        data = {
          ...data,
          endDate: {
            ...data.endDate,
            error: "Please select start date of your employement",
          },
        };
        isEmpty = true;
        valid = false;
      }

      if (experienceData?.startDate?.value === "") {
        data = {
          ...data,
          startDate: {
            ...data.startDate,
            error: "Please select end date of your employement",
          },
        };
        isEmpty = true;
        valid = false;
      }
    } else {
      if (experienceData?.startDate?.value === "") {
        data = {
          ...data,
          startDate: {
            ...data.startDate,
            error: "Please select end date of your employement",
          },
        };
        isEmpty = true;
        valid = false;
      }
    }

    //   TODO:: Proper Date validations

    setExperienceData(data);

    try {
      if (!isEmpty) {
        if (valid) {
          if (editIndex !== null) {
            const updateExperienceData = {
              companyName: experienceData.companyName.value,
              jobTitle: experienceData.jobTitle.value,
              responsibilities: experienceData.responsibilities.value,
              duration: experienceData.duration.value,
              startDate: experienceData.startDate.value,
              endDate: experienceData.endDate.value
                ? experienceData.endDate.value
                : "",
              currentlyWorking: experienceData.currentlyWorking.value,
            };

            console.log(
              "updateExperienceData :" + JSON.stringify(updateExperienceData)
            );
            dispatch(
              updateWorkExperience({
                index: editIndex,
                data: updateExperienceData,
              })
            );
            setEditIndex(null);
          } else {
            const data = {
              companyName: experienceData.companyName.value,
              jobTitle: experienceData.jobTitle.value,
              responsibilities: experienceData.responsibilities.value,
              duration: experienceData.duration.value,
              startDate: experienceData.startDate.value,
              endDate: experienceData.endDate.value
                ? experienceData.endDate.value
                : "",
              currentlyWorking: experienceData.currentlyWorking.value,
            };
            console.log("data :" + JSON.stringify(data));

            dispatch(setWorkExperience(data));
            toast({
              title: "Work experience added successfully.",
            });
          }

          resetExperienceData();
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please fill valid details.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please fill out required details.",
        });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleOnNext = () => {
    if (experienceList && experienceList?.length > 0) {
        toast({
            title: "Success",
            description: "Work experience added successfully.",
          });
        navigate(`/jobs/applicationForm/skills/${jobId}`);
    } else {
      toast({
        variant: "destructive",
        title: "Cannot proceed",
        description: "Please add at least one work experience entry.",
      });
    }
  };

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="text-left">Work Experience</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Please fill out your work experience details.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Separator className="" />
        <div className="p-6 ">
          <form className="grid w-full md:w-3/4 xl:w-3/5 items-start gap-6 overflow-auto p-4 pt-0">
            <label>
              <b className="text-red-600">*</b> Indicates required
            </label>
            <div className="grid gap-3">
              <CustomInput
                label="Company Name"
                placeholder="Company Name"
                name="companyName"
                value={experienceData.companyName.value}
                onChange={handleChange}
                error={experienceData.companyName.error}
                requiredSymbol
              />
            </div>

            <div className="grid gap-3">
              <CustomInput
                label="Job Title"
                placeholder="Job Title"
                name="jobTitle"
                value={experienceData.jobTitle.value}
                onChange={handleChange}
                error={experienceData.jobTitle.error}
                requiredSymbol
              />
            </div>

            <div className="grid gap-3">
              <CustomInput
                label="Responsibilities"
                placeholder="Responsibilities"
                name="responsibilities"
                value={experienceData.responsibilities.value}
                onChange={handleChange}
                error={experienceData.responsibilities.error}
                description="Please specify short description of your role"
                textArea
                requiredSymbol
              />
            </div>
            <div className="grid gap-3">
              <CustomInput
                label="Duration"
                placeholder="Duration"
                name="duration"
                value={
                //   currentlyWorking
                experienceData?.currentlyWorking?.value
                    ? calculateDurationFromStartDate(
                        experienceData?.startDate?.value
                      )
                    : calculateDuration(
                        experienceData?.startDate?.value,
                        experienceData?.endDate?.value
                      )
                }
                onChange={handleChange}
                error={experienceData.duration.error}
                description="Please select employement period or enter in format 0 years 5 months"
                requiredSymbol
              />
            </div>
            <div className="grid gap-3">
              <Label
                className={`text-base ${
                  (experienceData?.startDate?.error ||
                    experienceData?.endDate?.error) &&
                  "text-red-500"
                }`}
              >
                Employement period <b className="text-red-500">*</b>
              </Label>

              {/* {currentlyWorking ? ( */}
              {experienceData?.currentlyWorking?.value ? (

                <DatePicker
                  className="w-full"
                  selectedDate={experienceData?.startDate?.value}
                  onSelect={handleDateSelect}
                />
              ) : (
                <DatePickerWithRange
                  className="w-full"
                  selectedDate={{
                    from: experienceData?.startDate?.value,
                    to: experienceData?.endDate?.value,
                  }}
                  onSelect={handleDateSelect}
                  defaultNumberOfMonths={2}
                />
              )}

              {(experienceData?.startDate?.error ||
                experienceData?.endDate?.error) && (
                <div className="text-red-500 text-sm py-1">
                  {experienceData?.startDate?.error ||
                    experienceData?.endDate?.error}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="currently-working"
                  checked={experienceData?.currentlyWorking?.value}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="currently-working"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Currencty working
                </label>
              </div>
            </div>

            <div className="w-full flex flex-row gap-2 justify-end items-center">
              {/* <Button className="w-40" variant="outline">
                Previous
              </Button> */}
              <Button className="w-40" onClick={handleOnAdd}>
                {editIndex !== null ? "Update" : "Add"} Experience
              </Button>
            </div>
          </form>

          <Separator />
          {/* Workexperience List */}
          <div className="mt-6 p-6">
            <h3 className="text-lg font-medium my-3">Work experience List</h3>

            {experienceList && experienceList.length > 0 ? (
              <>
                <ul>
                  {experienceList.map((experience, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b py-6"
                    >
                      <div className="flex flex-row basis-11/12 gap-5 justify-between">
                        <div className="flex flex-col basis-[30%] gap-2">
                          <div>
                            <Label className="text-base">Company Name</Label>
                          </div>
                          <div className="text-sm">
                            {experience.companyName}
                          </div>
                        </div>
                        {/* <div className="flex flex-col">
                          <div>
                            <Label className="text-base">
                              School/Institute
                            </Label>
                          </div>
                          <div>{experience.schoolInstitute}</div>
                        </div> */}
                        {/* <Separator orientation="vertical"/> */}
                        <div className="flex flex-col basis-[30%] gap-2">
                          <div>
                            <Label className="text-base">Job Title</Label>
                          </div>
                          <div className="text-sm">{experience.jobTitle}</div>{" "}
                        </div>
                        <div className="flex flex-col  basis-[10%] gap-2">
                          <div>
                            <Label className="text-base">
                              Responsibilities
                            </Label>
                          </div>
                          <div className="text-sm">
                            {experience.responsibilities}
                          </div>
                        </div>
                        <div className="flex flex-col  basis-[30%] gap-2">
                          <div>
                            <Label className="text-base">Duration</Label>
                          </div>
                          <div className="text-sm">{experience.duration}</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-5 basis-1/12">
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(index)}
                        >
                          <TrashIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(index)}
                        >
                          <Pencil1Icon />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <Label className="text-base">No data available</Label>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row gap-5 justify-end items-center">
          <Button className="w-40" variant="secondary">
            Previous
          </Button>
          <Button className="w-40" onClick={handleOnNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
