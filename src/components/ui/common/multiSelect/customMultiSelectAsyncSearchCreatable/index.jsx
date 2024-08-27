import MultipleSelectorWithAsyncSearchAndCreatable from "../multiSelectAsyncSearchAndCreatable";
import { Label } from "../../label/label";

const CustomMultipleSelectorWithAsyncSearchAndCreatable = ({
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
        <MultipleSelectorWithAsyncSearchAndCreatable {...props}/>
      {description && (
        <div className="text-gray-500 text-sm py-1">{description}</div>
      )}
      {error && <div className="text-red-500 text-sm py-1">{error}</div>}
    </>
  );
};

export default CustomMultipleSelectorWithAsyncSearchAndCreatable;
