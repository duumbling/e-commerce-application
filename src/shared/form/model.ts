interface AddressFormInputs {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface RegistrationFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: AddressFormInputs;
  billingAddress: AddressFormInputs;
}
