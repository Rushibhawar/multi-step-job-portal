import React from "react";
import { Label } from "../label/label";
import { Textarea } from "../textarea/textarea";
import { Input } from "../input/input";
import { PhoneInput } from "../phoneInput";

const CustomInput = ({
  textArea = false,
  phoneInput =false,
  label,
  requiredSymbol = false,
  labelStyle = "",
  error = "",
  description = "",
  onChange = () => {},
  ...props
}) => {
  return (
    <>
      <Label className={`${labelStyle} text-base ${error && "text-red-500"}`}>
        {label} {requiredSymbol && <b className="text-red-500">*</b>}{" "}
      </Label>
      {textArea ? (
        <Textarea
          onChange={onChange}
          {...props}
        />
        
      ) : phoneInput ? (
        <PhoneInput onChange={onChange} {...props} />
      ) : (
        <Input onChange={onChange} {...props} />
      )}
      {description && <div className="text-gray-500 text-sm py-1">{description}</div>}
      {error && <div className="text-red-500 text-sm py-1">{error}</div>}
    </>
  );
};

export default CustomInput;
