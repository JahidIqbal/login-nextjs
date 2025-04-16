"use client";

import { ResultWithoutData } from "@/api";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Tooltip } from "@heroui/react";
import React from "react";
import { MdDelete } from "react-icons/md";

interface Props {
  onDelete: () => Promise<ResultWithoutData>;
}

function DeleteIconBtn({ onDelete }: Props) {
  return (
    <ConfirmModal
      onConfirm={onDelete}
      destructive
      buttonContent={
        <Tooltip color="danger" content="Delete">
          <div className="text-white bg-red-700 hover:bg-red-900 font-bold rounded-lg text-lg p-2 text-center cursor-pointer transition-colors">
            <MdDelete size="1em" />
          </div>
        </Tooltip>
      }
    />
  );
}

export default DeleteIconBtn;
