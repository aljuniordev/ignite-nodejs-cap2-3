import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarUseCase } from "./ListCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarUseCase;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {

        const newCar = await carsRepositoryInMemory.create({
            name: "nome do carro 1",
            description: "descriçào do carro 1",
            daily_rate: 123456,
            license_plate: "XXX-XXX",
            fine_amount: 8,
            brand: "brand",
            category_id: "202cbbb0-0f03-4569-b7b7-740252de6e71"
        })

        const cars = await listCarsUseCase.execute({
            brand: newCar.brand, 
            category_id: newCar.category_id, 
            name: newCar.name
        });

        expect(cars).toEqual([newCar]);
    })
})