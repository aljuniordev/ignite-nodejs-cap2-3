import AppError from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
let createCarUseCase: CreateCarUseCase;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car_specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepositoryInMemory);
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
    })

    it("should be able to add a new specification to a nonexistent car", async () => {
        expect(async() => {
            const car_id = "1234";
            const specifications_ids = ["4321"];

            await createCarSpecificationUseCase.execute({car_id, specifications_ids});
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car_specification", async () => {
        const carCreated = await createCarUseCase.execute({
            name: "name car", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60,
            brand: "brand", 
            category_id: "category"
        });

        const specifications1 = await createSpecificationUseCase.execute({
            name: "nome spec111",
            description: "description111"
        });
        const specifications2 = await createSpecificationUseCase.execute({
            name: "nome spec222",
            description: "description222"
        });

        const specifications_ids = [specifications1.id, specifications2.id];

        const carWithSpec = await createCarSpecificationUseCase.execute({
            car_id: carCreated.id, specifications_ids});

        expect(carWithSpec).toHaveProperty("specifications");
        expect(carCreated.specifications.length).toBe(2);
    });

});