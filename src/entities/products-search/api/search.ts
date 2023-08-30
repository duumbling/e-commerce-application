import {
  type ClientResponse,
  type SuggestionResult,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";

export const getProductKeywords = async (
  word: string,
): Promise<ClientResponse<SuggestionResult>> => {
  return await apiRoot()
    .productProjections()
    .suggest()
    .get({
      queryArgs: {
        "searchKeywords.ru-RU": word,
        fuzzy: true,
      },
    })
    .execute();
};
