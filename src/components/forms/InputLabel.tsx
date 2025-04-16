import React from "react";

interface Props {
  label: string;
  id: string;
  required?: boolean;
}

function InputLabel({label, id, required}: Props) {
  return (
    <label htmlFor={id} className="block mb-2">
      {label} {required ? <span className="text-[#D9214E]">*</span> : ""}
    </label>
  );
}

export default InputLabel;
