import { ChildrenProp } from "@/types/Common";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";

interface Props extends ChildrenProp {
    onSubmit: () => void;
    buttonProps?: React.ComponentProps<typeof PrimaryBtn>;
}

function Form({children, onSubmit, buttonProps}: Props) {
  return (
    <form
      className="flex flex-col gap-6 pt-6 text-[#39363C] font-medium"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}

      {buttonProps && (
        <div className="flex justify-end">
          <PrimaryBtn {...buttonProps} />
        </div>
      )}
    </form>
  );
}

export default Form;
