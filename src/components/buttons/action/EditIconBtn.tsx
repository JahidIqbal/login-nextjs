"use client";

import { Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";

interface Props {
  redirectUrl?: string;
  onClick?: () => void;
}

function EditIconBtn({ redirectUrl, onClick }: Props) {
  if (redirectUrl) {
    return (
      <Tooltip content="Edit">
        <Link href={redirectUrl}>
          <div className="text-white bg-purple-500 hover:bg-purple-600 font-bold rounded-lg text-lg p-2 text-center cursor-pointer transition-colors">
            <CiEdit size="1em" />
          </div>
        </Link>
      </Tooltip>
    );
  } else if (onClick) {
    return (
      <Tooltip content="Edit">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick();
          }}
          className="text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-lg text-lg p-2 text-center cursor-pointer transition-colors"
        >
          <CiEdit size="1em" />
        </button>
      </Tooltip>
    );
  } else {
    return null;
  }
}

export default EditIconBtn;
