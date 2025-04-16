"use client";

import React, { ReactNode } from "react";
import { IoIosArrowBack, IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import classNames from "classnames";
import { FaDownload } from "react-icons/fa";
import { Spinner } from "@heroui/react";

interface Props {
  redirect?: string;
  icon?: "add" | "back" | "down" | ReactNode;
  btnType?: string;
  download?: string;
  isLoading?: boolean;
  onClick?: () => void;
  removeMargin?: boolean;
}

const SecondaryBtn: React.FC<Props> = ({
  redirect,
  icon,
  btnType,
  download,
  isLoading = false,
  onClick,
  removeMargin = false,
}) => {
  const createIcon = () => {
    if (icon === "add") {
      return <IoMdAddCircleOutline className="text-white h-4 w-4" />;
    }
    if (icon === "back") {
      return <IoIosArrowBack className="text-white h-4 w-4" />;
    }
    if (icon === "down") {
      return <FaDownload className="text-white h-4 w-4" />;
    }
    return icon ?? null;
  };

  const button = (
    <button
      className={classNames(
        "flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-purple-start to-purple-end",
        "px-3 2xl:px-4 py-2 2xl:py-3",
        {
          "mr-6": icon && !removeMargin,
          "mt-6": !removeMargin,
        }
      )}
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner color="white" size="sm" />
      ) : (
        <>
          {createIcon()}
          <span className="text-white font-medium 2xl:font-bold text-base 2xl:text-lg">
            {btnType}
          </span>
        </>
      )}
    </button>
  );

  if (!redirect) return button;

  return (
    <Link
      href={redirect ?? "#"}
      className="flex justify-end"
      download={download}
    >
      {button}
    </Link>
  );
};

export default SecondaryBtn;
