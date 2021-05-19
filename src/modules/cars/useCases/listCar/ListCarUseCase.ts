import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    brand?: string, 
    category_id?: string, 
    name?: string, 
    available?: boolean
}

@injectable()
class ListCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({brand, category_id, name, available}: IRequest): Promise<Car[]> {
        return await this.carsRepository.find(
            brand, 
            category_id, 
            name, 
            available);
    }
}

export { ListCarUseCase };

