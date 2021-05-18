import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Category[]> {
        const specification = await this.specificationsRepository.list();

        return specification;
    }
}

export {ListSpecificationsUseCase}
