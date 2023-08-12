import { type AddressFormValues } from "../../../features/AddressForm";

export enum AddressType {
  SHIPPING,
  BILLING,
}

export interface RegistrationFormValues extends AddressFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  userBirthday: string;
}
