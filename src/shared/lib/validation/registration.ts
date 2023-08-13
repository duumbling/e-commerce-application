import {
  string,
  date,
  ref,
  type StringSchema,
  type AnyObject,
  type DateSchema,
} from "yup";

const PASSWORD_MIN_LENGTH = 8;

const getPasswordCharacterValidationError = (
  characterMessage: string,
): string => `Пароль должен содержать хотя бы 1 ${characterMessage}`;

export const matchOnlyAlphabeticCharacters = (
  schema: StringSchema<string, AnyObject, undefined, "">,
): StringSchema<string, AnyObject, undefined, ""> => {
  return schema.matches(
    /^[a-zа-яё]/i,
    "Поле должно содержать только символы алфавита",
  );
};

export const validateName = (requiredMessage: string) =>
  matchOnlyAlphabeticCharacters(string().required(requiredMessage));

export const validateEmail = (): StringSchema<
  string,
  AnyObject,
  undefined,
  ""
> => string().required("Введите email").email();

export const validatePassword = (): StringSchema<
  string,
  AnyObject,
  undefined,
  ""
> =>
  string()
    .required("Введите пароль")
    .min(PASSWORD_MIN_LENGTH, "Пароль должен содержать минимум 8 символов")
    .matches(/[0-9]/, getPasswordCharacterValidationError("цифру"))
    .matches(/[a-zа-яё]/, getPasswordCharacterValidationError("строчную букву"))
    .matches(
      /[A-ZА-ЯЁ]/,
      getPasswordCharacterValidationError("прописную букву"),
    );

export const validatePasswordConfirm = (): StringSchema<
  string,
  AnyObject,
  undefined,
  ""
> =>
  string()
    .required("Подтвердите пароль")
    .oneOf([ref("password")], "Пароли не совпадают");

export const validateDate = (): DateSchema<
  Date | null,
  AnyObject,
  undefined,
  ""
> => {
  return date().required().nullable().typeError("Введите дату рождения");
};
