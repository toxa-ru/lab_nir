import { Router } from "express";
import { categoriesController } from "../Contollers";

export const categories = Router();

categories.get(
	"/categories",
	categoriesController.getList.bind(categoriesController)
);
categories.post(
	"/categories",
	categoriesController.create.bind(categoriesController)
);
