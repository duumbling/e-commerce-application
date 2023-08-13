import { object, string } from "yup";
import { matchOnlyAlphabeticCharacters } from "../../../shared/lib/validation";

export const addressValidationSchema = object({
  country: string().required("Выберите страну"),
  city: matchOnlyAlphabeticCharacters(string().required("Введите город")),
  streetName: string().required("Введите название улицы"),
  postalCode: string().required("Введите почтовый индекс"),
});
