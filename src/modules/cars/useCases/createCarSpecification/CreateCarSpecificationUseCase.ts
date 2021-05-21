import { inject, injectable } from "tsyringe"
import AppError from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
    car_id: string,
    specifications_ids: string[]
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute({car_id, specifications_ids}: IRequest): Promise<Car> {
        
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_ids);

        car.specifications = specifications;

        return await this.carsRepository.create(car);
    }
}

export {CreateCarSpecificationUseCase}