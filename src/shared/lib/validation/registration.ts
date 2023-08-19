import {
  string,
  date,
  ref,
  type StringSchema,
  type AnyObject,
  type DateSchema,
} from "yup";

const PASSWORD_MIN_LENGTH = 8;
const USER_MIN_YEARS = 13;

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
> => string().required("Введите email").email("Введите корректный email адрес");

export const validatePassword = (): StringSchema<
  string,
  AnyObject,
  undefined,
  ""
> =>
  string()
    .required("Введите пароль")
    .min(
      PASSWORD_MIN_LENGTH,
      `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`,
    )
    .matches(/[0-9]/, getPasswordCharacterValidationError("цифру"))
    .matches(/[a-zа-яё]/, getPasswordCharacterValidationError("строчную букву"))
    .matches(
      /[A-ZА-ЯЁ]/,
      getPasswordCharacterValidationError("прописную букву"),
    )
    .matches(
      /[!@#$%^&*]/,
      "Пароль должен содержать хотя бы один специальный символ",
    )
    .test(
      "trimmed",
      "В начале и конце пароля должны отсутствовать пробелы",
      (value) => value.trim() === value,
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

export const validateBirthday = (): DateSchema<
  Date | null,
  AnyObject,
  undefined,
  ""
> => {
  return date()
    .required()
    .nullable()
    .typeError("Введите дату рождения")
    .max(new Date(), "Введите правильную дату")
    .test(
      "birthday",
      `Регистрация доступна только с ${USER_MIN_YEARS} лет`,
      (date) => {
        if (date === null) {
          return false;
        }
        const currentDate = new Date();
        const userDate = new Date(date);
        const month = currentDate.getMonth() - userDate.getMonth();
        let age = currentDate.getFullYear() - userDate.getFullYear();
        if (
          month < 0 ||
          (month === 0 && currentDate.getDate() < userDate.getDate())
        ) {
          age -= 1;
        }
        return age >= USER_MIN_YEARS;
      },
    );
};
