
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository
    ) {};

    async execute({name, description}: IRequest) : Promise<void> {
        
        if (await this.categoryRepository.findByName(name)) {
            throw new AppError('Já existe categoria com esse nome');
        }   

        await this.categoryRepository.create({
            name, 
            description
        });
    }
}

export { CreateCategoryUseCase };

