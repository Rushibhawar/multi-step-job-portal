import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/common/alertDialog";
import { Button } from "@/components/ui/common/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card/card";
import CustomInput from "@/components/ui/common/customInput";
import { DatePicker } from "@/components/ui/common/datepicker";
import { Label } from "@/components/ui/common/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/common/select/select";
import { Separator } from "@/components/ui/common/seperator/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteEducation,
  setEducation,
  updateEducation,
} from "@/store/local/educationalInfo";
import { formatDate } from "@/util/date/date";
import { validateCGPA, validateUsername } from "@/util/validation/validators";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// SSC - HSC min : 2 +
// HSC -Grad min : 3+
// Grad - PostGrad min: 2+
// SSc- Grad min: HSC + Grad=> 2+3= 5+
//

const educationType = [
  {
    type: "ssc",
    name: "SSC",
    minYears: 1,
  },
  {
    type: "hsc",
    name: "HSC",
    minYears: 2,
  },
  {
    type: "graduation",
    name: "Graduation",
    minYears: 3,
  },
  {
    type: "postGraduation",
    name: "Post Graduation",
    minYears: 3,
  },
];

// Minimum differences between degrees 
const degreeDifferences = {
  SSC: {
    HSC: 2,
    Graduation: 5,
    "Post Graduation": 7,
  },
  HSC: {
    SSC: 2,
    Graduation: 3,
    "Post Graduation": 5,
  },
  Graduation: {
    SSC: 5,
    HSC: 3,
    "Post Graduation": 2,
  },
  "Post Graduation": {
    SSC: 7,
    HSC: 5,
    Graduation: 2,
  },
};

// Function to get the minimum difference based on degrees
const getMinDifference = (fromDegree, toDegree) => {
  return degreeDifferences[fromDegree]?.[toDegree] || 0;
};

// Helper function to calculate the year difference between two dates
const calculateYearDifference = (date1, date2) => {
  const year1 = new Date(date1).getFullYear();
  const year2 = new Date(date2).getFullYear();
  return Math.abs(year1 - year2);
};

const Education = () => {
  const [educationData, setEducationData] = useState({
    degree: {
      value: "",
      error: "",
    },
    schoolInstitue: {
      value: "",
      error: "",
    },
    boardUniversity: {
      value: "",
      error: "",
    },
    cgpa: {
      value: "",
      error: "",
    },
    passingDate: {
      value: null,
      error: "",
    },
    startDate: {
      value: null,
      error: "",
    },
  });

  const [editIndex, setEditIndex] = useState(null);

  // const personalInfo = useSelector((state) => state.personalInfo);
  const educationList = useSelector((state) => state.educationalInfo);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { jobId } = useParams();

  // #region reset
  const resetEducationData = () => {
    setEducationData({
      degree: {
        value: "",
        error: "",
      },
      schoolInstitue: {
        value: "",
        error: "",
      },
      boardUniversity: {
        value: "",
        error: "",
      },
      cgpa: {
        value: "",
        error: "",
      },
      passingDate: {
        value: null,
        error: "",
      },
      startDate: {
        value: null,
        error: "",
      },
    });
    setEditIndex(null);
  };

  // #region useEffects
  // useEffect(() => {
  //   if (personalInfo === null || personalInfo === undefined) {
  //     resetEducationData();
  //   } else {
  //     setEducationData({
  //       firstName: { value: personalInfo.firstName, error: "" },
  //       lastName: { value: personalInfo.lastName, error: "" },
  //       phone: { value: personalInfo.phone, error: "" },
  //       email: { value: personalInfo.email, error: "" },
  //       address: { value: personalInfo.address, error: "" },
  //     });
  //   }
  // }, [personalInfo]);

  useEffect(() => {
    if (editIndex !== null) {
      const selectedData = educationList[editIndex] || {};
      setEducationData((prevData) => ({
        degree: {
          value: selectedData.degree || "",
          error: prevData.degree.error,
        },
        schoolInstitute: {
          value: selectedData.schoolInstitute || "",
          error: prevData?.schoolInstitute?.error,
        },
        boardUniversity: {
          value: selectedData.boardUniversity || "",
          error: prevData.boardUniversity.error,
        },
        cgpa: {
          value: selectedData.cgpa || "",
          error: prevData.cgpa.error,
        },
        passingDate: {
          value: selectedData.passingDate || null,
          error: prevData.passingDate.error,
        },
        startDate: {
          value: selectedData.startDate || null,
          error: prevData.startDate.error,
        },
      }));
    }
  }, [editIndex, educationList]);

  //#region handler functions
  const handleChange = (event) => {
    console.log("event.target.value : " + event.target.value);
    setEducationData((prevData) => ({
      ...prevData,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    }));
  };

  //   const handleChange = (input) => {
  //     let name, value;

  //     if (input.target) {
  //       // Handle event object
  //       name = input.target.name;
  //       value = input.target.value;
  //     } else {
  //       // Handle direct value (for DatePicker)
  //       name = input.name;
  //       value = input.value;
  //     }

  //     console.log("name:", name, "value:", value);

  //     setEducationData((prevData) => ({
  //       ...prevData,
  //       [name]: {
  //         value: value,
  //         error: "",
  //       },
  //     }));
  //   };

  const handleDegreeChange = (value) => {
    console.log("Selected value:", value);
    setEducationData((prevData) => ({
      ...prevData,
      degree: {
        value: value,
        error: "",
      },
      schoolInstitue: {
        value: value,
        error: "",
      },
    }));
  };

  const handleDateSelect = (date) => {
    console.log("date :" + date);
    setEducationData((prevData) => ({
      ...prevData,
      passingDate: {
        value: date,
        error: "",
      },
    }));
  };

  //   const handleDateSelect = (date, name) => {
  //     setEducationData((prevData) => ({
  //       ...prevData,
  //       [name]: { ...prevData[name], value: date }
  //     }));
  //   };

  const handleCGPAChange = (e) => {
    const { name, value } = e.target;
    console.log("cgpa : " + value);
    // Filter out invalid characters
    const filteredValue = value.replace(/[^0-9.]/g, "");

    // Validate the filtered value
    if (validateCGPA(filteredValue) || filteredValue === "") {
      setEducationData({
        ...educationData,
        [name]: {
          value: filteredValue,
          error: "",
        },
      });
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteEducation(index));
  };

  // #region handleOnSubmit
  const handleOnAdd = (event) => {
    console.log("handleOnAdd");
    event.preventDefault();

    let isEmpty = false;
    let valid = true;
    let data = educationData;

    if (educationData?.degree?.value?.trim() === "") {
      console.log(
        "educationData?.degree?.value : " + educationData?.degree?.value
      );

      data = {
        ...data,
        degree: {
          ...data.degree,
          error: "Please slect the degree",
        },
        schoolInstitue: {
          ...data.schoolInstitue,
          error: "Please slect the degree",
        },
      };

      valid = false;
      isEmpty = true;
    }

    if (educationData?.boardUniversity?.value?.trim() === "") {
      console.log(
        "educationData?.boardUniversity?.value : " +
          educationData?.boardUniversity?.value
      );

      data = {
        ...data,
        boardUniversity: {
          ...data.boardUniversity,
          error: "Please enter Board/University",
        },
      };

      valid = false;
      isEmpty = true;
    } else if (!validateUsername(educationData?.boardUniversity?.value)) {
      console.log(
        "!validate Board Uni :",
        educationData?.boardUniversity?.value
      );
      data = {
        ...data,
        boardUniversity: {
          ...data.boardUniversity,
          error: "Please enter validate Board/University",
        },
      };
      valid = false;
    } else if (
      !/[a-zA-Z][a-zA-Z0-9\s]*$/.test(educationData?.boardUniversity?.value)
    ) {
      data = {
        ...data,
        boardUniversity: {
          ...data.boardUniversity,
          error:
            "Board/University name should only contain alphanumeric and special characters",
        },
      };

      valid = false;
    }

    if (educationData?.cgpa?.value?.trim() === "") {
      console.log("educationData?.cgpa?.value : " + educationData?.cgpa?.value);

      data = {
        ...data,
        cgpa: {
          ...data.cgpa,
          error: "Please enter CGPA",
        },
      };
      isEmpty = true;
      valid = false;
    }

    if (educationData?.passingDate?.value === "") {
      console.log(
        "educationData?.passingDate?.value : " +
          educationData?.passingDate?.value
      );
      data = {
        ...data,
        passingDate: {
          ...data.passingDate,
          error: "Please select passing date ",
        },
      };
      isEmpty = true;
      valid = false;
    }

    //map overeducationInfo and first compare the current select degree and store degree if they are different
    // get the diiferenT between the min years of degrees
    // check if the mindiff is < than the actual minYear of selected

    // My solution as discussed in call
    // if (
    //   educationData?.passingDate?.value !== "" &&
    //   educationData?.degree?.value?.trim() !== "" &&
    //   educationList != null &&
    //   educationList != undefined &&
    //   educationList.length > 0
    // ) {
    //   console.log("min year validation");

    //   {
    //     educationList?.map((education, index) => {
    //       if (education?.degree == educationData?.degree?.value) {
    //         console.log("equal education");
    //       } else if (education?.degree != educationData?.degree?.value) {
    //         console.log("not equal education");

    //         if (education?.passingDate && educationData?.passingDate?.value) {
    //           console.log(
    //             "education?.passingDate : " +
    //               education?.passingDate +
    //               " , educationData?.passingDate?.value + " +
    //               educationData?.passingDate?.value
    //           );

    //           const existingYear = new Date(
    //             education.passingDate
    //           ).getFullYear();
    //           const currentYear = new Date(
    //             educationData.passingDate.value
    //           ).getFullYear();

    //           console.log("existingPassingYear :" + existingYear);
    //           console.log("currentPassingYear :" + currentYear);
    //           // The refined solution after call
    //           const diff = Math.abs(existingYear - currentYear);

    //           console.log("diff : " + diff);

    //           educationType.map((type, index) => {
    //             if (educationData?.degree?.value === type?.name) {
    //               console.log(" true equal ");
    //               if (diff < type?.minYears) {
    //                 console.log(" diff is less than minYear of selected ");

    //                 data = {
    //                   ...data,
    //                   passingDate: {
    //                     ...data.passingDate,
    //                     error:
    //                       "Please select valid passing date for selected degree ",
    //                   },
    //                 };
    //                 isEmpty = false;
    //                 valid = false;
    //               }
    //             }
    //           });
    //         }
    //       }
    //     });
    //   }
    // }


    // Optimized solution
    if (
      educationData?.passingDate?.value &&
      educationData?.degree?.value &&
      educationList.length > 0
    ) {
      const currentYear = new Date(
        educationData.passingDate.value
      ).getFullYear();
      const newDegree = educationData.degree.value;
      const newPassingDate = new Date(educationData.passingDate.value);

      // console.log("currently slected year :" + currentYear);
      // console.log("newDegree slected year :" + newDegree);

      // let valid = true;

      for (const education of educationList) {
        const existingDegree = education.degree;
        const existingYear = new Date(education.passingDate).getFullYear();
        const existingPassingDate = new Date(education.passingDate);

        // console.log("existingDegree  :" + existingDegree);
        // console.log("existing degree Year slected year :" + existingYear);

        if (existingDegree !== newDegree) {
          const minDiff = getMinDifference(existingDegree, newDegree);
          // const diff = Math.abs(currentYear - existingYear);
          const diff = calculateYearDifference(newPassingDate, existingPassingDate);

          console.log("existingDegree  :" + existingDegree);

          if (diff < minDiff) {
            data = {
              ...data,
              passingDate: {
                ...data.passingDate,
                error: `The difference between ${existingDegree} and ${newDegree} must be at least ${minDiff} years`,
              },
            };
            valid = false;
            break;
          }
        }
      }
    }

    setEducationData(data);
    console.log("setEducationData : " + JSON.stringify(data));

    try {
      if (!isEmpty) {
        console.log("not empty");
        if (valid) {
          console.log("valid");

          if (editIndex !== null) {
            console.log("updateEducation if valid and editIndex !== null");

            const updateEducationData = {
              degree: educationData?.degree?.value,
              schoolInstitue: educationData?.schoolInstitue?.value,
              boardUniversity: educationData?.boardUniversity?.value,
              cgpa: educationData?.cgpa?.value,
              passingDate: educationData?.passingDate?.value,
              startDate: educationData?.startDate?.value,
            };

            console.log("updateEducation Data : " + data);

            dispatch(
              updateEducation({ index: editIndex, data: updateEducationData })
            );
            setEditIndex(null);
          } else {
            console.log("setEducation if valid and and editindex null");

            const data = {
              degree: educationData?.degree?.value,
              schoolInstitue: educationData?.schoolInstitue?.value,
              boardUniversity: educationData?.boardUniversity?.value,
              cgpa: educationData?.cgpa?.value,
              passingDate: educationData?.passingDate?.value
                ? educationData?.passingDate?.value
                : "",
              startDate: educationData?.startDate?.value,
            };
            console.log("setEducation Data : " + JSON.stringify(data));

            dispatch(setEducation(data));
            toast({
              title: "Education added successfully.",
            });
          }

          resetEducationData();
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
          });
        }
      } else {
        console.log("empty");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    } catch (error) {
      //   console.log("error :", error);
    }
  };

  const handleOnNext = () => {
    if (educationList && educationList?.length > 0) {
      toast({
        title: "Data saved",
        description: "Successfully saved the education information.",
      });
      navigate(`/jobs/applicationForm/experience/${jobId}`);
    } else {
      toast({
        variant: "destructive",
        title: "Cannot proceed",
        description: "Please add at least one education entry.",
      });
    }
  };

  //   const handleOnPrevious = () => {
  //     if (educationList && educationList?.length > 0) {
  //       navigate(`/jobs/applicationForm/experience/${jobId}`);
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Cannot proceed",
  //         description: "Please add at least one education entry.",
  //       });
  //     }
  //   };

  return (
    <>
      <Card className="">
        <CardHeader className="">
          <CardTitle className="text-left">Education</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Please fill out your educational information
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
                <Label className={`text-base`}>
                  School/ Institute Name<b className="text-red-500">*</b>
                </Label>
                <Select
                  onValueChange={handleDegreeChange}
                  value={educationData.degree.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="School/ Institute Name " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SSC">SSC</SelectItem>
                    <SelectItem value="HSC">HSC</SelectItem>
                    <SelectItem value="Graduation">Graduation</SelectItem>
                    <SelectItem value="Post Graduation">
                      Post Graduation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <CustomInput
                  name="boardUniversity"
                  type="text"
                  placeholder="Board/University"
                  label="Board/University"
                  description="Please enter your Bord/University name"
                  value={educationData.boardUniversity.value}
                  error={educationData.boardUniversity.error}
                  requiredSymbol
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <CustomInput
                  name="cgpa"
                  type="text"
                  placeholder="CGPA"
                  label="CGPA"
                  value={educationData.cgpa.value}
                  error={educationData.cgpa.error}
                  requiredSymbol
                  onChange={handleCGPAChange}
                />
              </div>
              <div className="grid gap-3">
                {/* <CustomInput
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                value={educationData.email.value}
                error={educationData.email.error}
                requiredSymbol
                onChange={handleChange}
              /> */}
                <Label
                  className={`text-base ${
                    educationData.passingDate.error && "text-red-500"
                  }`}
                >
                  Passing date <b className="text-red-500">*</b>
                </Label>
                <DatePicker
                  className="w-full"
                  selectedDate={educationData.passingDate.value}
                  onSelect={handleDateSelect}
                  // onSelect={(date) => handleDateSelect(date, 'passingDate')}
                />
                {educationData.passingDate.error && (
                  <div className="text-red-500 text-sm py-1">
                    {educationData.passingDate.error}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-row gap-2 justify-end items-center">
                {/* <Button className="w-40" variant="outline">
                Previous
              </Button> */}
                <Button className="w-40" onClick={handleOnAdd}>
                  {editIndex !== null ? "Update" : "Add"} Education
                </Button>
              </div>
            </form>

            <Separator />
            {/* Education List */}
            <div className="mt-6 p-6">
              <h3 className="text-lg font-medium my-3">Education List</h3>

              {educationList && educationList.length > 0 ? (
                <>
                  <ul>
                    {educationList.map((education, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b py-6"
                      >
                        <div className="flex flex-row basis-11/12 gap-5 justify-between">
                          <div className="flex flex-col basis-[30%] gap-2">
                            <div>
                              <Label className="text-base">Degree</Label>
                            </div>
                            <div className="text-sm">{education.degree}</div>
                          </div>
                          {/* <div className="flex flex-col">
                          <div>
                            <Label className="text-base">
                              School/Institute
                            </Label>
                          </div>
                          <div>{education.schoolInstitute}</div>
                        </div> */}
                          {/* <Separator orientation="vertical"/> */}
                          <div className="flex flex-col basis-[30%] gap-2">
                            <div>
                              <Label className="text-base">
                                Board/University
                              </Label>
                            </div>
                            <div className="text-sm">
                              {education.boardUniversity}
                            </div>{" "}
                          </div>
                          <div className="flex flex-col  basis-[10%] gap-2">
                            <div>
                              <Label className="text-base">CGPA</Label>
                            </div>
                            <div className="text-sm">{education.cgpa}</div>
                          </div>
                          <div className="flex flex-col  basis-[30%] gap-2">
                            <div>
                              <Label className="text-base">Passing Date</Label>
                            </div>
                            <div className="text-sm">
                              {formatDate(education.passingDate)}
                            </div>
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
                  {/* {educationList.map((education, index) => (
                  <form
                    key={index}
                    className="grid w-full md:w-3/4 xl:w-3/5 items-start gap-6 overflow-auto p-4 pt-0"
                  >
                    <label>
                      Education {index + 1}
                    </label>
                    <div className="grid gap-3">
                      <Label className={`text-base`}>
                        School/ Institute Name<b className="text-red-500">*</b>
                      </Label>
                      <Select
                        onValueChange={handleDegreeChange}
                        value={education.degree}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="School/ Institute Name " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ssc">SSC</SelectItem>
                          <SelectItem value="hsc">HSC</SelectItem>
                          <SelectItem value="graduation">Graduation</SelectItem>
                          <SelectItem value="postGraduation">
                            Post Graduation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <CustomInput
                        name="boardUniversity"
                        type="text"
                        placeholder="Board/University"
                        label="Board/University"
                        description="Please enter your Bord/University name"
                        value={education.boardUniversity}
                        error={educationData.boardUniversity.error}
                        requiredSymbol
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <CustomInput
                        name="cgpa"
                        type="text"
                        placeholder="CGPA"
                        label="CGPA"
                        value={education.cgpa}
                        error={educationData.cgpa.error}
                        requiredSymbol
                        onChange={handleCGPAChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label
                        className={`text-base ${
                          educationData.cgpa.error && "text-red-500"
                        }`}
                      >
                        Passing date <b className="text-red-500">*</b>
                      </Label>
                      <DatePicker
                        className="w-full"
                        selectedDate={education.passingDate}
                        onSelect={handleDateSelect}
                      />
                      {educationData.passingDate.error && (
                        <div className="text-red-500 text-sm py-1">
                          {educationData.passingDate.error}
                        </div>
                      )}
                    </div>

                    <div className="w-full flex flex-row gap-2 justify-end items-center">
                      <Button className="w-40" onClick={handleOnAdd}>
                        Edit
                      </Button>
                    </div>
                  </form>
                ))} */}
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

      {/* <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
};

export default Education;
