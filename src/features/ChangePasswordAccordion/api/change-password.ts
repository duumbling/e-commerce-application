import { customerDataApiRoot, loginApiRoot } from "../../../shared/api/apiRoot";
import { loginCustomer } from "../../../shared/api";
import { resetCustomerTokenCache } from "../../../shared/api/tokens/helpers";

export const changeCustomerPassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const {
    body: { email, version },
  } = await customerDataApiRoot().me().get().execute();

  await loginApiRoot(email, currentPassword)
    .me()
    .password()
    .post({
      body: {
        currentPassword,
        newPassword,
        version,
      },
    })
    .execute();

  resetCustomerTokenCache();

  return await loginCustomer({ email, password: newPassword });
};
