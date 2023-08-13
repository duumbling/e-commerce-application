import { object, string } from "yup";
import { matchOnlyAlphabeticCharacters } from "./helpers";

export const addressSchema = object({
  country: string().required("Выберите страну"),
  city: matchOnlyAlphabeticCharacters(string().required("Введите город")),
  streetName: string().required("Введите улицу"),
  postalCode: string().required("Введите почтовый индекс"),
});
