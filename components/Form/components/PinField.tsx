import { useFormContext } from "react-hook-form";
import { PinFieldProps } from "../types/form.types";
import PinInput from "react-pin-input";

function PinField(props: PinFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, helperText } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "full",
      }}
    >
      <p className="font-light text-fadegray">
        {helperText ? helperText : null}
      </p>
      <label htmlFor={name} className="text-blue">
        {label}
      </label>
      <PinInput
        length={4}
        initialValue=""
        onChange={(value, index) => {}}
        type="numeric"
        inputMode="number"
        style={{
          padding: "10px 0",
          minWidth: "100%",
          display: "flex",
        }}
        inputStyle={{
          borderRadius: "10px",
          border: "2px solid #DBDBDB",
          borderColor: "#DBDBDB",
        }}
        inputFocusStyle={{ borderColor: "#2A3698" }}
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </div>
  );
}

export default PinField;
