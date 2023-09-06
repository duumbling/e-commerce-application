import { type TokenStore, type TokenCache } from "@commercetools/sdk-client-v2";

const TOKEN_KEY = "fo-user_token";
const ANONYMOUS_TOKEN_KEY = "fo-user-anonymous-token";

class MyTokenCache implements TokenCache {
  private readonly tokenKey: string;

  myCache: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: "",
  };

  public constructor(key: string) {
    this.tokenKey = key;
    const savedToken = localStorage.getItem(key);
    if (savedToken !== null) {
      this.set(JSON.parse(savedToken));
    }
  }

  set(newCache: TokenStore) {
    this.myCache = newCache;
    localStorage.setItem(this.tokenKey, JSON.stringify(newCache));
  }

  get() {
    return this.myCache;
  }
}

export const customerTokenCache = new MyTokenCache(TOKEN_KEY);
export const anonymousTokenCache = new MyTokenCache(ANONYMOUS_TOKEN_KEY);
