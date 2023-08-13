import { object } from "yup";
import {
  validateDate,
  validateEmail,
  validateName,
} from "../../../shared/lib/validation";

export const aboutValidationSchema = object({
  firstName: validateName("Введите имя"),
  lastName: validateName("Введите фамилию"),
  userBirthday: validateDate(),
  userEmail: validateEmail(),
});
