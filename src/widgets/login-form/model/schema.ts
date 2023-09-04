import { type ObjectSchema, object } from "yup";
import { type LoginFormValues } from "./types";
import {
  validateEmail,
  validatePassword,
} from "../../../shared/lib/validation";

export const formSchema: ObjectSchema<LoginFormValues> = object({
  email: validateEmail(),
  password: validatePassword(),
});
