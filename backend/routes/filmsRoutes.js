const express = require("express");

const filmsRouter = express.Router();

const asyncHandler = require("express-async-handler");

const filmsController = require("../controllers/FilmsController");

//додати фільм
filmsRouter.post(
  "/films",
  (req, res, next) => {
    console.log("Joi validation");
    next();
  },
  asyncHandler(filmsController.add)
);

//отримати всі фільми
filmsRouter.get("/films", asyncHandler(filmsController.getAll));

//отримати один фільм
filmsRouter.get("/films/:id", asyncHandler(filmsController.getOneFilm));

//оновити фільм
filmsRouter.put("/films/:id", asyncHandler(filmsController.updateFilm));

//видалити фільм
filmsRouter.delete("/films/:id", asyncHandler(filmsController.removeFilm));

module.exports = filmsRouter;
