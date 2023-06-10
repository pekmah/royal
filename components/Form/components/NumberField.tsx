import { useFormContext } from "react-hook-form";
import { NumberFieldProps } from "../types/form.types";

function NumberField(props: NumberFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, placeholder, helperText } = props;

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
        className="border py-4 px-8 border-gray active:border-blue"
        {...register(name)}
      />
    </div>
  );
}

export default NumberField;
