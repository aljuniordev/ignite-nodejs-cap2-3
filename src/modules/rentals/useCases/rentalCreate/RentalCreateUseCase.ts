import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    car_id: string;
    user_id: string;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ car_id, user_id }: IRequest): Promise<Rental> {

        if (!car_id || !user_id) {
            throw new AppError("ID of car and ID of user are necessary!");
        }

        const car = await this.carsRepository.findById(car_id);
        if (!car) {
            throw new AppError("Car not found with that ID");
        }

        const rentals = await this.rentalsRepository.findOpenByCar(car_id);
        if (rentals) {
            throw new AppError("This car already has open rentals!")
        }

        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User not found with that ID");
        }

        let expected_return_date = new Date();
        expected_return_date.setDate(expected_return_date.getDate() + 30);

        const newRental = await this.rentalsRepository.create({
            car_id, user_id, expected_return_date
        });

        return newRental;
    }
}

export { CreateRentalUseCase }