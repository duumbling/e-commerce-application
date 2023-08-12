import { type ErrorObject } from "@commercetools/platform-sdk";

export enum ErrorType {
  BAD_REQUEST = 400,
}

export interface RegistrationError extends Error {
  code: ErrorType;
  headers: HeadersInit;
  body: {
    errors: ErrorObject[];
    message: string;
    statusCode: ErrorType;
  };
}
