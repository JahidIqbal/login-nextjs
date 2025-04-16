import { cn } from "@/utils/CssUtils";
import React from "react";
import { TbReorder } from "react-icons/tb";

interface Props {
  isOrdering: boolean;
  setIsOrdering: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReorderBtn({ isOrdering, setIsOrdering }: Props) {
  const toggleOrdering = () => {
    setIsOrdering((c) => !c);
  };

  return (
    <button
      className={cn(
        "flex justify-center items-center rounded-lg gap-2 px-3 2xl:px-4 py-2 2xl:py-3",
        "text-white font-medium 2xl:font-bold text-base 2xl:text-lg",
        {
          "bg-blue-500": !isOrdering,
          "bg-red-400": isOrdering,
        }
      )}
      onClick={toggleOrdering}
    >
      <TbReorder />
      <span>{isOrdering ? "Stop" : "Start"} Reorder</span>
    </button>
  );
}

export default ReorderBtn;
