import { useFormContext } from "react-hook-form";
import { TextFieldProps } from "../types/form.types";
import { LuLock } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";

function TextField(props: TextFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, htmlType = "text", placeholder, helperText } = props;
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <p className="font-light text-fadegray">
        {helperText ? helperText : null}
      </p>

      {htmlType === "email" || htmlType === "password" ? (
        <div className="w-full flex items-center">
          <label
            htmlFor="email"
            className={`border border-r-0 py-4 px-4 border-gray ${
              isFocussed ? "border-blue" : ""
            }`}
          >
            {htmlType === "email" ? (
              <MdOutlineEmail size={"24px"} color="#DBDBDB" />
            ) : (
              <LuLock size={"24px"} color="#DBDBDB" />
            )}
          </label>
          <input
            id={name}
            type={htmlType}
            placeholder={placeholder}
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
      ) : (
        <>
          <label htmlFor={name} className="text-blue">
            {label}
          </label>
          <input
            id={name}
            type={htmlType}
            placeholder={placeholder}
            className={`border py-4 px-4 w-full border-gray focus:outline-none ${
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
        </>
      )}
    </div>
  );
}

export default TextField;
