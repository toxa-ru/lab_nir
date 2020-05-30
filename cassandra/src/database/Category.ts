import { DbQueries } from "./Db";
import { CategoryModel } from "./model/Category.model";

export class CategoryService extends DbQueries {
	async getCategoryList() {
		return await this.executeQuery<CategoryModel[]>(
			"SELECT id, name, description FROM labs.categories"
		);
	}

	async createCategory(category: CategoryModel) {
		const request = `
			INSERT INTO labs.categories (id, name, description)
			VALUES (${category.id}, '${category.name}', '${category.description}');
		`;
		return await this.executeQuery(request);
	}
}
