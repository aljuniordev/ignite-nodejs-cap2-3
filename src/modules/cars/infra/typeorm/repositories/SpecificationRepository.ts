import { getRepository, Repository } from 'typeorm';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../../../repositories/ISpecificationRepository';
import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    private static INSTANCE: SpecificationRepository;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({name});

        return specification;
    }
}

export { SpecificationRepository };