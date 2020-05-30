import { BboxDto } from "../Contollers/Images/models/Bbox.dto";
import { ImageModel } from "../database/model/Image.model";
import { ImageDto } from "../Contollers/Images/models/Image.dto";

export class MapperService {
	mapImageModelToImageDto(imageModel: ImageModel): ImageDto {
		return {
			id: imageModel.id,
			name: `${imageModel.id}.${imageModel.extension}`,
			bbox: imageModel.bbox.map((coordinates) => ({
				categoryId: imageModel.category_id,
				coordinates,
			})),
		};
	}

	mapImageModelListToImageDtoList(imagesModelList: ImageModel[]): ImageDto[] {
		return imagesModelList.reduce((acc: ImageDto[], currModel) => {
			const curr = acc.find(
				({ id }) => id.toString() === currModel.id.toString()
			);

			if (!curr) {
				return [...acc, this.mapImageModelToImageDto(currModel)];
			}

			currModel.bbox.forEach((coordinates) => {
				curr.bbox.push({
					categoryId: currModel.category_id,
					coordinates,
				});
			});

			return acc;
		}, []);
	}

	mapImageModelArrayToImageDto(imageModelList: ImageModel[]): ImageDto {
		const BboxList: BboxDto[] = [];
		imageModelList.forEach((row) => {
			const { category_id, bbox } = row;
			console.log({ category_id: category_id });
			bbox.forEach((bb) =>
				BboxList.push({
					categoryId: category_id,
					coordinates: bb,
				})
			);
		});

		return {
			id: imageModelList[0].id,
			name: `${imageModelList[0].id}.${imageModelList[0].extension}`,
			bbox: BboxList,
		};
	}
}
