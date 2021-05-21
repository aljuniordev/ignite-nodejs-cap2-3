import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
        name, description, daily_rate, license_plate,
        fine_amount, brand, category_id, specifications
    }: ICreateCarDTO): Promise<Car> {
        const newCar = new Car();
        
        Object.assign(newCar, {
            name, description, daily_rate, license_plate,
            fine_amount, brand, category_id, specifications
        })

        this.cars.push(newCar);

        return newCar;
    }
    
    async find(brand?: string, category_id?: string, 
        name?: string, available?: boolean): Promise<Car[]> {
        return this.cars.filter(car => 
            (car.avaliable === available) ||
            (car.name === name) ||
            (car.brand === brand) ||
            (car.category_id === category_id)
        );
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    }
}

export {CarsRepositoryInMemory}