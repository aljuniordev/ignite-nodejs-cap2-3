import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../IRentalsRepository";
import AppError from "@shared/errors/AppError";


class RentalsRepositoryInMemory implements IRentalsRepository {
    
    rentals: Rental[] = [];
    
    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const newRental = new Rental();
        
        Object.assign(newRental, {
            car_id, user_id, expected_return_date
        })

        this.rentals.push(newRental);

        return newRental;
    }

    findByCar(car_id: string): Promise<Rental[]> {
        throw new AppError("Method not implemented.");
    }

    findOpenByCar(car_id: string): Promise<Rental[]> {
        throw new AppError("Method not implemented.");
    }
    
    findByUser(user_id: string): Promise<Rental[]> {
        throw new AppError("Method not implemented.");
    }
    
    findByCarAndUser(car_id: string, user_id: string): Promise<Rental[]> {
        throw new AppError("Method not implemented.");
    }

}

export {RentalsRepositoryInMemory}