import { type TokenStore, type TokenCache } from "@commercetools/sdk-client-v2";

class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: "",
    expirationTime: 0,
    refreshToken: "",
  };

  set(newCache: TokenStore) {
    this.myCache = newCache;
  }

  get() {
    return this.myCache;
  }
}
export const customerTokenCache = new MyTokenCache();
