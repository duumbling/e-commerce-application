import fetch from "node-fetch";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { type ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

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
