import config from "@/types/Config";
import { buildHttpError, HttpError, isUnauthorized } from "./HttpStatusChecks";
import logger from "@/services/Logger";
import { HttpHeaders, HttpMethod, Result } from "./Types";
import { buildFetchOptions } from "./RequestBuilder";
import { TokenManager, TokenRefresher } from "./TokenManager";
import { Tokens } from "@/types/User";
import { ContentType } from "./ContentType";

const callRefreshToken = async () => {
  const token = await TokenManager.getRefreshToken();

  if (!token) {
    await TokenRefresher.handleUnauthorized();
    return;
  }

  const refreshRequest = call<Tokens>(
    HttpMethod.post,
    TokenRefresher.url,
    {},
    {
      token,
    },
    false,
    false
  );

  await TokenRefresher.refresh(refreshRequest);
};

const call = async <T>(
  method: HttpMethod,
  uri: string | (() => string),
  headers: HttpHeaders,
  body: object | undefined = undefined,
  shouldRefresh: boolean = true,
  withAuth: boolean = true
): Promise<T> => {
  const options = await buildFetchOptions(method, headers, body, withAuth);
  const url = typeof uri === "string" ? config.makeApiUrl(uri) : uri();

  const apiCallStartLog = { url, method, headers: options.headers, body };
  logger.apiCallStart(apiCallStartLog);

  const res = await fetch(url, options);

  if (isUnauthorized(res.status) && shouldRefresh) {
    await callRefreshToken();
    return call(method, uri, headers, body, false);
  }

  if (!ContentType.isResponseJson(res)) {
    const blob = await res.blob();
    return blob as unknown as T;
  }

  let data = {};
  try {
    data = await res.json();
  } catch (e) {
    data = { message: res.statusText };
    logger.apiFinishedError({ ...apiCallStartLog, status: res.status, data });
    throw buildHttpError(res.status, data);
  }

  if (!res.ok) {
    logger.apiFinishedError({ ...apiCallStartLog, status: res.status, data });
    throw buildHttpError(res.status, data);
  }

  logger.apiFinishedSuccess({ ...apiCallStartLog, status: res.status, data });
  return data as T;
};

export function get<T>(uri: string, headers: HttpHeaders = {}): Promise<T> {
  return call(HttpMethod.get, uri, headers);
}

export function post<T>(
  uri: string,
  body: object,
  headers: HttpHeaders = {}
): Promise<T> {
  return call(HttpMethod.post, uri, headers, body);
}

export function put<T>(
  uri: string,
  body: object,
  headers: HttpHeaders = {}
): Promise<T> {
  return call(HttpMethod.put, uri, headers, body);
}

export function patch<T>(
  uri: string,
  body: object,
  headers: HttpHeaders = {}
): Promise<T> {
  return call(HttpMethod.patch, uri, headers, body);
}

export function del<T>(uri: string, headers: HttpHeaders = {}): Promise<T> {
  return call(HttpMethod.del, uri, headers);
}

type Runnable<T> = () => Promise<
  { responseData?: T; successMessage?: string } | undefined | void
>;

export async function callGuardedApi<T>(
  runnable: Runnable<T>
): Promise<Result<T>> {
  let success = false;
  let successMessage = undefined;
  let responseData = undefined;
  try {
    const result = await runnable();
    responseData = result?.responseData;
    successMessage = result?.successMessage;
    success = true;
  } catch (e) {
    if (e instanceof HttpError) {
      return { error: e.message, success: undefined };
    }
    throw e;
  } finally {
    if (success) {
      return {
        error: undefined,
        success: successMessage ?? "Successful",
        responseData,
      };
    }
  }
  return {
    error: undefined,
    success: successMessage ?? "Successful",
    responseData,
  };
}
