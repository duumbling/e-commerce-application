import { apiRoot } from "../../../shared/api/apiRoot";

export const getAllCategories = async () =>
  await apiRoot().categories().get().execute();

export const getCategoriesByParentId = async (id?: string) =>
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
