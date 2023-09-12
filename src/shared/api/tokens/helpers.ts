import { type TokenStore } from "@commercetools/sdk-client-v2";
import { customerTokenCache } from "./tokens";

export const resetCustomerTokenCache = (): void => {
  customerTokenCache.set({
    token: "",
    expirationTime: 0,
    refreshToken: "",
  });
};

export const setCookie = (
  key: string,
  value: string,
  expirationTime: number,
) => {
  document.cookie = `${key}=${value}; expires=${new Date(
    expirationTime,
  ).toUTCString()}`;
};

export const getCookie = (key: string) => {
  let output: string | null = null;

  const regex = new RegExp(`${key}=(.*?)(?:;|$)`, "g");
  const cookieItem = regex.exec(document.cookie);

  if (cookieItem !== null) {
    output = cookieItem[1];
  }

  return output;
};

export const saveTokenStore = (key: string, cache: TokenStore) => {
  setCookie(key, JSON.stringify(cache), cache.expirationTime);
};

export const loadTokenStore = (key: string): TokenStore | null => {
  const cookieItem = getCookie(key);
  if (cookieItem !== null) {
    return JSON.parse(cookieItem);
  }

  return cookieItem;
};

export const isUserAuthenticated = () => customerTokenCache.get().token !== "";
