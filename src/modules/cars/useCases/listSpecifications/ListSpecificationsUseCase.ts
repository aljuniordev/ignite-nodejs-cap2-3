import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { inject, injectable } from 'tsyringe';
import {ISpecificationRepository} from '../../repositories/ISpecificationRepository';

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
