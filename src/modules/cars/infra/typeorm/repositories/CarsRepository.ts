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

    async create({ name, description, daily_rate,
        license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({
            name, description, daily_rate,
            license_plate, fine_amount, brand, category_id
        });

        await this.repository.save(newCar);

        return newCar;
    }

    async find(brand?: string, category_id?: string, name?:
        string, available?: boolean): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("id is not null");

        if (available) {
            carsQuery.andWhere("available = :av", { av: available });
        }
        if (brand) {
            carsQuery.andWhere("brand = :br", { br: brand });
        }
        if (category_id) {
            carsQuery.andWhere("category_id = :c_id", { c_id: category_id });
        }
        if (name) {
            carsQuery.andWhere("name = :na", { na: name });
        }

        return await carsQuery.getMany();
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({ license_plate });
    }

}

export { CarsRepository };
