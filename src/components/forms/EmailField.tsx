"use client";

import React from "react";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
}

const EmailField: React.FC<Props> = ({
  id,
  name,
  value,
  onChange,
  required = false,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label-text poppins">
        Email
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="border border-solid border-border-primary px-3 py-[5.5px] rounded-md poppins focus:border-border-primary focus:outline-none"
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};

export default EmailField;
