"use client";

import { Tooltip } from "@heroui/react";
import React from "react";
import { GrFormView } from "react-icons/gr";
import Link from "next/link";

interface Props {
  redirectUrl: string;
}

function ViewIconBtn({ redirectUrl }: Props) {
  return (
    <Tooltip content="Details">
      <Link href={redirectUrl}>
        <div className="text-white bg-gradient-to-tr bg-cyan-400 font-medium rounded-lg text-lg p-2 text-center cursor-pointer">
          <GrFormView size="1em" />
        </div>
      </Link>
    </Tooltip>
  );
}

export default ViewIconBtn;
