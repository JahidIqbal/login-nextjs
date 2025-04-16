"use client";

import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface Props {
  label: string;
  id: string;
  name: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PasswordField: React.FC<Props> = ({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordFieldClass =
    "border-y border-solid border-border-primary px-3 bg-background-primary";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label-text poppins">
        {label} {required ? <span className="text-[#D9214E]">*</span> :""}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`${passwordFieldClass} border-l py-[5.5px] rounded-l-md poppins appearance-none focus:outline-none flex-grow`}
          required={required}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`${passwordFieldClass} border-r py-[9.5px] rounded-r-md flex items-center cursor-pointer`}
        >
          {showPassword ? <LuEye /> : <LuEyeOff />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
