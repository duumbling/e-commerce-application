import {
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
} from "@commercetools/platform-sdk";
import { apiRoot } from "./apiRoot";

export const createCustomer = async (
  customerData: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await apiRoot.customers().post({ body: customerData }).execute();
};
