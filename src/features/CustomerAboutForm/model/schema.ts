import { object, string } from "yup";
import {
  validateBirthday,
  validateEmail,
  validateName,
} from "../../../shared/lib/validation";

export const CustomerAboutFormSchema = object({
  firstName: validateName("Введите имя"),
  lastName: validateName("Введите фамилию"),
  userBirthday: validateBirthday(),
  userEmail: string().when("showEmail", {
    is: true,
    then: () => validateEmail(),
  }),
});
