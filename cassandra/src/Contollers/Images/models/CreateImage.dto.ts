import { UploadedFile } from "express-fileupload";

export interface CreateImageDto {
	bbox: string[];
}

export interface CreateImageDtoWithFile extends CreateImageDto {
	file: UploadedFile;
}
