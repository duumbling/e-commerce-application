import { object, type ObjectSchema } from "yup";
import { type addressFormValues } from "./types";
import { addressFormValidationSchema } from "../../../../features/AddressForm";

export const addressFormSchema: ObjectSchema<addressFormValues> = object()
  .shape({
    address: addressFormValidationSchema,
  })
  .required();
