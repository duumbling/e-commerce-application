import { type AboutFormValues } from "../../../features/AboutForm";
import { type AddressFormValues } from "../../../features/AddressForm";

export enum AddressType {
  SHIPPING,
  BILLING,
}

export type RegistrationFormValues = Omit<AboutFormValues, "userEmail"> & {
  email: string;
  password: string;
  passwordConfirm: string;
  shippingAddress: AddressFormValues;
  billingAddress: AddressFormValues;
};
