const recipeRouter = require("./recipes");
const apiRouter = require("express").Router();

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.use("/recipes", recipeRouter);

module.exports = apiRouter;
