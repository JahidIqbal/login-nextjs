import React from "react";
import InputLabel from "./InputLabel";

interface Props {
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

function TextField({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
}: Props) {
  return (
    <div className="">
      <InputLabel label={label} id={id} required={required} />
      <textarea
        className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:outline-none"
        required={required}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter here"
      />
    </div>
  );
}

export default TextField;
