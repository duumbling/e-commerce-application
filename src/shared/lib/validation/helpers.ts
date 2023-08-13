import { type StringSchema, type AnyObject } from "yup";

export const matchOnlyAlphabeticCharacters = (
  schema: StringSchema<string, AnyObject, undefined, "">,
): StringSchema<string, AnyObject, undefined, ""> => {
  return schema.matches(
    /^[a-zа-яё]/i,
    "Поле должно содержать только символы алфавита",
  );
};

export const matchMinimumOneCharacter = (
  schema: StringSchema<string, AnyObject, undefined, "">,
): StringSchema<string, AnyObject, undefined, ""> => {
  return schema.min(1, "Поле должно содержать хотя бы 1 символ");
};
