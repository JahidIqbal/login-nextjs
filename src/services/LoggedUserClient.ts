"use client";

import { getCookie } from "cookies-next/client";
import { LoggedUserCookieStoreKey } from "./Consts";
import { User } from "@/types/User";

export function getLoggedUser() {
  // return JSON.parse(getCookie(LoggedUserCookieStoreKey) as string) as User;
}

export function isUserNotLogged() {
  return getCookie(LoggedUserCookieStoreKey) == undefined;
}
