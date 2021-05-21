import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";


class SpecificationsRepositoryInMemory implements ISpecificationRepository {

    specifications: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const newSpecification = new Specification();
        
        Object.assign(newSpecification, {
            name, description
        })

        this.specifications.push(newSpecification);

        return newSpecification;
    }
    
    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(specification => ids.includes(specification.id));
    }

}

export {SpecificationsRepositoryInMemory}