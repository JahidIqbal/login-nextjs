
"use server";

import { callGuardedApi, post } from "@/api";
import AuthManager from "@/services/AuthManager";
import { LoggedInUser } from "@/types/User";




const credentialsLogin = async (email : string , password:string) => {
  await AuthManager.logout();
  return callGuardedApi<LoggedInUser>(async () => {
    const res =  await post<LoggedInUser>("/api/login", { 
      email, password 
    });
    console.log("rrrrrrrreeeeeddd",res)
    await AuthManager.login(res);
  });
};

export default credentialsLogin;
