import {
  type ClientResponse,
  type MyCustomerDraft,
  type CustomerSignInResult,
  type MyCustomerSignin,
} from "@commercetools/platform-sdk";

import { anonymousApiRoot, loginApiRoot } from "./apiRoot";

export const createCustomer = async (
  customerData: MyCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await anonymousApiRoot()
    .me()
    .signup()
    .post({ body: customerData })
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
