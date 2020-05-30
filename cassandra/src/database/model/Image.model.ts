import { BboxModel } from "./Bbox.model";

export interface ImageModel {
	id: string;
	extension: string;
	bbox: BboxModel[];
	category_id: string;
}
