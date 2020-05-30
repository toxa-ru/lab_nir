import { Request, Response } from "express";
import { CreateCategoryDtoModel } from "./models/CreateCategoryDto.model";
import { CategoryService } from "../../database/Category";
import { v4 } from "uuid";
import { CategoryListDto } from "./models/CategoryList.dto";

export class CategoriesController {
	constructor(private readonly categoryService: CategoryService) {}

	async getList(req: Request, res: Response<CategoryListDto>) {
		try {
			const result = await this.categoryService.getCategoryList();
			if (!result) {
				return res.sendStatus(500);
			}
			return res.send(result);
		} catch (e) {
			return res.sendStatus(500);
		}
	}

	async create(req: Request<{}, {}, CreateCategoryDtoModel>, res: Response) {
		try {
			if (!req.body.name || !req.body.description) {
				return res.sendStatus(500);
			}
			const id = v4();
			await this.categoryService.createCategory({
				id,
				name: req.body.name,
				description: req.body.description,
			});
			return res.sendStatus(200);
		} catch (e) {
			console.log("Произошла ошибка при создании категории", e);
			return res.sendStatus(500);
		}
	}
}
