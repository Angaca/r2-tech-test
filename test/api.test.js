const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

describe("server", () => {
  test("/api", async () => {
    const { body } = await request.get("/api").expect(200);
    expect(body.message).toBe("ok");
  });
  test("GET /api/recipes", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    console.log(body.recipes.length);
    body.recipes.forEach((recipe) => {
      expect(recipe).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageUrl: expect.any(String),
          instructions: expect.any(String),
          ingredients: expect.any(Array),
        })
      );
    });
  });
  test("any ingredient is not duplicated in any recipe", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    body.recipes.forEach(({ ingredients }) => {
      const singleIngredients = ingredients.map(
        (ingredient) => ingredient.name
      );
      expect(new Set(singleIngredients).size).toEqual(ingredients.length);
    });
  });
  test("GET /api/recipes accepts an exclusion query", async () => {
    const { body } = await request
      .get("/api/recipes?exclude_ingredients=apples,banana,carrots")
      .expect(200);
    console.log(body.recipes.length);
    body.recipes.forEach(({ ingredients }) => {
      ingredients.forEach(({ name }) => {
        expect(name !== "apples").toBe(true);
        expect(name !== "banana").toBe(true);
        expect(name !== "carrots").toBe(true);
      });
    });
  });
});
