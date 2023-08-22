import { object, string } from "yup";
import { matchOnlyAlphabeticCharacters } from "../../../shared/lib/validation";

const POSTAL_CODE_LENGTH = 6;

export const addressFormValidationSchema = object({
  country: string().required("Выберите страну"),
  city: matchOnlyAlphabeticCharacters(string().required("Введите город")),
  streetName: string().required("Введите название улицы"),
  postalCode: string()
    .required("Введите почтовый индекс")
    .max(
      POSTAL_CODE_LENGTH,
      `Идекс должен содержать ${POSTAL_CODE_LENGTH} цифр`,
    )
    .min(
      POSTAL_CODE_LENGTH,
      `Идекс должен содержать ${POSTAL_CODE_LENGTH} цифр`,
    ),
});
