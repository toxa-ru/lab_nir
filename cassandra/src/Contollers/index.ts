import { VideoController } from "./Video";
import { ImagesController } from "./Images";
import { CategoriesController } from "./Categories";

import { VideoService } from "../database/Video";
import { CategoryService } from "../database/Category";
import { ImagesService } from "../database/Images";
import { MapperService } from "../Services/Mapper.service";

export const videoController = new VideoController(new VideoService());
export const imagesController = new ImagesController(
	new ImagesService(),
	new MapperService()
);
export const categoriesController = new CategoriesController(
	new CategoryService()
);
