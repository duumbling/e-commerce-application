import { type AddressFormValues } from "../../../features/AddressForm";

export enum AddressType {
  SHIPPING,
  BILLING,
}

export interface RegistrationFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  userBirthday: Date | null;
  shippingAddress: AddressFormValues;
  billingAddress: AddressFormValues;
}
