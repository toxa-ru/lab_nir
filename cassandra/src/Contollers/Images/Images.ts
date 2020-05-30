import { Request, Response } from "express";
import path from "path";
import { mvImagesDirectory } from "../../config/ExpressFileUpload";
import { ImageErrorsEnum } from "./models/ImageErrors.enum";
import { RequestBody } from "../../utils/typeUtils";
import { v4 } from "uuid";
import { ImagesService } from "../../database/Images";
import { CreateImageDto } from "./models/CreateImage.dto";
import { ImageDto } from "./models/Image.dto";
import { GetImageDto } from "./models/GetImage.dto";
import { BboxDto } from "./models/Bbox.dto";
import { MapperService } from "../../Services/Mapper.service";
import { GetImageListDto } from "./models/GetImageList.dto";

export class ImagesController {
	constructor(
		private readonly imagesService: ImagesService,
		private readonly mapperService: MapperService
	) {}

	async getList(
		req: Request<{}, {}, {}, GetImageListDto>,
		res: Response<ImageDto[]>
	) {
		try {
			const result = req.query.categoryId
				? await this.imagesService.getImageByCategoryId(
						req.query.categoryId
				  )
				: await this.imagesService.getImagesList();
			if (!result) {
				console.error(ImageErrorsEnum.ERROR_WHILE_GET_IMAGE_LIST);
				return res.sendStatus(500);
			}
			return res.send(
				this.mapperService.mapImageModelListToImageDtoList(result)
			);
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	}

	async getById(req: Request<GetImageDto>, res: Response<ImageDto>) {
		const imageId = req.params.id;
		try {
			const data = await this.imagesService.getImageById(imageId);
			if (!data) {
				return res.sendStatus(404);
			}
			return res.send(
				this.mapperService.mapImageModelArrayToImageDto(data)
			);
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	}

	async create(
		req: Request<{}, {}, RequestBody<CreateImageDto>>,
		res: Response
	) {
		// Валидация файла
		const file = req.files?.file;
		if (
			!file ||
			Array.isArray(file) ||
			!["image/png", "image/jpeg"].includes(file.mimetype)
		) {
			console.log("Ошибка валидации изображения");
			return res.sendStatus(500);
		}

		// Валидация параметров
		const { bbox } = req.body;
		if (!bbox || !bbox.length) {
			console.log(ImageErrorsEnum.REQUIRED_PARAMS_NOT_FOUND);
			return res.sendStatus(500);
		}
		const jsonBbox = bbox.map<BboxDto>((bb) => JSON.parse(bb));
		for (let {
			categoryId,
			coordinates: { xmin, xmax, ymax, ymin },
		} of jsonBbox) {
			if (
				!categoryId ||
				(xmax !== 0 && !xmax) ||
				(xmin !== 0 && !xmin) ||
				(ymax !== 0 && !ymax) ||
				(ymin !== 0 && !ymin)
			) {
				console.log(ImageErrorsEnum.REQUIRED_PARAMS_NOT_FOUND);
				return res.sendStatus(500);
			}
		}
		const categories = jsonBbox.reduce((acc: string[], curr) => {
			if (!acc.includes(curr.categoryId)) {
				return [...acc, curr.categoryId];
			}
			return acc;
		}, []);

		// Сохранение файла
		const id = v4();
		const [, extension] = file.name.split(".");
		const saveFileName = path.join(mvImagesDirectory, `${id}.${extension}`);
		try {
			await new Promise((resolve, reject) => {
				file.mv(saveFileName, (err) => {
					if (err) {
						reject(err);
					}
					resolve();
				});
			});
		} catch (e) {
			console.error({ e });
			return res.sendStatus(500);
		}

		// Запрос в базу
		try {
			await this.imagesService.createImage(
				categories.map((category) => ({
					id,
					extension,
					category_id: category,
					bbox: jsonBbox
						.filter(({ categoryId }) => categoryId === category)
						.map(({ coordinates }) => ({ ...coordinates })),
				}))
			);
			return res.sendStatus(200);
		} catch (e) {
			console.error({ e });
			return res.sendStatus(500);
		}
	}
}
