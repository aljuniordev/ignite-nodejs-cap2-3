import { inject, injectable } from "tsyringe";
import AppError from "@errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {};

    async execute({name, description}: IRequest): Promise<Specification> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Especificação já existe");
        }
        
        return await this.specificationsRepository.create({
            name,
            description
        });
    }
}

export {CreateSpecificationUseCase}
