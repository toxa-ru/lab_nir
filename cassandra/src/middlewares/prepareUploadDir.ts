import {
	mvImagesDirectory,
	mvVideoDirectory,
} from "../config/ExpressFileUpload";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

export const prepareUploadDir = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	mvImagesDirectory.split("/").reduce((acc, val) => {
		const newPath = path.join(acc, val);
		if (!fs.existsSync(newPath)) {
			fs.mkdirSync(newPath);
		}
		return newPath;
	}, "");

	mvVideoDirectory.split("/").reduce((acc, val) => {
		const newPath = path.join(acc, val);
		if (!fs.existsSync(newPath)) {
			fs.mkdirSync(newPath);
		}
		return newPath;
	}, "");

	next();
};
