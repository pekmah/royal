import { useFormContext } from "react-hook-form";
import { NumberFieldProps } from "../types/form.types";

function NumberField(props: NumberFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, placeholder } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        placeholder={placeholder}
        {...register(name)}
      />
    </>
  );
}

export default NumberField;
