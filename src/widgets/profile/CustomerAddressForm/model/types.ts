export interface AddressFormValues {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface AddressFormContext {
  address: AddressFormValues;
}

export interface Country {
  name: string;
  code: string;
}

export interface addressFormValues {
  address: AddressFormValues;
}
