"use client";

import React from "react";
import InputLabel from "./InputLabel";

interface Props {
  label: string;
  id: string;
  name: string;
  defaultValue?: string | number;
  value?: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<Props> = ({
  label,
  id,
  name,
  type,
  defaultValue,
  value,
  onChange,
  required = false,
  readOnly = false,
  disabled= false,
}) => {
  return (
    <div className="">
      <InputLabel label={label} id={id} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        value={defaultValue ? undefined : value}
        onChange={onChange}
        placeholder="Enter here"
        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none"
        required={required}
        disabled={disabled} 
        readOnly={readOnly}

        pattern={type == "number" ? "[0-9]" : undefined}
      />
    </div>
  );
};

export default InputField;
