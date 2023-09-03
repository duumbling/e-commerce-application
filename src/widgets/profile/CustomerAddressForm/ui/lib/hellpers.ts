import {
  changeAddressisBilling,
  changeAddressisShipping,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
} from "../../../../../shared/api/customers";
import { type AddressInformation } from "../../../../../features/AddressCard/";
import {
  type ClientResponse,
  type Customer,
} from "@commercetools/platform-sdk";

interface AddressFunctions {
  isBilling: (
    options: BillingOptions,
  ) => Promise<ClientResponse<Customer> | undefined>;
  isShipping: (
    options: ShippingOptions,
  ) => Promise<ClientResponse<Customer> | undefined>;
  isBillingDefault: (
    options: DefaultBillingOptions,
  ) => Promise<ClientResponse<Customer> | undefined>;
  isShippingDefault: (
    options: DefaultShippingOptions,
  ) => Promise<ClientResponse<Customer> | undefined>;
}

interface BillingOptions {
  status: boolean | undefined;
  addressID: string;
  currentVersion: number;
}

interface ShippingOptions {
  status: boolean | undefined;
  addressID: string;
  currentVersion: number;
}

interface DefaultBillingOptions {
  status: boolean | undefined;
  addressID: string;
  currentVersion: number;
}

interface DefaultShippingOptions {
  status: boolean | undefined;
  addressID: string;
  currentVersion: number;
}

const addressFunctions: AddressFunctions = {
  isBilling: async ({
    status,
    addressID,
    currentVersion,
  }: BillingOptions): Promise<ClientResponse<Customer> | undefined> => {
    return await changeAddressisBilling(status, addressID, currentVersion);
  },
  isShipping: async ({
    status,
    addressID,
    currentVersion,
  }: ShippingOptions): Promise<ClientResponse<Customer> | undefined> => {
    return await changeAddressisShipping(status, addressID, currentVersion);
  },
  isShippingDefault: async ({
    status,
    addressID,
    currentVersion,
  }: DefaultShippingOptions): Promise<ClientResponse<Customer> | undefined> => {
    return await setDefaultShippingAddress(status, addressID, currentVersion);
  },
  isBillingDefault: async ({
    status,
    addressID,
    currentVersion,
  }: DefaultBillingOptions): Promise<ClientResponse<Customer> | undefined> => {
    return await setDefaultBillingAddress(status, addressID, currentVersion);
  },
};

export const billingStatusHandler = async (
  addressID: string,
  currentVersion: number,
  currentStatus: AddressInformation,
  versionUpdate: (count: number) => void,
): Promise<ClientResponse<Customer> | undefined> => {
  const response = await addressFunctions.isBilling({
    status: !(currentStatus.isBilling ?? false),
    addressID,
    currentVersion,
  });
  versionUpdate(response?.body.version ?? 0);
  return response;
};

export const shippingStatusHandler = async (
  addressID: string,
  currentVersion: number,
  currentStatus: AddressInformation,
  versionUpdate: (count: number) => void,
): Promise<ClientResponse<Customer> | undefined> => {
  const response = await addressFunctions.isShipping({
    status: !(currentStatus.isShipping ?? false),
    addressID,
    currentVersion,
  });
  versionUpdate(response?.body.version ?? 0);
  return response;
};

export const billingDefaultStatusHandler = async (
  addressID: string,
  currentVersion: number,
  currentStatus: AddressInformation,
  versionUpdate: (count: number) => void,
): Promise<ClientResponse<Customer> | undefined> => {
  const response = await addressFunctions.isBillingDefault({
    status: !(currentStatus.isBillingDefault ?? false),
    addressID,
    currentVersion,
  });
  versionUpdate(response?.body.version ?? 0);
  return response;
};

export const shippingDefaultStatusHandler = async (
  addressID: string,
  currentVersion: number,
  currentStatus: AddressInformation,
  versionUpdate: (count: number) => void,
): Promise<ClientResponse<Customer> | undefined> => {
  const response = await addressFunctions.isShippingDefault({
    status: !(currentStatus.isShippingDefault ?? false),
    addressID,
    currentVersion,
  });
  if (response?.body.version !== undefined) {
    versionUpdate(response?.body.version);
  }
  console.log(response?.body.version);
  return response;
};
