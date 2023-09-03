import { type Address, type Customer } from "@commercetools/platform-sdk";
import { type AddressInformation } from "../../../../features/AddressCard";

export const setAddressInformation = (
  customer: Customer,
  currentAddress: Address,
): AddressInformation => {
  if (currentAddress.id != null) {
    const isBilling = customer.billingAddressIds?.includes(currentAddress.id);
    const isShipping = customer.shippingAddressIds?.includes(currentAddress.id);
    const isBillingDefault =
      customer.defaultBillingAddressId === currentAddress.id;
    const isShippingDefault =
      customer.defaultShippingAddressId === currentAddress.id;
    return { isBilling, isShipping, isBillingDefault, isShippingDefault };
  }
  return {
    isBilling: false,
    isShipping: false,
    isBillingDefault: false,
    isShippingDefault: false,
  };
};
