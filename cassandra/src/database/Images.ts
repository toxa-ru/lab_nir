import { DbQueries } from "./Db";
import { ImageModel } from "./model/Image.model";

export class ImagesService extends DbQueries {
	table_name = "labs.images";
	columns_name = {
		id: "id",
		extension: "extension",
		category_id: "category_id",
		bbox: "bbox",
	};

	async getImagesList(): Promise<ImageModel[] | undefined> {
		try {
			const request = `SELECT * FROM ${this.table_name}`;
			return await this.executeQuery<ImageModel[]>(request);
		} catch (e) {
			console.log(e.stack);
		}
	}

	async getImageById(id: string) {
		const request = `
			SELECT * FROM ${this.table_name} WHERE id=${id};
		`;
		try {
			return await this.executeQuery<ImageModel[]>(request);
		} catch (e) {
			console.log(e.stack);
		}
	}

	async getImageByCategoryId(categoryId: string) {
		const request = `
			SELECT * FROM ${this.table_name} WHERE ${this.columns_name.category_id}=${categoryId} ALLOW FILTERING;
		`;
		try {
			return await this.executeQuery<ImageModel[]>(request);
		} catch (e) {
			console.log(e.stack);
		}
	}

	async createImage(images: ImageModel[]) {
		// Нельзя вставлять сразу несколько строк
		const request = `
			BEGIN BATCH
			${images
				.map(
					(image) =>
						`
						INSERT INTO ${this.table_name} (${this.columns_name.id}, ${
							this.columns_name.category_id
						}, ${this.columns_name.extension}, ${
							this.columns_name.bbox
						}) 
						VALUES (${image.id}, ${image.category_id}, '${
							image.extension
						}', ${JSON.stringify(image.bbox)});
					`
				)
				.join("\n")}
			APPLY BATCH;
		`;
		return await this.executeQuery(request);
	}
}
