import AppError from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }
        
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should NOT be able to create a new category with name exists", async () => {
        
        expect(async () => {
            const category1 = {
                name: "Category Test",
                description: "Category description test"
            };
            
            await createCategoryUseCase.execute({
                name: category1.name,
                description: category1.description
            });
            
            await createCategoryUseCase.execute({
                name: category1.name,
                description: category1.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    
});