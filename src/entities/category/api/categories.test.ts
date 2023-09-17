import { getAllCategories, getCategoriesByParentId } from "./categories";

test("getAllCategories", async () => {
  const {
    body: { results },
  } = await getAllCategories();
  expect(results.length).toBeGreaterThan(0);
});

test("getRootCategories", async () => {
  const {
    body: { results },
  } = await getCategoriesByParentId();
  const names = results.map((value) => value.name["ru-RU"]);
  expect(names).toContain("Мужская обувь");
  expect(names).toContain("Женская обувь");
  expect(names).toContain("Распродажа");
});

test("getMenCategories", async () => {
  const { body } = await getAllCategories();
  const id = body.results
    .filter((value) => value.name["ru-RU"] === "Мужская обувь")
    .map((value) => value.id)[0];
  const {
    body: { results },
  } = await getCategoriesByParentId(id);
  const names = results.map((value) => value.name["ru-RU"]);
  expect(names).toContain("Кроссовки");
  expect(names).toContain("Шлепанцы");
  expect(names).toContain("Ботинки");
});

test("getWomenCategories", async () => {
  const { body } = await getAllCategories();
  const id = body.results
    .filter((value) => value.name["ru-RU"] === "Женская обувь")
    .map((value) => value.id)[0];
  const {
    body: { results },
  } = await getCategoriesByParentId(id);
  const names = results.map((value) => value.name["ru-RU"]);
  expect(names).toContain("Кроссовки");
  expect(names).toContain("Шлепанцы");
  expect(names).toContain("Ботинки");
});
