import { TokenManager } from "@/api/TokenManager";
import { LoggedInUser, User } from "@/types/User";
import { cookies } from "next/headers";
import { LoggedUserCookieStoreKey } from "./Consts";

const loggedUserCookieStore = {
  cookieKey: LoggedUserCookieStoreKey,
  set: async (user: User) => {
    const cookie = await cookies();
    cookie.set(loggedUserCookieStore.cookieKey, JSON.stringify(user), {});
  },
  get: async () => {
    const cookie = await cookies();
    const user = cookie.get(loggedUserCookieStore.cookieKey)?.value;
    if (!user) return undefined;
    return JSON.parse(user) as User;
  },
  has: async () => {
    const cookie = await cookies();
    return cookie.has(loggedUserCookieStore.cookieKey);
  },
  remove: async () => {
    const cookie = await cookies();
    cookie.delete(loggedUserCookieStore.cookieKey);
  },
};

const isLoggedIn = async () => {
  return await TokenManager.hasValid();
};

const isNotLoggedIn = async () => {
  return !(await isLoggedIn());
};

const login = async (user: LoggedInUser) => {
  try {
    if (!user?.user?.id) {
      throw new Error('User data is missing required fields');
    }

    await TokenManager.set({
      id: user.user.id,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });

    await loggedUserCookieStore.set(user.user);
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw for calling code to handle
  }
};

const logout = async () => {
  await TokenManager.remove();
  await loggedUserCookieStore.remove();
};

const getLoggedUser = async (): Promise<User | undefined> => {
  return await loggedUserCookieStore.get();
};

const AuthManager = {
  login,
  logout,
  isLoggedIn,
  isNotLoggedIn,
  getLoggedUser,

};

export default AuthManager;
