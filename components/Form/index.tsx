"use client";

import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import NumberField from "./components/NumberField";
import TextField from "./components/TextField";
import {
  ArrayFieldProps,
  Field,
  FormProps,
  ObjectFieldProps,
} from "./types/form.types";
import { BiArrowBack } from "react-icons/bi";
import PinField from "./components/PinField";

function ObjectField(props: ObjectFieldProps & { name: string }) {
  const { label, name, properties, styling = {} } = props;
  const { fieldsPerColumn } = styling;

  return (
    <div className="flex-col">
      <label>{label}</label>
      <div
        className="grid gap-2 w-full"
        style={{ gridTemplateColumns: `repeat(${fieldsPerColumn ?? 2}, 1fr)` }}
      >
        {Object.entries(properties).map(([fieldName, objectField], idx) => {
          return (
            <div key={`${name}.${fieldName}_${idx}`}>
              {renderFields([`${name}.${fieldName}`, objectField])}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const appendDefaults = {
  text: "",
  number: 0,
  array: [],
  object: {},
  pin: 0,
};

function ArrayField(props: ArrayFieldProps & { name: string }) {
  const { name, itemField, label } = props;

  const { control } = useFormContext();

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name,
    rules: { minLength: 4 },
  });

  function add() {
    prepend(appendDefaults[itemField.type]);
  }

  return (
    <>
      <div className="flex">
        <label>{label}</label>
        {/* <IconButton
          onClick={add}
          variant={"outline"}
          type="button"
          size={"xs"}
          icon={<AddIcon />}
          aria-label={`Add field to ${label}`}
        /> */}
      </div>

      <div className="flex">
        {fields.map((item, i) => {
          return (
            <div
              className="flex items-center gap-2"
              key={`ArrayField__${name}_${item.id}`}
            >
              <>{renderFields([`${name}[${i}]`, itemField])}</>
              {/* <IconButton
                onClick={() => remove(i)}
                variant={"outline"}
                type="button"
                size={"xs"}
                icon={<MinusIcon />}
                aria-label={`Remove field from ${label}`}
              /> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

function renderFields([name, fieldProps]: [string, Field]) {
  if (fieldProps.type === "text") {
    return <TextField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === "number") {
    return <NumberField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === "object") {
    return <ObjectField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === "array") {
    return <ArrayField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === "pin") {
    return <PinField {...fieldProps} name={name} />;
  }

  return <div>Unknown type</div>;
}

export function Form({
  fields,
  onSubmit,
  styling = {},
  submitText,
  formTitle,
  SubmitInfo,
  Container,
  multistep = {},
  isLoading,
}: FormProps) {
  const form = useForm();

  const { formWidth } = styling;
  const { previousStep } = multistep;

  return Container ? (
    <Container>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${formWidth ? formWidth : "w-full"}`}
        >
          {previousStep ? (
            <button
              onClick={previousStep}
              className="top-0 left-0 ml-[-18rem] mt-[-8rem]"
            >
              <BiArrowBack />
            </button>
          ) : null}
          {formTitle ? (
            <h2 className={` text-xl font-[700] text-blue mb-8`}>
              {formTitle}
            </h2>
          ) : null}
          <div className="grid gap-2 w-full">
            {Object.entries(fields).map((field, idx) => (
              <div className="w-full" key={idx}>
                {renderFields(field)}
              </div>
            ))}
          </div>

          {SubmitInfo ? SubmitInfo : null}

          {isLoading !== undefined ? (
            <button type="submit" className="button-primary w-full mt-4">
              {isLoading ? "Loading..." : submitText ? submitText : "Submit"}
            </button>
          ) : (
            <button type="submit" className="button-primary w-full mt-4">
              {submitText ? submitText : "Submit"}
            </button>
          )}
        </form>
      </FormProvider>
    </Container>
  ) : (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {formTitle ? (
          <h2 className={` text-xl font-[700] text-blue mb-8`}>{formTitle}</h2>
        ) : null}
        <div className="grid gap-2 w-full">
          {Object.entries(fields).map((field, idx) => (
            <div className="w-full" key={idx}>
              {renderFields(field)}
            </div>
          ))}
        </div>

        {SubmitInfo ? SubmitInfo : null}

        <button type="submit" className="button-primary w-full mt-4">
          {submitText ? submitText : "Submit"}
        </button>
      </form>
    </FormProvider>
  );
}
