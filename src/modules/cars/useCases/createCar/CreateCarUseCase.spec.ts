import AppError from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        const carCreated = await createCarUseCase.execute({
                name: "name car", 
                description: "description car", 
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60,
                brand: "brand", 
                category_id: "category"
            }); 

        expect(carCreated).toHaveProperty("id");
    });

    it("should not be able to create a new car with exists license plate", async () => {
        
        expect(async () => {
            await createCarUseCase.execute({
                name: "name car", 
                description: "description car", 
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60,
                brand: "brand", 
                category_id: "category"
            }); 

            await createCarUseCase.execute({
                name: "name car22", 
                description: "description car22", 
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60,
                brand: "brand", 
                category_id: "category"
            }); 
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new car with avaliable true by default", async () => {
        
        const carCreated = await createCarUseCase.execute({
            name: "name car", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60,
            brand: "brand", 
            category_id: "category"
        }); 

        expect(carCreated.avaliable).toBe(true);

    });

})
