import { object } from "yup";
import {
  validateBirthday,
  validateEmail,
  validateName,
} from "../../../shared/lib/validation";

export const aboutValidationSchema = object({
  firstName: validateName("Введите имя"),
  lastName: validateName("Введите фамилию"),
  userBirthday: validateBirthday(),
  userEmail: validateEmail(),
});
