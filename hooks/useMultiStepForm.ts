import { FormProps } from "@/components/Form/types/form.types";
import {  useState } from "react";

export default function useMultiStepForm(steps: FormProps[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function previous() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  return {
    step: steps[currentStep],
    next,
    previous,
    index: currentStep,
  };
}
