"use client";
import { ReactNode, useState } from "react";

interface SingleForm {
  children: ReactNode;
}

interface Props {
  forms: Array<SingleForm>;
}

export default function MutliPartForm({ forms }: Props) {
  const [currentForm, setCurrentForm] = useState(0);
  const isLastForm = currentForm === forms.length - 1;
  const isFirstForm = currentForm === 0;

  function nextForm() {
    if (!isLastForm) {
      setCurrentForm(currentForm + 1);
    }
  }

  function previousForm() {
    if (!isFirstForm) {
      setCurrentForm(currentForm - 1);
    }
  }

  return (
    <>
      {!isLastForm ? <button onClick={nextForm}>Next</button> : null}
      {!isFirstForm ? <button onClick={previousForm}>Previous</button> : null}
      {forms[currentForm].children}
    </>
  );
}
