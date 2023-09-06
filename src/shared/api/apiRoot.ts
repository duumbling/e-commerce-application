import fetch from "node-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type Client,
  type PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { type ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { anonymousTokenCache, customerTokenCache } from "./tokens/tokens";

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL ?? "",
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY ?? "",
  credentials: {
    clientId: process.env.REACT_APP_CTP_CUSTOMER_CLIENT_ID ?? "",
    clientSecret: process.env.REACT_APP_CTP_CUSTOMER_CLIENT_SECRET ?? "",
  },
  scopes: process.env.REACT_APP_CTP_CUSTOMER_SCOPES?.split(" ") ?? [""],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

const createApiBuilderWithProjectKey = (
  client: Client,
): ByProjectKeyRequestBuilder => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: process.env.REACT_APP_CTP_PROJECT_KEY ?? "",
  });
};

export const apiRoot = (): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withClientCredentialsFlow({
      ...authMiddlewareOptions,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderWithProjectKey(client);
};

const PassAuthMiddlewareOptions = (
  email: string,
  password: string,
): PasswordAuthMiddlewareOptions => {
  const options: PasswordAuthMiddlewareOptions = {
    host: process.env.REACT_APP_CTP_AUTH_URL ?? "",
    projectKey: process.env.REACT_APP_CTP_PROJECT_KEY ?? "",
    credentials: {
      clientId: process.env.REACT_APP_CTP_CUSTOMER_CLIENT_ID ?? "",
      clientSecret: process.env.REACT_APP_CTP_CUSTOMER_CLIENT_SECRET ?? "",
      user: {
        username: email,
        password,
      },
    },
    tokenCache: customerTokenCache,
    scopes: process.env.REACT_APP_CTP_CUSTOMER_SCOPES?.split(" ") ?? [""],
    fetch,
  };
  return options;
};

export const loginApiRoot = (
  email: string,
  password: string,
): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withPasswordFlow(PassAuthMiddlewareOptions(email, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderWithProjectKey(client);
};

export const customerDataApiRoot = () => {
  const client = new ClientBuilder()
    .withExistingTokenFlow(`Bearer ${customerTokenCache.get().token}`, {
      force: true,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderWithProjectKey(client);
};

export const refreshTokenApiRoot = () => {
  const client = new ClientBuilder()
    .withRefreshTokenFlow({
      ...authMiddlewareOptions,
      refreshToken: customerTokenCache.get().refreshToken ?? "",
      tokenCache: customerTokenCache,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderWithProjectKey(client);
};

export const anonymousApiRoot = () => {
  const client = new ClientBuilder()
    .withAnonymousSessionFlow({
      ...authMiddlewareOptions,
      tokenCache: anonymousTokenCache,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderWithProjectKey(client);
};
