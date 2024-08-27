import React, { useState } from "react";
import { Input } from "../input/input";
import { Button } from "../../button";
import { Badge } from "../badge/badge";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "../label/label";

const MAX_SKILL_LENGTH = 20; // Set your desired maximum length
const ALLOWED_CHARACTERS = /^[a-zA-Z0-9\s]*$/; // Adjust the regex as needed

const AddMultiBadgeInput = ({
  label,
  requiredSymbol = false,
  labelStyle = "",
  error = "",
  description = "",
  badgeStyleClass,
  multiBadgeInputClass,
  skillsArray = [],
  badgeVariant = "secondary",
  onAddSkill = () => {},
  onDeleteSkill = () => {},
  onChange = () => {},
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState(skillsArray);

  const handleAddSkill = () => {
    if (inputValue && !skills.includes(inputValue)) {
      const updatedSkills = [...skills, inputValue];
      setSkills(updatedSkills);
      onAddSkill(updatedSkills); // Callback for parent component
      setInputValue(""); // Clear input field
    }
  };

  const handleDeleteSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    onDeleteSkill(updatedSkills); // Callback for parent component
  };

  const handleOnInputChange = (e) => {
    let value = e.target.value;

    // Replace disallowed characters
    value = value.replace(/[^a-zA-Z0-9\s]/g, "");

    // Enforce maximum length
    if (value.length > MAX_SKILL_LENGTH) {
      value = value.substring(0, MAX_SKILL_LENGTH);
    }

    setInputValue(value);
  };

  return (
    <>
      <Label className={`${labelStyle} text-base ${error && "text-red-500"}`}>
        {label} {requiredSymbol && <b className="text-red-500">*</b>}{" "}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={inputValue}
          className="flex"
          onChange={handleOnInputChange}
          placeholder="Type a skill and press +"
        />

        <Button variant="ghost" onClick={handleAddSkill}>
          <PlusIcon />
        </Button>
      </div>
      {description && (
        <div className="text-gray-500 text-sm py-1">{description}</div>
      )}
      {error && <div className="text-red-500 text-sm py-1">{error}</div>}
      <div className=" flex flex-row flex-wrap gap-2 items-center justify-start">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant={badgeVariant}
            className="flex items-center min-w-2"
          >
            {skill}
            <Cross1Icon
              className="text-right ml-2 cursor-pointer w-4 h-4"
              onClick={() => handleDeleteSkill(skill)}
            />
          </Badge>
        ))}
      </div>
    </>
  );
};

export default AddMultiBadgeInput;
