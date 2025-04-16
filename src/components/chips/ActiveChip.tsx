import { Chip } from "@heroui/react";
import React from "react";

interface Props {
    isActive: boolean;
}

function ActiveChip({isActive}: Props) {
  return (
    <Chip color={isActive ? "success" : "danger"} size="sm" variant="flat">
      {isActive ? "Active" : "Inactive"}
    </Chip>
  );
}

export default ActiveChip;
