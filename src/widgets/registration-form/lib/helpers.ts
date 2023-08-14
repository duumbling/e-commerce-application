import { type RegistrationError } from "../../../shared/lib/errors";

export const isRegistrationError = (obj: Error): obj is RegistrationError =>
  "body" in obj;

export const getUserBirthdayFormattedString = (date: Date | null): string => {
  if (!(date instanceof Date)) {
    return "";
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
