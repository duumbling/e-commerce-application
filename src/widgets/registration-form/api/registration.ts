import { AddressType, type RegistrationFormValues } from "../model/types";
import { createCustomer } from "../../../shared/api";
import { getUserBirthdayFormattedString } from "../lib/helpers";

export const registerCustomer = async (
  formData: RegistrationFormValues,
  isDefaultShippingAddressChecked: boolean,
  isDefaultBillingAddressChecked: boolean,
) => {
  return await createCustomer({
    ...formData,
    dateOfBirth: getUserBirthdayFormattedString(formData.userBirthday),
    addresses: [formData.shippingAddress, formData.billingAddress],
    defaultShippingAddress: isDefaultShippingAddressChecked
      ? AddressType.SHIPPING
      : undefined,
    defaultBillingAddress: isDefaultBillingAddressChecked
      ? AddressType.BILLING
      : undefined,
  });
};
