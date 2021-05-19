import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class ListCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute(): Promise<Car[]> {
        return this.carsRepository.findAll();
    }
}

export {ListCarUseCase}