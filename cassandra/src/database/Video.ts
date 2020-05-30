import { DbQueries } from "./Db";
import { VideoModel } from "./model/Video.model";

export class VideoService extends DbQueries {
	async getVideoList() {
		const request = `
			SELECT id FROM labs.video;
		`;
		return await this.executeQuery<VideoModel[]>(request);
	}

	async getVideoById(id: string) {
		const request = `
			SELECT * FROM labs.video WHERE id=${id};
		`;
		return await this.executeQuery<VideoModel[]>(request);
	}

	async create(video: VideoModel) {
		const request = `
			INSERT INTO labs.video (id, extension, fps, count_people_on_frames)
			VALUES (${video.id}, '${video.extension}', ${video.fps}, ${JSON.stringify(
			video.count_people_on_frames
		)});
		`;
		return await this.executeQuery(request);
	}
}
