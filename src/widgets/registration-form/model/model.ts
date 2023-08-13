import { type ObjectSchema, object } from "yup";
import { addressSchema } from "../../../shared/lib/validation/address";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateDate,
} from "../../../shared/lib/validation/registration";
import { type RegistrationFormValues } from "./types";

export const formSchema: ObjectSchema<RegistrationFormValues> = object({
  email: validateEmail(),
  password: validatePassword(),
  passwordConfirm: validatePasswordConfirm(),
  firstName: validateName("Введите имя", "Слишком короткое имя"),
  lastName: validateName("Введите фамилию", "Слишком короткая фамилия"),
  userBirthday: validateDate(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});
