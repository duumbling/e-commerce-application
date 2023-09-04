import { type AddressFormValues } from "../../../widgets/profile/index";

export interface AddressInformation {
  isBilling?: boolean;
  isShipping?: boolean;
  isBillingDefault?: boolean;
  isShippingDefault?: boolean;
  [key: string]: boolean | undefined;
}

export interface ProductCardProps {
  id: string | undefined;
  addressTitle: string;
  addressInfo: AddressInformation;
  addressData: AddressFormValues & {
    version: number;
  };
  updateCardsList: () => Promise<void>;
}
