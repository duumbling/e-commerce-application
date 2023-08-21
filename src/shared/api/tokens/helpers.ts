import { customerTokenCache } from "./tokens";

export const resetCustomerTokenCache = (): void => {
  customerTokenCache.set({
    token: "",
    expirationTime: 0,
    refreshToken: "",
  });
};
