import { Router } from "express";
import { imagesController } from "../Contollers";

export const images = Router();

images.get("/images", imagesController.getList.bind(imagesController));
images.post("/images", imagesController.create.bind(imagesController));
images.get("/images/:id", imagesController.getById.bind(imagesController));
