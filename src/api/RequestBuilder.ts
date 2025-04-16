import { ContentType, shouldBeFormData } from "./ContentType";
import { TokenManager } from "./TokenManager";
import { FetchOption, HttpHeaders, HttpMethod } from "./Types";

const buildFormData = (body: object) => {
  if (body instanceof FormData) return body;

  const data = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v, i) => data.append(`${key}[${i}]`, v));
    } else {
      data.append(key, value);
    }
  });
  return data;
};

const buildPostData = (body: object, headers: HttpHeaders) => {
  return shouldBeFormData(body, headers)
    ? buildFormData(body)
    : JSON.stringify(body);
};

const addBearerHeader = (headers: HttpHeaders, token?: string): HttpHeaders => {
  if ("Authorization" in headers || !token) return headers;

  headers.Authorization = `Bearer ${token}`;
  return headers;
};

const addAuthHeader = async (headers?: HttpHeaders): Promise<HttpHeaders> => {
  return addBearerHeader(
    { ...(headers ?? {}) },
    await TokenManager.getAccessToken()
  );
};

const buildHeader = async (
  headers: HttpHeaders,
  body: object | undefined = undefined,
  withAuth: boolean = true
) => {
  let header = ContentType.set(headers, body);
  if (withAuth) header = await addAuthHeader(header);
  header["Accept-Language"] = "en";
  return header;
};

export const buildFetchOptions = async (
  method: HttpMethod,
  headers: HttpHeaders,
  body: object | undefined = undefined,
  withAuth: boolean = true
) => {
  const header = await buildHeader(headers, body, withAuth);
  const options: FetchOption = {
    method: method,
    headers: header,
  };
  if (body) {
    options.body = buildPostData(body, header);
  }
  return options;
};
