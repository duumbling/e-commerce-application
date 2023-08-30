import {
  type ClientResponse,
  type SuggestionResult,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";

export const KEYWORDS_QUERY_NAME = "searchKeywords.ru-RU";

export const getProductKeywords = async (
  word: string,
): Promise<ClientResponse<SuggestionResult>> => {
  return await apiRoot()
    .productProjections()
    .suggest()
    .get({
      queryArgs: {
        [KEYWORDS_QUERY_NAME]: word,
        fuzzy: true,
      },
    })
    .execute();
};
