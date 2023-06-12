import { useFormContext } from "react-hook-form";
import { NumberFieldProps } from "../types/form.types";
import { useState } from "react";

function NumberField(props: NumberFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, placeholder, helperText } = props;
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <p className="font-light text-fadegray">
        {helperText ? helperText : null}
      </p>
      <label htmlFor={name} className="text-blue">
        {label}
      </label>
      <input
        id={name}
        type="number"
        placeholder={placeholder}
        {...register(name)}
        className={`border py-4 px-4 w-full border-gray focus:outline-none border-l-0 ${
          isFocussed ? "border-blue" : ""
        }`}
        {...register(name)}
        onFocus={() => {
          setIsFocussed(true);
        }}
        onBlur={() => {
          setIsFocussed(false);
        }}
      />
    </div>
  );
}

export default NumberField;
