import { type ObjectSchema, object } from "yup";
import { type RegistrationFormValues } from "./types";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../../../shared/lib/validation";
import { aboutFormValidationSchema } from "../../../features/AboutForm";
import { addressFormValidationSchema } from "../../../features/AddressForm";

export const formSchema: ObjectSchema<RegistrationFormValues> =
  aboutFormValidationSchema.concat(
    object().shape({
      email: validateEmail(),
      password: validatePassword(),
      passwordConfirm: validatePasswordConfirm(),
      shippingAddress: addressFormValidationSchema,
      billingAddress: addressFormValidationSchema,
    }),
  );
