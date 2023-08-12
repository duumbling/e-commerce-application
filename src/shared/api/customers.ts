import {
  type ClientResponse,
  type MyCustomerDraft,
  type CustomerSignInResult,
} from "@commercetools/platform-sdk";

import { anonymousApiRoot } from "./apiRoot";

export const createCustomer = async (
  customerData: MyCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await anonymousApiRoot()
    .me()
    .signup()
    .post({ body: customerData })
    .execute();
};
