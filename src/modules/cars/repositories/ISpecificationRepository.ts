import {ICreateSpecificationDTO} from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepository {
    create ({description, name}: ICreateSpecificationDTO) : Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export {ISpecificationRepository, ICreateSpecificationDTO}
