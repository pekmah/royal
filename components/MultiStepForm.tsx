"use client";

import useMultiStepForm from "@/hooks/useMultiStepForm";
import { FormProps } from "./Form/types/form.types";
import { Form } from "./Form";

export default function MultiStepForm({ forms }: { forms: Array<FormProps> }) {
  const { next, previous, step, index } = useMultiStepForm(forms);
  let onSubmit = step.onSubmit;

  return (
    <Form
      {...step}
      onSubmit={(data) => {
        onSubmit(data);
        if (index !== forms.length - 1) {
          next();
        }
      }}
      submitText={index === forms.length - 1 ? "Finish" : "Continue"}
      multistep={{
        previousStep: index !== 0 ? previous : undefined,
      }}
    />
  );
}
