import fetch from "node-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL ?? "",
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY ?? "",
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID ?? "",
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET ?? "",
  },
  scopes: [process.env.REACT_APP_CTP_SCOPES ?? ""],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL ?? "",
  fetch,
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY ?? "",
});
