import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card/card";
import { Separator } from "@/components/ui/common/seperator/separator";

import { Button } from "@/components/ui/common/button/button";
import { useEffect, useState } from "react";
import CustomInput from "@/components/ui/common/customInput";
import {
  validateAddress,
  validateEmail,
  validatePhone,
  validateUsername,
} from "@/util/validation/validators";
import { useDispatch, useSelector } from "react-redux";
import { resetPersonalInfo, setPersonalInfo } from "@/store/local/personalInfo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { setCurrentStep } from "@/store/local/progress";

const PersonalInfo = () => {
  const [userData, setUserData] = useState({
    firstName: {
      value: "",
      error: "",
    },
    lastName: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    address: {
      value: "",
      error: "",
    },
  });

  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.personalInfo);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { jobId } = useParams();

  // #region reset
  const resetUserData = () => {
    setUserData({
      firstName: {
        value: "",
        error: "",
      },
      lastName: {
        value: "",
        error: "",
      },
      phone: {
        value: "",
        error: "",
      },
      email: {
        value: "",
        error: "",
      },
      address: {
        value: "",
        error: "",
      },
    });
  };

  // #region useEffects
  useEffect(() => {
    if (personalInfo === null || personalInfo === undefined) {
      resetUserData();
    } else {
      setUserData({
        firstName: { value: personalInfo.firstName, error: "" },
        lastName: { value: personalInfo.lastName, error: "" },
        phone: { value: personalInfo.phone, error: "" },
        email: { value: personalInfo.email, error: "" },
        address: { value: personalInfo.address, error: "" },
      });
    }
  }, [personalInfo]);

  //#region handler functions
  const handleChange = (event) => {
    console.log("event.target.value : " + event.target.value);
    setUserData({
      ...userData,
      [event.target.name]: {
        value: event.target.value,
        error: "",
      },
    });
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;

    // Filter out non-digit characters
    const filteredValue = value.replace(/\D/g, "");

    setUserData({
      ...userData,
      [name]: {
        value: filteredValue,
        error: "",
      },
    });
  };

  // #region handleOnSubmit
  const handleOnSubmit = (event) => {
    console.log("handleOnSubmit");
    event.preventDefault();

    let isEmpty = false;
    let valid = true;
    let data = userData;

    // first name
    if (userData?.firstName?.value?.trim() === "") {
      data = {
        ...data,
        firstName: {
          ...data.firstName,
          error: "Please enter firstName",
        },
      };

      valid = false;
      isEmpty = true;
    } else if (!validateUsername(userData?.firstName?.value)) {
      console.log("!validateUsername :", userData?.firstName?.value);
      data = {
        ...data,
        firstName: {
          ...data.firstName,
          error: "Please enter valid firstName",
        },
      };
      valid = false;
    } else if (!/[a-zA-Z][a-zA-Z0-9\s]*$/.test(userData?.firstName?.value)) {
      data = {
        ...data,
        firstName: {
          ...data.firstName,
          error:
            "First name should only contain alphanumeric and special characters",
        },
      };

      valid = false;
    }

    // last name
    if (userData?.lastName?.value?.trim() === "") {
      data = {
        ...data,
        lastName: {
          ...data.lastName,
          error: "Please enter lastName",
        },
      };

      valid = false;
      isEmpty = true;
    } else if (!validateUsername(userData?.lastName?.value)) {
      console.log("!validateUsername :", userData?.lastName?.value);
      data = {
        ...data,
        lastName: {
          ...data.lastName,
          error: "Please enter valid lastName",
        },
      };
      valid = false;
    } else if (!/[a-zA-Z][a-zA-Z0-9\s]*$/.test(userData?.lastName?.value)) {
      data = {
        ...data,
        lastName: {
          ...data.lastName,
          error:
            "Last name should only contain alphanumeric and special characters",
        },
      };

      valid = false;
    }

    // email
    if (userData?.email?.value?.trim() === "") {
      data = {
        ...data,
        email: {
          ...data.email,
          error: "Please enter email",
        },
      };
      isEmpty = true;
      valid = false;
    } else if (!validateEmail(userData.email.value)) {
      console.log("!validateEmail :", userData?.email?.value);
      data = {
        ...data,
        email: {
          ...data.email,
          error:
            "Please enter a valid email with format abc@xyz.com, min 6 and max 320 characters",
        },
      };
      valid = false;
    }

    //  Phone
    if (userData?.phone?.value?.trim() === "") {
      data = {
        ...data,
        phone: {
          ...data.phone,
          error: "Please enter phone number",
        },
      };
      valid = false;
    } else if (!validatePhone(userData.phone.value)) {
      data = {
        ...data,
        phone: {
          ...data.phone,
          error: "Invalid phone number",
        },
      };
      valid = false;
    }

    // Address
    if (userData?.address?.value?.trim() === "") {
      data = {
        ...data,
        address: {
          ...data.address,
          error: "Please enter address",
        },
      };

      valid = false;
      isEmpty = true;
    }
    // else if (!validateAddress(userData?.address?.value)) {
    //     console.log("!validateAddress :", userData?.address?.value);
    //     data = {
    //       ...data,
    //       address: {
    //         ...data.address,
    //         error: "Please enter valid address",
    //       },
    //     };
    //     valid = false;
    //   }

    setUserData(data);

    try {
      if (!isEmpty) {
        if (valid) {
          const data = {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            phone: userData.phone.value,
            email: userData.email.value,
            address: userData.address.value,
          };

          dispatch(setPersonalInfo(data));
          dispatch(setCurrentStep(1));
          toast({
            title: "Personal information saved.",
          });

          navigate(`/jobs/applicationForm/education/${jobId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  //   const validate = () => {
  //     const newErrors = {};
  //     if (formData.username.length < 2) {
  //       newErrors.username = "Username must be at least 2 characters.";
  //     }
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (validate()) {
  //       console.log(formData);
  //     }
  //   };

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="text-left">Personal Info</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Please fill out your personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Separator className="" />
        <div className="p-6">
          <form className="grid w-full md:w-3/4 xl:w-3/5 items-start gap-6 overflow-auto p-4 pt-0">
            <label>
              <b className="text-red-600">*</b> Indicates required
            </label>
            <div className="grid gap-3">
              <CustomInput
                name="firstName"
                type="text"
                placeholder="First Name"
                label="First Name"
                value={userData.firstName.value}
                error={userData.firstName.error}
                requiredSymbol
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <CustomInput
                name="lastName"
                type="text"
                placeholder="Last Name"
                label="Last Name"
                value={userData.lastName.value}
                error={userData.lastName.error}
                requiredSymbol
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <CustomInput
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                value={userData.email.value}
                error={userData.email.error}
                requiredSymbol
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              {/* <CustomInput
                name="phone"
                placeholder="+XX XXX XXX XXXX"
                label="Phone"
                requiredSymbol
                phoneInput
                onChange={handleChange}
              /> */}
              {/* <PhoneInput name="phone" onChange={handleChange} /> */}
              <CustomInput
                name="phone"
                type="text"
                placeholder="Phone"
                label="Phone"
                value={userData.phone.value}
                error={userData.phone.error}
                requiredSymbol
                maxLength={10}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="grid gap-3">
              <CustomInput
                name="address"
                placeholder="Address"
                label="Address"
                value={userData.address.value}
                error={userData.address.error}
                requiredSymbol
                textArea
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-row gap-2 justify-end items-center">
              <Button className="w-40" variant="secondary">
                Cancel
              </Button>
              <Button className="w-40" onClick={handleOnSubmit}>
                Next
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
