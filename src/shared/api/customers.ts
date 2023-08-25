import {
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
  type MyCustomerSignin,
} from "@commercetools/platform-sdk";

import { apiRoot, loginApiRoot } from "./apiRoot";

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
