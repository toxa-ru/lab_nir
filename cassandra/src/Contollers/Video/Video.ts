import { Request, Response } from "express";
import path from "path";
import { mvVideoDirectory } from "../../config/ExpressFileUpload";
import { VideoService } from "../../database/Video";
import { v4 } from "uuid";
import { GetVideoDto } from "./models/GetVideo.dto";
import { VideoDto } from "./models/Video.dto";

export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	async getList(req: Request, res: Response<string[]>) {
		try {
			const result = await this.videoService.getVideoList();
			if (result) {
				return res.send(result.map((value) => value.id));
			}
			return res.send([]);
		} catch (e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}

	async getVideoById(req: Request<GetVideoDto>, res: Response<VideoDto>) {
		const videoId = req.params.id;
		try {
			const data = await this.videoService.getVideoById(videoId);
			if (!data || !data[0]) {
				return res.sendStatus(404);
			}
			return res.send(data[0]);
		} catch (e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}

	async create(req: Request, res: Response) {
		const file = req.files?.file;
		if (
			!file ||
			Array.isArray(file) ||
			!["video/mp4"].includes(file.mimetype)
		) {
			return res.sendStatus(500);
		}

		try {
			const id = v4();
			const [, extension] = file.name.split(".");
			const saveVideoPath = path.join(
				mvVideoDirectory,
				`${id}.${extension}`
			);
			await new Promise((resolve, reject) =>
				file.mv(saveVideoPath, (err) => (err ? reject(err) : resolve()))
			);

			await this.videoService.create({
				id: id,
				fps: 15,
				extension: file.name.split(".")[1],
				count_people_on_frames: Array(100)
					.fill(0)
					.map(() => Math.floor(Math.random() * 10)),
			});
			return res.sendStatus(200);
		} catch (e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}
}
