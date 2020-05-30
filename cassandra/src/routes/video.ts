import { Router } from "express";
import { videoController } from "../Contollers";

export const video = Router();

video.get("/video", videoController.getList.bind(videoController));
video.post("/video", videoController.create.bind(videoController));
video.get("/video/:id", videoController.getVideoById.bind(videoController));
