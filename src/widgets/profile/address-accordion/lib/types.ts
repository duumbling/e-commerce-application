import { type Customer } from "@commercetools/platform-sdk";

export interface CustomerProps {
  customerData?: Customer;
  setCustomerData: (customerData: Customer) => void;
}
