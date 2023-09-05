import { object } from "yup";
import {
  validateName,
  validateBirthday,
  validateEmail,
} from "../../../../shared/lib/validation";

export const customerInformationSchema = object({
  firstName: validateName("Введите имя"),
  lastName: validateName("Введите фамилию"),
  userBirthday: validateBirthday(),
  userEmail: validateEmail(),
});
