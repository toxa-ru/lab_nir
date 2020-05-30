export enum ImageErrorsEnum {
	ERROR_WHILE_GET_IMAGE_LIST = "Произошла ошибка при получении списка изображений",

	FILE_NOT_FOUND = "Отсутствует загруженный файл",
	ARRAY_FOUND = "Передан массив файлов",
	MIME_TYPE_NOT_ALLOWED = "Несоответствует mimetype загружаемого файла",
	REQUIRED_PARAMS_NOT_FOUND = "Отсутствует один из обязательных параметров xmin, ymax, ymin, xmax, categoryId",
}
