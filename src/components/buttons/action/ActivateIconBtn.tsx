"use client";

import { ResultWithoutData } from "@/api";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { cn } from "@/utils/CssUtils";
import { Tooltip } from "@heroui/react";
import React from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";

interface Props {
  currentStatus: boolean;
  onChange: () => Promise<ResultWithoutData>;
}

function ActivateIconBtn({ currentStatus, onChange }: Props) {
  return (
    <ConfirmModal
      onConfirm={onChange}
      buttonContent={
        <Tooltip
          color={currentStatus ? "danger" : "success"}
          content={currentStatus ? "Deactivate" : "Activate"}
        >
          <div
            className={cn(
              "text-white font-bold rounded-lg text-lg p-2 text-center cursor-pointer transition-colors",
              {
                "bg-red-500 hover:bg-red-600": currentStatus,
                "bg-green-400 hover:bg-green-500": !currentStatus,
              }
            )}
          >
            {currentStatus ? (
              <MdCancel size="1em" />
            ) : (
              <MdCheckCircle size="1em" />
            )}
          </div>
        </Tooltip>
      }
    />
  );
}

export default ActivateIconBtn;
