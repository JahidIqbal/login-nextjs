"use client";

import { ReactNode } from "react";
import { BsBuilding, BsShieldCheck, BsWallet } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import {LiaCarAltSolid, LiaExchangeAltSolid, LiaFileAlt, LiaFileMedicalSolid, LiaHospitalAltSolid, LiaLightbulbSolid, LiaMobileSolid, LiaMoneyBillWaveSolid, LiaPiggyBankSolid, LiaSdCardSolid, LiaTrainSolid } from "react-icons/lia";
import { getLoggedUser } from "@/services/LoggedUserClient";
import { usePathname } from "next/navigation";
import { trimChar } from "@/utils/StringUtils";
import { GrDocument } from "react-icons/gr";
import { MdOutlineLandslide } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


export interface MenuType {
  key: string;
  baseUrl: string;
  label: string;
  pageTitle?: string;
  icon: ReactNode;
  canAccess: boolean;
  subMenus?: Omit<MenuType, "subMenus">[];
}

export default function getMenus(): MenuType[] {
  const user = getLoggedUser();

  return [
    {
      key: "dashboard",
      baseUrl: "/dashboard",
      label: "Dashboard",
      icon: <GoHomeFill />,
      canAccess: true,
    },
    {
      key: "Banks",
      baseUrl: "/banks",
      label: "Banks",
      icon: <LiaPiggyBankSolid />,
      canAccess: true,
    },
    {
      key: "Wallets",
      baseUrl: "/wallets",
      label: "Wallets",
      icon: <BsWallet />,
      canAccess: true,
    },

    {
      key: "MFS",
      baseUrl: "/mfs",
      label: "MFS",
      icon: <LiaMobileSolid />,
      canAccess: true,
    },
    {
      key: "Utilities",
      baseUrl: "/utilities",
      label: "Utilities",
      icon: <LiaLightbulbSolid />,
      canAccess: true,
    },
    {
      key: "Insurance",
      baseUrl: "/insurance",
      label: "Insurance",
      icon: <BsShieldCheck />,
      canAccess: true,
    },
    {
      key: "Travel Services",
      baseUrl: "/travel-services",
      label: "Travel Services",
      icon: <LiaTrainSolid />,
      canAccess: true,
    },
    {
      key: "Medical Services",
      baseUrl: "/medical-services",
      label: "Medical Services",
      icon: <LiaHospitalAltSolid />,
      canAccess: true,
    },

    {
      key: "Government Services",
      baseUrl: "/government-services",
      label: "Government Services",
      icon: <BsBuilding />,
      canAccess: true,
    },
    {
      key: "Social safety net",
      baseUrl: "/social-safety-net",
      label: "Social safety Services",
      icon: <GrDocument />,
      canAccess: true,
    },
    {
      key: "Land services",
      baseUrl: "/land-services",
      label: "Land services",
      icon: <MdOutlineLandslide />,
      canAccess: true,
    },
    {
      key: "Transaction History",
      baseUrl: "/transactions",
      label: "Transaction History",
      icon: <FaHistory />,
      canAccess: true,
    },
    
  ];
}

function getTitleForNonMenuPages(pathname: string) {
  const isActivePath = (path: string) => {
    return pathname.includes(path);
  };

  return isActivePath("profile") ? "Profile" : "Admin Panel";
}

export function getPageTitle() {
  const pathname = usePathname();

  const isActive = (m: MenuType) => pathname.includes(trimChar(m.baseUrl, "/"));
  const getTitle = (m: MenuType) => m.pageTitle ?? m.label;

  const menu = getMenus().find(isActive);

  if (menu == undefined) return getTitleForNonMenuPages(pathname);
  if (menu.subMenus == undefined) return getTitle(menu);

  const submenu = menu.subMenus.find(isActive);
  if (submenu == undefined) return getTitle(menu);
  return getTitle(submenu);
}
