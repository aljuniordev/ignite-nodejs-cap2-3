import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
    create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rental>;
    findByCar(car_id: string): Promise<Rental[]>;
    findOpenByCar(car_id: string): Promise<Rental[]>;
    findByUser(user_id: string): Promise<Rental[]>;
    findByCarAndUser(car_id: string, user_id: string): Promise<Rental[]>;
}

export {IRentalsRepository}