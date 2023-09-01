import { apiRoot } from "../../../shared/api/apiRoot";

export const getCategoriesById = async (id?: string) =>
  await apiRoot()
    .categories()
    .get({
      queryArgs: {
        where:
          id === undefined
            ? "parent(id is not defined)"
            : `parent(id = "${id}")`,
      },
    })
    .execute();
