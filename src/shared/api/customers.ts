import {
  type ClientResponse,
  type CustomerSignInResult,
  type CustomerDraft,
} from "@commercetools/platform-sdk";

import { apiRoot } from "./apiRoot";

export const createCustomer = async (
  customerData: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await apiRoot()
    .customers()
    .post({
      body: customerData,
    })
    .execute();
};
