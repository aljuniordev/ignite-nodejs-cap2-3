import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {
    
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }
    
    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const newRental = await this.repository.create({
            car_id, user_id, expected_return_date
        });

        await this.repository.save(newRental);

        return newRental;
    }

    async findByCar(car_id: string): Promise<Rental[]> {
        const rentalsQuery = await this.repository
            .createQueryBuilder("r")
            .where(`r.car_id = '${car_id}'`);

        return await rentalsQuery.getMany();
    }

    async findOpenByCar(car_id: string): Promise<Rental[]> {
        try {
            const rentalsQuery = await this.repository
                .createQueryBuilder("r")
                .where(`r.car_id = '${car_id}'`)
                .andWhere("r.end_date is null");

            return await rentalsQuery.getMany();
        } catch(e) {
            console.log(e);
        }
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentalsQuery = await this.repository
            .createQueryBuilder("r")
            .where(`r.user_id = '${user_id}'`);

        return await rentalsQuery.getMany();
    }

    async findByCarAndUser(car_id: string, user_id: string): Promise<Rental[]> {
        const rentalsQuery = await this.repository
            .createQueryBuilder("r")
            .where(`r.car_id = '${car_id}'`)
            .andWhere(`r.user_id = '${user_id}'`);

        return await rentalsQuery.getMany();
    }

}

export {RentalsRepository}