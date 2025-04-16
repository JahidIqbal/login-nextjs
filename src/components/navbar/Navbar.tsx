"use client";

import React, { useState } from "react";
import { RiLogoutCircleRLine, RiLockPasswordLine } from "react-icons/ri";
import { FaCaretDown, FaRegUser } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ClickOutsideDropdown from "../ClickOutsideDropdown";
import { logout } from "./actions/LogoutActions";
import { User } from "@heroui/react";
import styles from "./App.module.css";
import { getLoggedUser } from "@/services/LoggedUserClient";
import { getPageTitle } from "../layout/sidebar/menus";

const Navbar = () => {
  const profileItem =
    "flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { push } = useRouter();

  const user = getLoggedUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    push("/profile");
  };

  const handlePasswordChangeClick = () => {
    push("/profile/change-password");
  };

  const handleLogoutClick = async () => {
    await logout();
    toast.success("Logout successful");
    push("/login");
  };

  return (
    <div className="flex justify-between items-center h-[70px] w-full px-10 border bg-gradient-to-r from-[#7eb456] to-[#7eb456]">
      <div className="flex">
        <span className="text-primary-text text-xl font-bold text-white">
          {getPageTitle()}
        </span>
      </div>

      <div className="flex justify-end items-center gap-6">
        <div className="flex gap-4 items-center">
          <div>
            <h1 className="text-primary-text flex justify-end font-bold text-white">
            Zaytoon
            </h1>
           
          </div>
          <ClickOutsideDropdown
            trigger={
              <div
                onClick={toggleDropdown}
                className="flex justify-center items-center text-2xl hover:text-gray-600 transition-colors duration-200"
              >
                <User
                  name=""
                  description=""
                  avatarProps={{
                    src: "",
                    className: styles.avatarImage,
                  }}
                  className="!gap-0"
                />
                <FaCaretDown />
              </div>
            }
            className="dropdown-wrapper"
          >
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md p-2 transition-opacity duration-300 ease-in-out">
              {/* <button onClick={handleProfileClick} className={profileItem}>
                <FaRegUser /> My Profile
              </button> */}
              <button
                onClick={handlePasswordChangeClick}
                className={profileItem}
              >
                <RiLockPasswordLine /> Change Password
              </button>
              <button onClick={handleLogoutClick} className={profileItem}>
                <RiLogoutCircleRLine /> Logout
              </button>
            </div>
          </ClickOutsideDropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
