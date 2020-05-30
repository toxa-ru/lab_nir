import { Router } from "express";
import { video } from "./video";
import { images } from "./images";
import { categories } from "./categories";

export const api = Router();

api.use("/api", video, images, categories);
