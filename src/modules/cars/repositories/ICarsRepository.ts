import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    find(brand?: string, category_id?: string, name?: string, available?: boolean): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}

export{ICarsRepository}