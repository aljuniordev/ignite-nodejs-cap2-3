import { Specification } from "../entities/Specification";
import {ICreateSpecificationDTO} from "../dtos/ICreateSpecificationDTO";

interface ISpecificationRepository {
    create ({description, name}: ICreateSpecificationDTO) : Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export {ISpecificationRepository, ICreateSpecificationDTO}
