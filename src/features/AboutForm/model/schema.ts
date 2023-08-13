import { boolean, object, string } from "yup";
import {
  validateBirthday,
  validateEmail,
  validateName,
} from "../../../shared/lib/validation";

export const aboutValidationSchema = object({
  firstName: validateName("Введите имя"),
  lastName: validateName("Введите фамилию"),
  userBirthday: validateBirthday(),
  showEmail: boolean(),
  userEmail: string().when("showEmail", {
    is: true,
    then: () => validateEmail(),
  }),
});
