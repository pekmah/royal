import { useFormContext } from "react-hook-form";
import { TextFieldProps } from "../types/form.types";
import { LuLock } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import dynamic from "next/dynamic";

function TextField(props: TextFieldProps & { name: string }) {
  const { register } = useFormContext();
  const {
    label,
    name,
    htmlType = "text",
    placeholder,
    helperText,
    LabelIcon,
  } = props;

  function Input() {
    const hasIcon =
      htmlType !== "email" && htmlType !== "password" && !LabelIcon;

    return (
      <input
        id={name}
        type={htmlType}
        placeholder={placeholder}
        className={`border py-4 px-4 w-full border-grey focus:outline-none ${
          !hasIcon ? "border-l-0" : ""
        } `}
        {...register(name)}
      />
    );
  }

  function TextLabel() {
    return (
      <label htmlFor={name} className="text-blue">
        {label}
      </label>
    );
  }

  function InputIconLabel() {
    return htmlType === "email" || htmlType === "password" ? (
      <label
        htmlFor="email"
        className={`border border-r-0 py-4 px-4 border-grey`}
      >
        {htmlType === "email" ? (
          <MdOutlineEmail size={"24px"} color="#DBDBDB" />
        ) : (
          <LuLock size={"24px"} color="#DBDBDB" />
        )}
      </label>
    ) : LabelIcon ? (
      <label
        htmlFor="email"
        className={`border border-r-0 py-4 px-4 border-grey`}
      >
        <LabelIcon size={"24px"} color="#DBDBDB" />
      </label>
    ) : null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <p className="font-light text-fadegrey">
        {helperText ? helperText : null}
      </p>
      <div>
        <TextLabel />
      </div>
      <div className="w-full flex items-center">
        <InputIconLabel />
        <Input />
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TextField), {
  ssr: false,
  loading() {
    return (
      <div className={"bg-grey h-14 w-full rounded-sm skeleton-animation"} />
    );
  },
});
