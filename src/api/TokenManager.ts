import { Tokens, TokensWithId } from "@/types/User";
import { cookies } from "next/headers";
import { HttpError} from "./HttpStatusChecks";
import { RedirectType, redirect } from "next/navigation";
import redis from "@/services/RedisClient";
import logger from "@/services/Logger";
import { jwtDecode } from "jwt-decode";

const loggedIdCookieStore = {
  cookieKey: "logged_id",
  set: async (token: TokensWithId) => {
    const cookie = await cookies();
    cookie.set(loggedIdCookieStore.cookieKey, JSON.stringify(token));
  },
  get: async () => {
    const cookie = await cookies();
    const token = cookie.get(loggedIdCookieStore.cookieKey)?.value;
    if (!token) return undefined;
    return JSON.parse(token) as TokensWithId;
  },
  has: async () => {
    const cookie = await cookies();
    return cookie.has(loggedIdCookieStore.cookieKey);
  },
  remove: async () => {
    const cookie = await cookies();
    cookie.delete(loggedIdCookieStore.cookieKey);
  },
};

const tokenStore = {
  key: `admin_user_tokens`,
  save: async (tokens: TokensWithId) => {
    await redis.execute((r) =>
      r.hset(tokenStore.key, tokens.id?.toString(), JSON.stringify(tokens))
    );
  },
  find: async (user: TokensWithId): Promise<TokensWithId | undefined> => {
    const tokens = await redis.execute((r) =>
      r.hget(tokenStore.key, user.id.toString())
    );
    if (!tokens) return undefined;
    return JSON.parse(tokens) as TokensWithId;
  },
  delete: async (user: TokensWithId) => {
    await redis.execute((r) => r.hdel(tokenStore.key, user.id.toString()));
  },
};

export class TokenManager {
  private static isValidJwt(token?: string) {
    return true;
  }

  public static async hasValid() {
    if (!loggedIdCookieStore.has()) return false;

    const tokens = await TokenManager.get();
    if (!tokens) return false;

    return TokenManager.isValidJwt(tokens.accessToken);
  }

  public static async get() {
    const cookieUser = await loggedIdCookieStore.get();
    if (!cookieUser) return undefined;

    const user = tokenStore.find(cookieUser);
    if (!user) return undefined;

    return user;
  }

  private static async getTokenField(type: keyof Tokens) {
    const tokens = await TokenManager.get();
    if (!tokens) return undefined;
    return tokens[type];
  }

  public static async getAccessToken() {
    return await TokenManager.getTokenField("accessToken");
  }

  public static async getRefreshToken() {
    return await TokenManager.getTokenField("refreshToken");
  }

  public static async set(user: TokensWithId) {
    await tokenStore.save(user);
    await loggedIdCookieStore.set(user);
  }

  public static async remove() {
    const user = await loggedIdCookieStore.get();
    if (!user) return;

    await tokenStore.delete(user);

    try {
      await loggedIdCookieStore.remove();
    } catch (e) {
      console.log(typeof e);
      logger.error(e);
    }
  }

  public static async update(user: TokensWithId) {
    await tokenStore.save(user);
  }
}

export class TokenRefresher {
  private static ongoingRequests: Record<number, Promise<Tokens>> = {};

  public static url = "api/v1/admin-user/guest/refresh";

  private static doesNotHaveOngoingRequest(userId: number) {
    if (!(userId in TokenRefresher.ongoingRequests)) return true;

    return TokenRefresher.ongoingRequests[userId] === undefined;
  }

  public static getRequest(userId: number, request: Promise<Tokens>) {
    if (TokenRefresher.doesNotHaveOngoingRequest(userId)) {
      TokenRefresher.ongoingRequests[userId] = request;
    }
    return TokenRefresher.ongoingRequests[userId];
  }

  public static removeRequest(userId: number) {
    delete TokenRefresher.ongoingRequests[userId];
  }

  public static async handleUnauthorized() {
    await TokenManager.remove();
    redirect("/dashboard", RedirectType.replace);
  }

  static async refresh(request: Promise<Tokens>) {
    const token = await TokenManager.get();
  
    if (!token?.id) {
      throw new Error("Token or token.id is missing");
    }
  
    const id = token.id;
  
    try {
      const tokens = await TokenRefresher.getRequest(id, request);
      TokenManager.update({ ...tokens, id });
    } catch (e) {
      if (e instanceof HttpError) {
        await TokenRefresher.handleUnauthorized();
      }
      throw e;
    } finally {
      TokenRefresher.removeRequest(id);
    }
  }
  
}
