const { getRecipes } = require("../controllers/recipes");
const recipeRouter = require("express").Router();

recipeRouter.get("/", getRecipes);

module.exports = recipeRouter;
