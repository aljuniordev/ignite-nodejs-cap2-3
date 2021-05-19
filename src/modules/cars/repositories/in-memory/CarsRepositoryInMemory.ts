import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
        name, description, daily_rate, license_plate,
        fine_amount, brand, category_id
    }: ICreateCarDTO): Promise<Car> {
        const newCar = new Car();
        
        Object.assign(newCar, {
            name, description, daily_rate, license_plate,
            fine_amount, brand, category_id
        })

        this.cars.push(newCar);

        return newCar;
    }
    
    async findAll(): Promise<Car[]> {
        return this.cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
}

export {CarsRepositoryInMemory}