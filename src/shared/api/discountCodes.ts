import { apiRoot } from "./apiRoot";

export const getDiscountCodes = async () => {
  return await apiRoot().discountCodes().get().execute();
};
