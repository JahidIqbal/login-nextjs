"use client";

import React, { useState, Fragment } from "react";
import { Button } from "@heroui/react";
import { Sidebar as BaseSidebar, Menu } from "react-pro-sidebar";
import { RiMenu5Fill } from "react-icons/ri";
import getMenus from "./menus";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar: React.FC = () => {
  const [expend, setExpend] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg-black w-[310px]">
      <Button
        className="md:hidden absolute z-20 top-0"
        variant="light"
        isIconOnly
      >
        <RiMenu5Fill className="w-5 h-5" />
      </Button>
      <BaseSidebar
        toggled={toggle}
        breakPoint="sm"
        collapsed={expend}
        onBackdropClick={handleToggle}
        width={"315px"}
        className="pt-6 px-4 overflow-y-hidden"
      >
        <div className="flex flex-col justify-between ">
          <Menu
            className="gap-4 "
            menuItemStyles={{
              icon: ({ active }) => ({
                color: active ? "#ffffff" : "#ffffff",
                fontSize: "1.4rem",
              }),
              label: ({ active }) => ({
                fontSize: ".9rem",
                color: active ? "#ffffff" : "#ffffff",
                fontWeight: active ? "600" : "400",
              }),
              button: ({ active }) => ({
                 backgroundColor: active ? "#333333" : "#000000",
                color: "#ffffff", 
                ":hover": {
                  backgroundColor: active ? "#808080" : "#808080", 
                },
              }),
            }}
          >
            {getMenus().map((menu) => (
              <Fragment key={menu.key}>
                {menu.canAccess && <SidebarMenuItem menu={menu} />}
              </Fragment>
            ))}
          </Menu>
        </div>
      </BaseSidebar>
    </div>
  );
};

export default Sidebar;
