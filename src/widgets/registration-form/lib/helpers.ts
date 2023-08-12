import { type RegistrationError } from "../../../shared/lib/errors";

export const isRegistrationError = (obj: Error): obj is RegistrationError =>
  "body" in obj;
