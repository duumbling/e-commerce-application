export interface AddressFormValues {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface AddressFormContext {
  shippingAddress: AddressFormValues;
  billingAddress: AddressFormValues;
}
