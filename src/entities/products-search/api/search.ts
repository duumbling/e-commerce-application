import { apiRoot } from "../../../shared/api/apiRoot";

export const searchByWord = async (word: string) => {
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
