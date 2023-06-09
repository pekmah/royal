import { useFormContext } from "react-hook-form";
import { TextFieldProps } from "../types/form.types";

function TextField(props: TextFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, htmlType = "text", placeholder } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label htmlFor={name} className="text-blue">
        {label}
      </label>
      <input
        id={name}
        type={htmlType}
        placeholder={placeholder}
        className="border py-4 px-8 border-gray active:border-blue"
        {...register(name)}
      />
    </div>
  );
}

export default TextField;
