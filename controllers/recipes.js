const { selectRecipes } = require("../models/recipes");

const recipes = require("../data/data.json");

exports.getRecipes = async (req, res) => {
  const { exclude_ingredients } = req.query;
  const recipes = await selectRecipes(exclude_ingredients);
  res.json({ recipes });
};
