"use client";

import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import EmailField from "@/components/forms/EmailField";
import PasswordField from "@/components/forms/PasswordField";
import React from "react";
import useLogin from "../hooks/useLogin";

const Page: React.FC = () => {
  const { formData, updateForm, handleSubmit, loading } = useLogin();
  console.log("fffffffffgfffff",formData.email)
  console.log("fpppppppppp",formData.password)
  const isSaveDisabled = false;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateForm(name as keyof typeof formData, value);
  };


  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <form onSubmit={handleSubmit} method="POST" className="">
          <div className="flex flex-col gap-4">
            <EmailField
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <PasswordField
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <PrimaryBtn
              disabled={isSaveDisabled}
              loading={loading}
              content="Sign In"
            />
          </div>
        </form>
      </div>
    </>
  );

  
};

export default Page;
