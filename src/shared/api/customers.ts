import {
  type MyCustomerUpdate,
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
  type MyCustomerSignin,
  type Address,
} from "@commercetools/platform-sdk";

import { apiRoot, customerDataApiRoot, loginApiRoot } from "./apiRoot";
import { getUserBirthdayFormattedString } from "../../widgets/registration-form/lib/helpers";

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
  cartId: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const response = await loginApiRoot(loginData.email, loginData.password)
    .login()
    .post({
      body: {
        ...loginData,
        updateProductData: true,
        anonymousCart: {
          id: cartId,
          typeId: "cart",
        },
      },
    })
    .execute();
  console.log(response);
  return response;
};

export const getCustomerData = async () => {
  const data = await customerDataApiRoot().me().get().execute();
  console.log(data);
  return data;
};

export const addAddress = async (
  key: string,
  addressData: Address,
  version: number,
) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "addAddress",
        address: {
          key,
          streetName: addressData.streetName,
          postalCode: addressData.postalCode,
          city: addressData.city,
          country: addressData.country === "Россия" ? "RU" : "BY",
        },
      },
    ],
  };
  return await customerDataApiRoot().me().post({ body }).execute();
};

export const removeAddress = async (addressId: string, version: number) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "removeAddress",
        addressId,
      },
    ],
  };
  return await customerDataApiRoot().me().post({ body }).execute();
};

export const changeAddressData = async (
  addressData: Address,
  addressId: string,
  version: number,
) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "changeAddress",
        addressId,
        address: {
          streetName: addressData.streetName,
          postalCode: addressData.postalCode,
          city: addressData.city,
          country: addressData.country === "Россия" ? "RU" : "BY",
        },
      },
    ],
  };
  return await customerDataApiRoot().me().post({ body }).execute();
};

export const changeAddressisShipping = async (
  isShipping: boolean | undefined,
  addressId: string,
  version: number,
) => {
  if (isShipping !== undefined) {
    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: isShipping
            ? "addShippingAddressId"
            : "removeShippingAddressId",
          addressId,
        },
      ],
    };
    return await customerDataApiRoot().me().post({ body }).execute();
  }
};

export const changeAddressisBilling = async (
  isBilling: boolean | undefined,
  addressId: string,
  version: number,
) => {
  if (isBilling !== undefined) {
    const body: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: isBilling ? "addBillingAddressId" : "removeBillingAddressId",
          addressId,
        },
      ],
    };
    return await customerDataApiRoot().me().post({ body }).execute();
  }
};

export const setDefaultBillingAddress = async (
  isBillingDefault: boolean | undefined,
  addressId: string,
  version: number,
) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "setDefaultBillingAddress",
        addressId,
      },
    ],
  };
  if (isBillingDefault === true) {
    return await customerDataApiRoot().me().post({ body }).execute();
  } else if (isBillingDefault === false) {
    console.log("[");
    const response = await changeAddressisBilling(false, addressId, version);
    return await changeAddressisBilling(
      true,
      addressId,
      response?.body.version ?? 0,
    );
  }
};

export const setDefaultShippingAddress = async (
  isShippingDefault: boolean | undefined,
  addressId: string,
  version: number,
) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "setDefaultShippingAddress",
        addressId,
      },
    ],
  };
  if (isShippingDefault === true) {
    return await customerDataApiRoot().me().post({ body }).execute();
  } else if (isShippingDefault === false) {
    console.log("[");
    const response = await changeAddressisShipping(false, addressId, version);
    return await changeAddressisShipping(
      true,
      addressId,
      response?.body.version ?? 0,
    );
  }
};

export const updateCustomerPersonalInformation = async (
  version: number,
  email: string,
  firstName: string,
  lastName: string,
  date: Date | null,
) => {
  const body: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: "changeEmail",
        email,
      },
      {
        action: "setFirstName",
        firstName,
      },
      {
        action: "setLastName",
        lastName,
      },
      {
        action: "setDateOfBirth",
        dateOfBirth: getUserBirthdayFormattedString(date),
      },
    ],
  };
  return await customerDataApiRoot().me().post({ body }).execute();
};
