import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        return this.categories.find(category => category.name === name);
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const newCategory = new Category();

        Object.assign(newCategory, {
            name,
            description
        })

        this.categories.push(newCategory);
    }

}

export {CategoriesRepositoryInMemory};
