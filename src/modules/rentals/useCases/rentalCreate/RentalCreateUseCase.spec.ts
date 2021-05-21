import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./rentalCreateUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";

let rentalsInMemory: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let usersRepository: UsersRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Test Create Rental", () => {

    beforeEach(() => {
        rentalsInMemory = new RentalsRepositoryInMemory();
        carsRepository = new CarsRepositoryInMemory();
        usersRepository = new UsersRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsInMemory, carsRepository, usersRepository);
    });

    it("should be create rental", async () => {
        const carCreated = await carsRepository.create({
            name: "name car", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABC-123", 
            fine_amount: 60,
            brand: "brand", 
            category_id: "category"
        });

        const userCreated = await usersRepository.create({
            name: "user nome", 
            password: await hash("1234", 8), 
            email: "email teste", 
            driver_license: "driv test"
        });

        const rentalCreated = await createRentalUseCase.execute({
            car_id: carCreated.id, user_id: userCreated.id 
        })

        expect(rentalCreated).toHaveProperty("id");
    });
    
    it("should be not create rental with nonexistent ID of car", async () => {
        expect(async () => {
            const car_id = "123";

            const userCreated = await usersRepository.create({
                name: "user nome", 
                password: await hash("1234", 8), 
                email: "email teste", 
                driver_license: "driv test"
            });

            const rentalCreated = await createRentalUseCase.execute({
                car_id, user_id: userCreated.id 
            })
        }).rejects.toBeInstanceOf(AppError);
    });
    
    it("should be not create rental with nonexistent ID of user", async () => {
        expect(async () => {
            const carCreated = await carsRepository.create({
                name: "name car", 
                description: "description car", 
                daily_rate: 100, 
                license_plate: "ABC-123", 
                fine_amount: 60,
                brand: "brand", 
                category_id: "category"
            });

            const user_id = "1234";

            const rentalCreated = await createRentalUseCase.execute({
                car_id: carCreated.id, user_id 
            })
        }).rejects.toBeInstanceOf(AppError);
    });
})