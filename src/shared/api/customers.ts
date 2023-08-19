import {
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
  type MyCustomerSignin,
} from "@commercetools/platform-sdk";

import { anonymousApiRoot, loginApiRoot } from "./apiRoot";

} from "@commercetools/platform-sdk";

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

export const loginCustomer = async (
  loginData: MyCustomerSignin,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await loginApiRoot(loginData.email, loginData.password)
    .me()
    .login()
    .post({ body: loginData })
    .execute();
};
