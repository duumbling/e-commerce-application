import { type FormError } from "../../../shared/lib/errors";

export const isLoginError = (obj: Error): obj is FormError =>
  Object.prototype.hasOwnProperty.call(obj, "body");

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && isLoginError(error)) {
    const { errors } = error.body;
    if (
      errors[0].message ===
      "Customer account with the given credentials not found."
    ) {
      return "Пользователь не найден";
    }
  }
  return "Упс, что-то пошло не так";
};
