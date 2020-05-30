import { BboxDto } from "./Bbox.dto";

export interface ImageDto {
	id: string;
	name: string;
	bbox: BboxDto[];
}
