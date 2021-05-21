import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    car_id?: string;
    user_id?: string;
}

@injectable()
class RentalListUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute({car_id, user_id}: IRequest): Promise<Rental[]> {

        if (!car_id && !user_id) {
            throw new AppError("ID of car or ID of user are necessary!");
        }

        if (car_id && user_id) {
            return await this.rentalsRepository.findByCarAndUser(car_id, user_id);
        }

        if (car_id) {
            return await this.rentalsRepository.findByCar(car_id);
        }

        if (user_id) {
            return await this.rentalsRepository.findByUser(user_id);
        }
    }
}

export {RentalListUseCase}