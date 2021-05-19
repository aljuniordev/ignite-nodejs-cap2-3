import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    private static INSTANCE: CarsRepository;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({name, description, daily_rate, 
        license_plate, fine_amount, brand, category_id}: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({name, description, daily_rate, 
            license_plate, fine_amount, brand, category_id});

        await this.repository.save(newCar);

        return newCar;
    }
    
    async findAll(): Promise<Car[]> {
        return await this.repository.find();
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({license_plate});
    }

}

export { CarsRepository };
