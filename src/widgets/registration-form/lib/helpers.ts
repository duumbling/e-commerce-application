import { type RegistrationError } from "../../../shared/lib/errors";

export const isRegistrationError = (obj: Error): obj is RegistrationError =>
  "body" in obj;

export const getUserBirthdayFormattedString = (date: Date | null): string => {
  if (!(date instanceof Date)) {
    return "";
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && isRegistrationError(error)) {
    const { errors } = error.body;
    if (errors[0].code === "DuplicateField" && errors[0].field === "email") {
      return "Пользователь с таким email уже зарегистрирован";
    }
  }
  return "Упс, что-то пошло не так";
};
