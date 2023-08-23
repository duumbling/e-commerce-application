import { type TokenStore, type TokenCache } from "@commercetools/sdk-client-v2";

const TOKEN_KEY = "user_token";

class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: "",
  };

  public constructor() {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken !== null) {
      this.set(JSON.parse(savedToken));
    }
  }

  set(newCache: TokenStore) {
    this.myCache = newCache;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(newCache));
  }

  get() {
    return this.myCache;
  }
}
export const customerTokenCache = new MyTokenCache();
