import AddMultiBadgeInput from "@/components/ui/common/addMultiBadge";
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
import { Label } from "@/components/ui/common/label/label";
import { Separator } from "@/components/ui/common/seperator/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteCertificate,
  setCertificate,
  setSkill,
  setSkillWhole,
  updateCertificate,
} from "@/store/local/skillsAndQualifications";
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
import { isValidUrl, validateNames } from "@/util/validation/validators";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Skills = () => {
  const [skillsData, setSkillsData] = useState({
    skills: {
      value: [],
      error: "",
    },
    certificateName: {
      value: "",
      error: "",
    },
    certificateProvider: {
      value: "",
      error: "",
    },
    certificateUrl: {
      value: "",
      error: "",
    },
    issuedDate: {
      value: "",
      error: "",
    },
    expiryDate: {
      value: "",
      error: "",
    },
    expire: {
      value: false,
    },
  });

  const [editIndex, setEditIndex] = useState(null);
  const [expire, setExpire] = useState(false);

  const certificatesList = useSelector(
    (state) => state.skillsAndQualifications.certificates
  );
  const skillsArray = useSelector(
    (state) => state.skillsAndQualifications.skills
  );

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { jobId } = useParams();

  const today = new Date();

  // #region reset
  const resetSkillsData = () => {
    setSkillsData({
      skills: {
        value: [],
        error: "",
      },
      certificateName: {
        value: "",
        error: "",
      },
      certificateProvider: {
        value: "",
        error: "",
      },
      certificateUrl: {
        value: "",
        error: "",
      },
      issuedDate: {
        value: "",
        error: "",
      },
      expiryDate: {
        value: "",
        error: "",
      },
      expire: {
        value: false,
      },
    });
    setEditIndex(null);
  };

  const resetCertificateData = () => {
    setSkillsData((prevData) => ({
      ...prevData,
      certificateName: {
        value: "",
        error: "",
      },
      certificateProvider: {
        value: "",
        error: "",
      },
      certificateUrl: {
        value: "",
        error: "",
      },
      issuedDate: {
        value: "",
        error: "",
      },
      expiryDate: {
        value: "",
        error: "",
      },
      expire: {
        value: false,
      },
    }));

    setEditIndex(null);
  };

  // #region useEffects
  useEffect(() => {
    if (editIndex !== null) {
      const selectedData = certificatesList[editIndex] || {};
      setSkillsData((prevData) => ({
        ...prevData,
        skills: {
          value: selectedData?.skills || [],
          error: prevData?.skills?.error,
        },
        certificateName: {
          value: selectedData?.certificateName || "",
          error: prevData?.certificateName?.error,
        },
        certificateProvider: {
          value: selectedData?.certificateProvider || "",
          error: prevData?.certificateProvider?.error,
        },
        certificateUrl: {
          value: selectedData?.certificateUrl || "",
          error: prevData?.certificateUrl?.error,
        },
        issuedDate: {
          value: selectedData?.issuedDate || "",
          error: prevData?.issuedDate?.error,
        },
        expiryDate: {
          value: selectedData?.expiryDate || "",
          error: prevData?.expiryDate?.error,
        },
        expire: {
          value: selectedData?.expire || false,
        },
      }));
    }
  }, [editIndex, certificatesList]);

  useEffect(() => {
    if (skillsArray) {
      setSkillsData((prevData) => ({
        ...prevData,
        skills: {
          value: skillsArray,
          error: "",
        },
      }));
    }
  }, [skillsArray]);

  useEffect(() => {
    if (skillsData) {
      console.log("skillsData :" + JSON.stringify(skillsData));
    }
  }, [skillsData]);

  //#region handler functions
  const handleChange = (event) => {
    setSkillsData((prevData) => ({
      ...prevData,
      [event?.target?.name]: {
        value: event?.target?.value,
        error: "",
      },
    }));
  };

  //   const handleDateSelect = (date) => {
  //     if (skillsData?.expire?.value) {

  //       const durationValue = calculateDurationFromStartDate(date);

  //       setSkillsData((prevData) => ({
  //         ...prevData,
  //         duration: {
  //           value: durationValue,
  //           error: "",
  //         },
  //         startDate: {
  //           value: date,
  //           error: "",
  //         },
  //       }));
  //     } else {

  //       const durationValue = calculateDuration(date?.from, date?.to);

  //       console.log("durationValue :" + durationValue);

  //       setSkillsData((prevData) => ({
  //         ...prevData,
  //         duration: {
  //           value: durationValue,
  //           error: "",
  //         },
  //         startDate: {
  //           value: date?.from,
  //           error: "",
  //         },
  //         endDate: {
  //           value: date?.to,
  //           error: "",
  //         },
  //       }));
  //     }
  //   };

  //use value for Checkbox

  const handleDateSelect = (date, field) => {
    setSkillsData((prevData) => ({
      ...prevData,
      [field]: {
        value: date,
        error: "",
      },
    }));
  };

  const handleCheckboxChange = (value) => {
    console.log("value :" + value);
    setExpire(value);

    if (value) {
      setSkillsData((prevData) => ({
        ...prevData,
        expire: {
          value: value,
        },
      }));
    } else {
      setSkillsData((prevData) => ({
        ...prevData,
        expiryDate: {
          value: "",
          error: "",
        },
        expire: {
          value: value,
        },
      }));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteCertificate(index));
  };

  const handleAddSkill = (updatedSkills) => {
    setSkillsData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        value: updatedSkills,
      },
    }));
  };

  const handleDeleteSkill = (updatedSkills) => {
    setSkillsData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        value: updatedSkills,
      },
    }));
  };

  // #region handleOnSubmit
  const handleOnAdd = (event) => {
    event.preventDefault();

    let isEmpty = false;
    let valid = true;
    let data = skillsData;

    if (skillsData?.certificateName?.value?.trim() === "") {
      data = {
        ...data,
        certificateName: {
          ...data.certificateName,
          error: "Please enter the certificate name",
        },
      };
      valid = false;
      isEmpty = true;
    } else if (!validateNames(skillsData?.certificateName?.value)) {
      console.log("!validate Board Uni :", skillsData?.certificateName?.value);
      data = {
        ...data,
        certificateName: {
          ...data.certificateName,
          error: "Please enter valid certificate name",
        },
      };
      valid = false;
    }

    if (skillsData?.certificateProvider?.value?.trim() === "") {
      data = {
        ...data,
        certificateProvider: {
          ...data.certificateProvider,
          error: "Please enter the certificate provider name",
        },
      };
      valid = false;
      isEmpty = true;
    } else if (!validateNames(skillsData?.certificateProvider?.value)) {
      console.log(
        "!validate Board Uni :",
        skillsData?.certificateProvider?.value
      );
      data = {
        ...data,
        certificateProvider: {
          ...data.certificateProvider,
          error: "Please enter valid certificate provider name ",
        },
      };
      valid = false;
    }

    if (skillsData?.certificateUrl?.value?.trim() === "") {
      data = {
        ...data,
        certificateUrl: {
          ...data.certificateUrl,
          error: "Please enter the certificate url",
        },
      };
      valid = false;
      isEmpty = true;
    } else if (!isValidUrl(skillsData?.certificateUrl?.value)) {
      console.log("!validate  url :", skillsData?.certificateUrl?.value);
      data = {
        ...data,
        certificateUrl: {
          ...data.certificateUrl,
          error: "Please enter valid certificate url. ",
        },
      };
      valid = false;
    }

    // if (
    //   skillsData?.responsibilities?.value?.trim().length < 10 ||
    //   skillsData?.responsibilities?.value?.trim().length > 500
    // ) {
    //   data = {
    //     ...data,
    //     responsibilities: {
    //       ...data.responsibilities,
    //       error: "Responsibilities must be between 10 and 500 characters",
    //     },
    //   };
    //   valid = false;
    // }

    if (skillsData?.issuedDate?.value === "") {
      console.log(
        "skillsData?.issuedDate?.value :" + skillsData?.issuedDate?.value
      );
      data = {
        ...data,
        issuedDate: {
          ...data.issuedDate,
          error: "Please select certificate issued date.",
        },
      };
      isEmpty = true;
      valid = false;
    }

    // if (skillsData?.expiryDate?.value === "") {
    //   data = {
    //     ...data,
    //     expiryDate: {
    //       ...data.expiryDate,
    //       error: "Please select certificate expiry date.",
    //     },
    //   };
    //   isEmpty = true;
    //   valid = false;
    // }

    // if (skillsData?.expire?.value == false) {
    //   if (skillsData?.endDate?.value === "") {
    //     data = {
    //       ...data,
    //       endDate: {
    //         ...data.endDate,
    //         error: "Please select start date of your employement",
    //       },
    //     };
    //     isEmpty = true;
    //     valid = false;
    //   }

    //   if (skillsData?.startDate?.value === "") {
    //     data = {
    //       ...data,
    //       startDate: {
    //         ...data.startDate,
    //         error: "Please select end date of your employement",
    //       },
    //     };
    //     isEmpty = true;
    //     valid = false;
    //   }
    // } else {
    //   if (skillsData?.startDate?.value === "") {
    //     data = {
    //       ...data,
    //       startDate: {
    //         ...data.startDate,
    //         error: "Please select end date of your employement",
    //       },
    //     };
    //     isEmpty = true;
    //     valid = false;
    //   }
    // }

    //   TODO:: Proper Date validations

    setSkillsData((prevData) => ({
        ...prevData,
        ...data, // Merging the new data into the existing `skillsData` state
      }));

    try {
      if (!isEmpty) {
        if (valid) {
          if (editIndex !== null) {
            const updateCertificatesData = {
              certificateName: skillsData?.certificateName?.value,
              certificateProvider: skillsData?.certificateProvider?.value,
              certificateUrl: skillsData?.certificateUrl?.value,
              issuedDate: skillsData?.issuedDate?.value,
              expiryDate: skillsData?.expiryDate?.value
                ? skillsData?.expiryDate?.value
                : "",
              expire: skillsData?.expire?.value,
              skills:skillsData?.skills?.value,
            };

            console.log(
              "updateCertificatesData :" +
                JSON.stringify(updateCertificatesData)
            );
            dispatch(
              updateCertificate({
                index: editIndex,
                data: updateCertificatesData,
              })
            );
            setEditIndex(null);
          } else {
            const data = {
              certificateName: skillsData?.certificateName?.value,
              certificateProvider: skillsData?.certificateProvider?.value,
              certificateUrl: skillsData?.certificateUrl?.value,
              issuedDate: skillsData?.issuedDate?.value,
              expiryDate: skillsData?.expiryDate?.value
                ? skillsData?.expiryDate?.value
                : "",
              expire: skillsData?.expire?.value,
              skills:skillsData?.skills?.value,
            };
            console.log("data :" + JSON.stringify(data));

            dispatch(setCertificate(data));
            toast({
              title: "Certificate added successfully.",
            });
          }

          resetCertificateData();
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
    if (certificatesList && certificatesList?.length > 0) {
      console.log("skills : " + skillsData?.skills?.value);
      if (skillsData?.skills?.value && skillsData?.skills?.value.length > 0) {
        setSkillWhole(skillsData?.skills?.value);
        toast({
          title: "Success",
          description: "Skills and Certifications added successfully.",
        });
        navigate(`/jobs/applicationForm/additional-info/${jobId}`);
      } else {
        setSkillsData((prevData) => ({
          ...prevData,
          skills: {
            value: prevData.skills,
            error: "Enter atleast one skill.",
          },
        }));
      }
    } else {
      toast({
        variant: "destructive",
        title: "Cannot proceed",
        description: "Please add at least one certificate entry.",
      });
    }
  };

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="text-left">Skills and Qualifications</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Please fill out your skills and qualification details.
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
              {/* <CustomInput
                label="Company Name"
                placeholder="Company Name"
                name="companyName"
                value={skillsData.companyName.value}
                onChange={handleChange}
                error={skillsData.companyName.error}
                requiredSymbol
              /> */}
              <AddMultiBadgeInput
                label="Skills"
                placeholder="Skills"
                name="skills"
                // value={skillsData.companyName.value}
                // onChange={handleChange}
                error={skillsData?.skills?.error}
                skillsArray={skillsData?.skills?.value}
                onAddSkill={handleAddSkill}
                onDeleteSkill={handleDeleteSkill}
                description="Please select the skills you are proficient in."
                requiredSymbol
              />
            </div>

            <Separator />
            <Label className="text-lg">Certifications</Label>
            <div className="grid gap-3">
              <CustomInput
                label="Certifiacte name"
                placeholder="Certifiacte name"
                name="certificateName"
                value={skillsData?.certificateName?.value}
                onChange={handleChange}
                error={skillsData?.certificateName?.error}
                requiredSymbol
              />
            </div>

            <div className="grid gap-3">
              <CustomInput
                label="Certifiacte provider"
                placeholder="Certifiacte provider"
                name="certificateProvider"
                value={skillsData?.certificateProvider?.value}
                onChange={handleChange}
                error={skillsData?.certificateProvider?.error}
                // description="Please specify short description of your role"
                requiredSymbol
              />
            </div>

            <div className="grid gap-3">
              <CustomInput
                label="Certifiacte url"
                placeholder="Certifiacte url"
                name="certificateUrl"
                value={skillsData?.certificateUrl?.value}
                onChange={handleChange}
                error={skillsData?.certificateUrl?.error}
                // description="Please specify short description of your role"
                requiredSymbol
              />
            </div>

            <div className="grid gap-3">
              <Label
                className={`text-base ${
                  skillsData?.issuedDate?.error && "text-red-500"
                }`}
              >
                Issued at <b className="text-red-500">*</b>
              </Label>

              <DatePicker
                className="w-full"
                selectedDate={skillsData?.issuedDate?.value}
                onSelect={(date) => handleDateSelect(date, "issuedDate")}
              />

              {skillsData?.issuedDate?.error && (
                <div className="text-red-500 text-sm py-1">
                  {skillsData?.issuedDate?.error}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="expiry"
                  checked={skillsData?.expire?.value}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="expiry"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Certifiacte have a expiry ?
                </label>
              </div>
            </div>

            {expire && (
              <div className="grid gap-3">
                <Label
                  className={`text-base ${
                    skillsData?.expiryDate?.error && "text-red-500"
                  }`}
                >
                  Expiry date <b className="text-red-500">*</b>
                </Label>

                <DatePicker
                  className="w-full"
                  selectedDate={skillsData?.expiryDate?.value}
                  onSelect={(date) => handleDateSelect(date, "expiryDate")}
                />

                {skillsData?.expiryDate?.error && (
                  <div className="text-red-500 text-sm py-1">
                    {skillsData?.expiryDate?.error}
                  </div>
                )}
              </div>
            )}

            <div className="w-full flex flex-row gap-2 justify-end items-center">
              {/* {editIndex !== null && (
                <Button className="w-40" variant="outline">
                  Cancel
                </Button>
              )} */}
              <Button className="w-40" onClick={handleOnAdd}>
                {editIndex !== null ? "Update" : "Add"} Certificate
              </Button>
            </div>
          </form>

          <Separator />
          {/* Certification List */}
          <div className="mt-6 p-6">
            <h3 className="text-lg font-medium my-3">Certification List</h3>

            {certificatesList && certificatesList.length > 0 ? (
              <>
                <ul>
                  {certificatesList.map((certificate, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b py-6 flex-wrap md:flex-nowrap"
                    >
                      <div className="flex flex-row basis-11/12 gap-5  flex-wrap md:flex-nowrap">
                        <div className="flex flex-col basis-[30%] gap-2 lg:gap-4 max-w-28 sm:max-w-40 md:max-w-52 lg:max-w-60">
                          <div>
                            <Label className="text-base">
                              Certificate Name
                            </Label>
                          </div>
                          <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                            {certificate?.certificateName}
                          </div>
                        </div>
                        <div className="flex flex-col basis-[30%] gap-2 lg:gap-4 max-w-28 sm:max-w-40 md:max-w-52 lg:max-w-60">
                          <div>
                            <Label className="text-base">
                              Certificate Provider
                            </Label>
                          </div>
                          <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                            {certificate?.certificateProvider}
                          </div>
                        </div>
                        <div className="flex flex-col basis-[10%] gap-2 lg:gap-4max-w-28 sm:max-w-40 md:max-w-52 lg:max-w-60">
                          <div>
                            <Label className="text-base">Certificate URL</Label>
                          </div>
                          <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                            {certificate?.certificateUrl}
                          </div>
                        </div>
                        <div className="flex flex-col basis-[30%] gap-2 lg:gap-4max-w-28 sm:max-w-40 md:max-w-52 lg:max-w-60">
                          <div>
                            <Label className="text-base">Issued Date</Label>
                          </div>
                          <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                            {formatDate(certificate?.issuedDate)}
                          </div>
                        </div>
                        <div className="flex flex-col basis-[30%] gap-2 lg:gap-4max-w-28 sm:max-w-40 md:max-w-52 lg:max-w-60">
                          <div>
                            <Label className="text-base">Expiry Date</Label>
                          </div>
                          <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                            {certificate?.expiryDate === ""
                              ? " - "
                              : formatDate(certificate?.expiryDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 md:gap-5 basis-full justify-start mt-6 md:mt-0 md:basis-1/12">
                        <Button
                          className="w-28 md:w-fit"
                          variant="ghost"
                          onClick={() => handleDelete(index)}
                        >
                          <TrashIcon />
                        </Button>
                        <Button
                          className="w-28 md:w-fit"
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

export default Skills;
