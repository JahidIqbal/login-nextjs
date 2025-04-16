"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import credentialsLogin from "../actions/CredentialsLoginAction";

interface FormCredentialsLogin {
  email: string;
  password: string;
}

const useLogin = () => {
  const initialFormData: FormCredentialsLogin = {
    email: "",
    password: "",
  };

  const {push} = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =useState<FormCredentialsLogin>(initialFormData);

  const withCredentials = async () => {
    const { email, password } = formData;
    try {
      const result = await credentialsLogin(email, password);
      return result;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const updateForm = (key: keyof FormCredentialsLogin, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await withCredentials();
      console.log("reeeeeee",result)
      if (result?.success) {
        toast.success("Successfully logged in");
        push("/dashboard");
      } else if (result?.error) {
        toast.error(result?.error);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return {
    formData,
    updateForm,
    credentials: {
      login: withCredentials,
    },
    handleSubmit,
    loading
  };
};

export default useLogin;
