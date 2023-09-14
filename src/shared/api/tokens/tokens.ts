import { type TokenStore, type TokenCache } from "@commercetools/sdk-client-v2";
import { loadTokenStore, saveTokenStore } from "./helpers";

const TOKEN_KEY = "fo-user_token";
const ANONYMOUS_TOKEN_KEY = "fo-user-anonymous-token";

class MyTokenCache implements TokenCache {
  private readonly tokenKey: string;

  private myCache: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: "",
  };

  constructor(key: string) {
    this.tokenKey = key;
    const savedToken = loadTokenStore(key);
    if (savedToken !== null) {
      this.set(savedToken);
    }
  }

  set(newCache: TokenStore) {
    this.myCache = newCache;
    saveTokenStore(this.tokenKey, this.myCache);
  }

  get(): TokenStore {
    return { ...this.myCache };
  }
}

export const customerTokenCache = new MyTokenCache(TOKEN_KEY);
export const anonymousTokenCache = new MyTokenCache(ANONYMOUS_TOKEN_KEY);
