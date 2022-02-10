const data = require("../data/data.json");

exports.selectRecipes = (ingredientsToRemove = "") => {
  const ingredientsArr = ingredientsToRemove.split(",");
  const updatedRecipes = data.map((recipe) => {
    let updateIngredient = {};
    let updateRecipe = {};
    recipe.ingredients.forEach(({ name, grams }) => {
      updateIngredient[name]
        ? updateIngredient[name].grams + grams
        : (updateIngredient[name] = { name, grams });
    });
    updateRecipe.id = recipe.id;
    updateRecipe.imageUrl = recipe.imageUrl;
    updateRecipe.instructions = recipe.instructions;
    updateRecipe.ingredients = Object.values(updateIngredient);
    return updateRecipe;
  });
  const filteredRecipes = updatedRecipes.filter((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsArr.includes(ingredient.name)
        ? (recipe.toBeRemoved = true)
        : null;
    });
    return !recipe.toBeRemoved;
  });
  return filteredRecipes;
};
