import React, { Fragment } from "react";

import { MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuType } from "./menus";

const SidebarMenuItem = ({ menu }: { menu: MenuType }) => {
  const pathname = usePathname();

  if (menu.subMenus == undefined || menu.subMenus.length == 0)
    return <MenuItemBuilder menu={menu} />;

  return (
    <SubMenu
      icon={menu.icon}
      active={pathname.startsWith(menu.baseUrl)}
      label={menu.label}
    >
      {menu.subMenus.map((menu) => (
        <Fragment key={menu.key}>
          {menu.canAccess && <MenuItemBuilder menu={menu} />}
        </Fragment>
      ))}
    </SubMenu>
  );
};

const MenuItemBuilder = ({ menu }: { menu: MenuType }) => {
  const pathname = usePathname();

  return (
    <MenuItem
      icon={menu.icon}
      component={<Link href={menu.baseUrl} />}
      active={pathname == menu.baseUrl}
      
    >
      {menu.label}
    </MenuItem>
  );
};

export default SidebarMenuItem;
